import { createRouter, createWebHistory } from 'vue-router'
import JetSetGoView from '../views/JetSetGoView.vue'
import store from '../store'  // Vuex 스토어 불러오기 (인증 상태 확인을 위해 필요)

const routes = [
  {
    path: '/',
    name: 'home',
    component: JetSetGoView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/loginpage',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },

  {
    path: '/myPage',
    name: 'MyPage',
    component: () => import(/* webpackChunkName: "myPage" */ '../views/MyPage.vue'),
    meta: { requiresAuth: true }  // 인증이 필요한 라우트
  },

  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },

  {
    path: '/faq',
    name: 'FAQ',
    component: () => import(/* webpackChunkName: "faq" */ '../views/FAQ.vue')
  },

  {
    path: '/support',
    name: 'Support',
    component: () => import(/* webpackChunkName: "support" */ '../views/SupportPage.vue')
  },

  {
    path: '/supportDetail',
    name: 'SupportDetail',
    component: () => import(/* webpackChunkName: "supportDetail" */ '../views/SupportDetail.vue')
  },

  {
    path: '/supportInquiry',
    name: 'SupportInquiry',
    component: () => import(/* webpackChunkName: "inquiry" */ '../views/./SupportInquiry'),
    meta: { requiresAuth: true }  // 인증이 필요한 라우트
  },
  {
    path: '/myPageReservationList',
    name: 'MyPageReservationList',
    component: () => import(/* webpackChunkName: "myPageReservationList" */ '../views/MyPageReservationList.vue'),
    meta: { requiresAuth: true }  // 인증이 필요한 라우트
  }
  ,
  {
    path: '/myPageReservationDetail',
    name: 'MyPageReservationDetail',
    component: () => import(/* webpackChunkName: "myPageReservationDetail" */ '../views/MyPageReservationDetail.vue'),
    meta: { requiresAuth: true }  // 인증이 필요한 라우트
  },
  {
    path: '/TicketCencelSearch',
    name: 'TicketCencelSearch',
    component: () => import(/* webpackChunkName: "about" */ '../views/TicketCencelSearch.vue'),
    props: route => ({
      departure: route.query.departure,
      destination: route.query.destination,
      departureDate: route.query.departureDate,
      returnDate: route.query.returnDate,
      adults: Number(route.query.adults),
      children: Number(route.query.children),
      travelClass: route.query.travelClass,
      nonStop: route.query.nonStop === 'true'
    })
  },
  {
    path: '/myPageWithdrawal',
    name: 'MyPageWithdrawal',
    component: () => import(/* webpackChunkName: "myPageWithdrawal" */ '../views/MyPageWithdrawal.vue'),
    meta: { requiresAuth: true }  // 인증이 필요한 라우트
  }
  ,
  {
    path: '/ticketsearch',
    name: 'TicketSearch',
    component: () => import(/* webpackChunkName: "about" */ '../views/TicketSearch.vue'),
    props: route => ({
      departure: route.query.departure,
      destination: route.query.destination,
      departureDate: route.query.departureDate,
      returnDate: route.query.returnDate,
      adults: Number(route.query.adults),
      children: Number(route.query.children),
      travelClass: route.query.travelClass,
      nonStop: route.query.nonStop === 'true'
    })
  },
  {
    path: '/bookingpage',
    name: 'BookingPage',
    component: () => import(/* webpackChunkName: "about" */ '../components/JetSetGoView/BookingPage.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 네비게이션 가드를 사용하여 라우트 이동 시 인증 상태 확인
router.beforeEach((to, from, next) => {
  // 라우트의 메타 정보에 requiresAuth가 있는지 확인
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated;  // Vuex에서 인증 상태 확인
    if (!isAuthenticated) {
      // 인증되지 않은 경우 로그인 페이지로 리디렉션
      next('/loginpage');
    } else {
      // 인증된 경우 라우트 허용
      next();
    }
  } else {
    // 인증이 필요 없는 라우트는 그대로 진행
    next();
  }
});

export default router

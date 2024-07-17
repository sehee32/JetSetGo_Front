import { createRouter, createWebHistory } from 'vue-router'
import JetSetGoView from '../views/JetSetGoView.vue'

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
    component: () => import(/* webpackChunkName: "myPage" */ '../views/MyPage.vue')
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
    path: '/inquiry',
    name: 'Inquiry',
    component: () => import(/* webpackChunkName: "inquiry" */ '../views/InquiryPage.vue')
  },
  {
    path: '/myPageChangePassword',
    name: 'MyPageChangePassword',
    component: () => import(/* webpackChunkName: "myPageChangePassword" */ '../views/MyPageChangePassword.vue')
  }
  ,
  {
    path: '/myPageProfileEdit',
    name: 'MyPageProfileEdit',
    component: () => import(/* webpackChunkName: "myPageProfileEdit" */ '../views/MyPageProfileEdit.vue')
  }
  ,
  {
    path: '/myPageReservationList',
    name: 'MyPageReservationList',
    component: () => import(/* webpackChunkName: "myPageReservationList" */ '../views/MyPageReservationList.vue')
  }
  ,
  {
    path: '/myPageWithdrawal',
    name: 'MyPageWithdrawal',
    component: () => import(/* webpackChunkName: "myPageWithdrawal" */ '../views/MyPageWithdrawal.vue')
  }
  ,
  {
    path: '/ticketsearch',
    name: 'TicketSearch',
    component: () => import(/* webpackChunkName: "about" */ '../views/TicketSearch.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

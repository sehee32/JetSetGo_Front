<template>
  <nav class="navbar">
    <div class="HeaderDiv" href="/">
      <router-link to="/">
        <v-img :src="require('@/assets/JetSetGoLogo.png')"
               width="210"
               aspect-ratio="16/9"
               cover>
        </v-img>
      </router-link>
    </div>
    <ul class="nav-links">
      <div class="right-links">   <!--오른쪽 정렬하려고 묶음-->
        <li><router-link to="/faq">고객센터</router-link></li>
        <li><router-link to="/myPage">마이페이지</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/loginpage">로그인</router-link></li>
        <li v-if="isAuthenticated">
          <a @click="handlelogout">로그아웃</a>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "JetSetGoHeader",
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    async handlelogout() {
      await this.logout(); // vuex액션 호출
      this.$router.push('/loginpage'); // 로그아웃 후 로그인 페이지로 리다이렉트
    }
  }

}
</script>

<style scoped>
.navbar {
  padding: 0 60px;
  overflow: hidden;
  display: flex;
  justify-content: space-between; /* 좌우 사이 공간 균등하게 분배 */
  width: 100%;
  border-bottom: 1px solid #ececec;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  height: 100px; /* 네비게이션 바 높이 설정 */
  width: 95%;
}

.nav-links li {
  padding: 14px 20px;
}

.nav-links li a {
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links li a:hover, .right-links li a:hover {
  color: #0080FF;
}

.right-links {
  display: flex;
  margin-left: auto;
}

.router-link-active {
  color: #0080FF !important; /* 활성화된 링크의 글씨색 변경*/
}
</style>

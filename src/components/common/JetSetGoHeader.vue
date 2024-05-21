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
        <li><router-link to="/mypage">마이페이지</router-link></li>
        <li><router-link to="/loginpage">로그인</router-link></li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "JetSetGoHeader"
}
</script>

<style scoped>

.navbar {
  padding: 0 60px;
  /*background-color: #2E9AFE;*/
  overflow: hidden;
  display: flex;
  justify-content: space-between; /* 좌우 사이 공간 균등하게 분배*/
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


.nav-links li{
  padding: 14px 20px;
  /*font-size: 20px;*/
}

.nav-links li a {
  text-decoration: none;
  /*color: white;*/
  transition: color 0.3s;
}

.nav-links li a:hover, .right-links li a:hover {
  /*color: #0080FF;*/
}

.right-links {
  display: flex;
  margin-left: auto;
}
</style>
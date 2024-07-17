<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <div class="right-links">   <!--오른쪽 정렬하려고 묶음-->
        <li><router-link to="/faq">고객센터</router-link></li>
        <li><router-link to="/myPage">마이페이지</router-link></li>
        <li><router-link to="/loginpage">로그인</router-link></li>
      </div>
    </ul>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Navbar is mounted');
});
</script>

<style scoped>
.navbar {
  background-color: #2E9AFE;
  overflow: hidden;
  display: flex;
  justify-content: space-between; /* 좌우 사이 공간 균등하게 분배*/
  width: 100%;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  height: 30px; /* 네비게이션 바 높이 설정 */
  width: 95%;
}


.nav-links li{
  padding: 14px 20px;
}

.nav-links li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.nav-links li a:hover, .right-links li a:hover {
  color: #0080FF;
}

.right-links {
  display: flex;
  margin-left: auto;
}
</style>

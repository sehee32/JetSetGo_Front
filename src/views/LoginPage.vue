<template>
  <section class="login-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card shadow-lg">
            <div class="card-body p-10">
              <h2 class="text-center">LogIn</h2>
              <p></p>
              <form @submit.prevent="loginpage">
                <div>
                  <input type="text" id="username" class="form-control" v-model="username" placeholder="아이디" required />
                </div>
                <div>
                  <input type="password" id="password" class="form-control" v-model="password" placeholder="비밀번호" required />
                </div>
                <div class="d-flex">
                  <button type="submit" class="btn">로그인</button>
                  <router-link to="/signup" type="button" class="btn">회원가입</router-link>
                  <router-view/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'LoginPage',
    components: {},
  data() {
    return {
      username: '',
      password: '',
    };
  },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
      loginpage() {
        console.log('회원가입 정보:', this.username, this.password);
      }
    }
}
</script>


<style scoped>
.login-section {
  /*로그인 섹션 배경색이랑 패딩 설정*/
  background-color: #f2f3f8;
  padding: 200px 0;
}
.card {
  /*카드 부분 설정*/
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 138px;
}
input.form-control {
  /*인풋 창 설정*/
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  position: center;


}
input.form-control:focus {
  /*포커스가 된 인풋 창 설정*/
  box-shadow: 0 0 0 0.15rem rgba(0, 123, 255, 0.25);
}

.d-flex {
  /*플렉스 디스플레이 사용하여 로그인,회원가입 버튼 설정*/
  padding: 20px;

}

</style>
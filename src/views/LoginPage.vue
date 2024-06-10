<template>
  <div>
    <v-img
        class="mx-auto my-6"
        max-width="300"
        :src="require('@/assets/JetSetGoLogo.png')"
    ></v-img>
    <v-card class="custom-card mx-auto px-6 py-8">
      <v-form
          v-model="formValid"
          @submit.prevent="onSubmit"
      >
        <v-text-field
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="ID"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            :type="show ? 'text' : 'password'"
            class="mb-2"
            label="Password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            clearable
        >
          <!-- 비밀번호 표시/숨김 아이콘 -->
          <template v-slot:append-inner>
            <v-icon @click="show = !show">
              {{ show ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </template>
        </v-text-field>

        <br>

        <v-btn
            :disabled="!formValid"
            :loading="loading"
            color="#00256c"
            size="large"
            type="submit"
            variant="elevated"
            block
            @click="login"
        >
          로그인
        </v-btn>
        <br>
        <!-- 회원가입 버튼 -->
        <v-btn
            size="large"
            color="#00256c"
            block
            @click="goToSignUpPage"
        >
          회원가입
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      formValid: false,
      loading: false,
      show: false, // 비밀번호 보기/숨기기 아이콘 상태
      required: v => !!v || '이 항목을 입력하지 않았습니다.'
    };
  },
  methods: {
    onSubmit() {
      console.log('회원가입 정보:', this.username, this.password);
      this.loading = true;

      // 예시로, 2초 후에 로딩을 멈추도록 설정
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    login() {
      // this.$router.push('/jetsetgomain');
      // 로그인 버튼 누르고 난 후
    },
    goToSignUpPage() {
      this.$router.push('/signup');
    }
  }
}
</script>

<style scoped>
.custom-card {
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 600px;
  width: 100%;
}
</style>

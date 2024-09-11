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
          @submit.prevent="submitlogin"
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
import { mapActions } from 'vuex';
// import axios from "axios";

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
    ...mapActions(['login']),
    async submitlogin() {
      if (!this.formValid) return;
      this.loading = true;

      try {
        // Vuex 액션 호출
        await this.login({ username: this.username, password: this.password });

        // 메인페이지로 이동
        this.$router.push('/bookingpage');
      } catch (error) {
        console.error('로그인 오류:', error);
        alert('아이디 또는 비밀번호를 확인해주세요.');
      } finally {
        this.loading = false;
      }
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

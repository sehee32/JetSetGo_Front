<template>
  <div>
    <v-img
        class="mx-auto my-6"
        max-width="300"
        :src="require('@/assets/JetSetGoLogo.png')"
    ></v-img>
    <v-card class="custom-card mx-auto px-6 py-8">
      <v-form v-model="formValid" @submit.prevent="signup">
        <div>
          <v-text-field
              v-model="name"
              :rules="[rules.required]"
              class="mb-2"
              id="name"
              label="이름"
              variant="outlined"
              prepend-inner-icon="mdi-account-outline"
              clearable
          ></v-text-field>

          <v-text-field
              v-model="username"
              :rules="[rules.required]"
              class="mb-2"
              id="username"
              label="ID"
              variant="outlined"
              prepend-inner-icon="mdi-account-outline"
              clearable
          ></v-text-field>

          <v-btn
              color="#00256c"
              size="small"
              type="button"
              variant="elevated"
              name="id_check"
              block
              @click="checkUsername"
          >
            중복확인
          </v-btn>

          <br>

          <v-text-field
              v-model="password"
              :rules="[rules.required, rules.password]"
              :type="show ? 'text' : 'password'"
              class="mb-2"
              id="password"
              label="비밀번호"
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
        </div>

        <div>
          <v-text-field
              v-model="confirmPassword"
              :rules="[rules.required, rules.matchPassword]"
              :type="show ? 'text' : 'password'"
              class="mb-2"
              id="confirmPassword"
              label="비밀번호 확인"
              variant="outlined"
              prepend-inner-icon="mdi-lock-check-outline"
              clearable
          >
            <template v-slot:append-inner>
              <v-icon @click="show = !show">
                {{ show ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template>
          </v-text-field>
        </div>

        <div>
          <v-text-field
              v-model="phoneNumber"
              :rules="[rules.required]"
              class="mb-2"
              id="phoneNumber"
              label="휴대전화번호"
              variant="outlined"
              prepend-inner-icon="mdi-phone-outline"
              clearable
          ></v-text-field>
        </div>

        <div>
          <v-btn
              color="#00256c"
              size="small"
              type="button"
              variant="elevated"
              name="phone_check"
              block
              @click="verifyPhoneNumber"
          >
            인증하기
          </v-btn>
        </div>

        <br>

        <div>
          <v-text-field
              v-model="birthdate"
              :rules="[rules.required]"
              class="mb-2"
              id="birthdate"
              label="생년월일"
              type="date"
              prepend-inner-icon="mdi-calendar-outline"
              variant="outlined"
          ></v-text-field>
        </div>

        <br><br>

        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="agreeTerms" v-model="agreeTerms" required />
          <label class="form-check-label" for="agreeTerms">이용 약관에 동의합니다.</label>
        </div>

        <br>

        <div>
          <v-btn
              :disabled="!formValid || !birthdate || !agreeTerms"
              color="#00256c"
              size="large"
              type="submit"
              variant="elevated"
              block
              @click="signup"
          >
            가입하기
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      birthdate: '',
      phoneNumber: '',
      agreeTerms: false,
      formValid: false,
      show: false, // 비밀번호 보기/숨기기 아이콘 상태
      rules: {
        required: v => !!v || '이 항목을 입력하지 않았습니다.',
        password: v => v.length >= 8 || '비밀번호는 최소 8자 이상이어야 합니다.',
        matchPassword: v => v === this.password || '비밀번호가 일치하지 않습니다.'
      }
    };
  },
  methods: {
    signup() {
      if (this.password !== this.confirmPassword) {
        console.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 회원가입 정보 서버로 전송
      axios.post('http://localhost:8080/api/signup', {
        name: this.name,
        username: this.username,
        password: this.password,
        birthdate: this.birthdate,
        phoneNumber: this.phoneNumber,
        agreeTerms: this.agreeTerms
      })
          .then(response => {
            console.log('회원가입 성공:', response.data);
          })
          .catch(error => {
            console.error('회원가입 실패:', error);
          });
    },

    verifyPhoneNumber() {
      // 휴대전화번호 인증하기 기능
      console.log('휴대전화번호 인증하기:', this.phoneNumber);
    },

    checkUsername() {
      // 아이디 중복 확인 기능
      axios.post('http://localhost:8080/api/checkUsername', { username: this.username })
          .then(response => {
            if (response.data.exists) {
              console.log('이미 사용중인 아이디 입니다.');
            } else {
              console.log('사용할 수 있는 아이디 입니다.');
            }
          })
          .catch(error => {
            console.error('아이디 중복 확인에 실패했습니다.', error);
          });
    }
  }
};
</script>

<style scoped>

.form-check {
  margin-top: 20px;
}

.custom-card {
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 600px;
  width: 100%;
}

</style>

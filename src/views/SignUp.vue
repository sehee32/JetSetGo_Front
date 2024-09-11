<template>
  <div>
    <v-img
        class="mx-auto my-6"
        max-width="300"
        :src="require('@/assets/JetSetGoLogo.png')"
    ></v-img>
    <v-card class="custom-card mx-auto px-6 py-8">
      <v-form v-model="formValid" @submit.prevent="Signup">
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

          <!-- 사용자명 입력과 버튼을 감싸는 div -->
          <div class="username-container">
            <v-text-field
                v-model="username"
                :rules="[rules.required]"
                id="username"
                label="ID"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                clearable
                class="username-text-field"
            ></v-text-field>
            <v-btn
                class="username-btn"
                color="#00256c"
                size="small"
                @click="checkUsername"
            >
              중복확인
            </v-btn>
          </div>

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

        <!-- 인증하기 버튼을 텍스트 필드 내부에 배치 -->
        <div class="phone-container">
          <v-text-field
              v-model="phoneNumber"
              :rules="[rules.required]"
              id="phoneNumber"
              label="휴대전화번호"
              variant="outlined"
              prepend-inner-icon="mdi-phone-outline"
              clearable
              class="phone-text-field"
          ></v-text-field>
          <v-btn
              class="phone-btn"
              color="#00256c"
              size="small"
              @click="verify"
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
              :disabled="!formValid || !birthdate || !agreeTerms || !verificationSuccess || !usernameChecked"
              color="#00256c"
              size="large"
              type="submit"
              variant="elevated"
              block
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
      verificationSuccess: false, // 인증 성공 여부를 저장하는 변수
      usernameChecked: false, // 아이디 중복 확인 성공 여부를 저장하는 변수
      rules: {
        required: v => !!v || '이 항목을 입력하지 않았습니다.',
        password: v => v.length >= 8 || '비밀번호는 최소 8자 이상이어야 합니다.',
        matchPassword: v => v === this.password || '비밀번호가 일치하지 않습니다.',
      }
    }
  },
  methods: {
    Signup() {
      if (this.password !== this.confirmPassword) {
        console.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!this.verificationSuccess) {
        alert('본인 인증을 완료해주세요.');
        return;
      }

      if (!this.usernameChecked) {
        alert('아이디 중복 확인을 완료해주세요.');
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
            alert('회원가입이 성공적으로 완료되었습니다.');

            this.$router.push('/loginpage');

          })
          .catch(error => {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다.');
          });
    },

    async verify() {
      const IMP = window.IMP;
      IMP.init("imp12777257");
      try {
        IMP.certification(
            {
              // param
              pg: "inicis_unified.MIIiasTest", // 본인인증 설정이 2개 이상 되어 있는 경우 필수
              merchant_uid: "ORD20180131-0000011", // 주문 번호
            },
            function (rsp) {
              // callback
              if (rsp.success) {
                // 인증 성공 시
                console.log("인증 성공");
                alert('본인 인증 요청에 성공했습니다.');
                this.verificationSuccess = true; // 인증 성공 시 변수 값을 true로 설정
              } else {
                // 인증 실패 시 로직
                console.log("본인 인증 요청 실패");
                alert('본인 인증 요청에 실패했습니다.');
                this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
              }
            }.bind(this) // 함수 내부에서 this를 사용할 수 있도록 바인딩
        );
      } catch (error) {
        console.error("본인 인증 요청 실패:", error);
        alert('본인 인증 요청에 실패했습니다.');
        this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
      }
    },

    checkUsername() {
      // 아이디 중복 확인 기능
      axios.post('http://localhost:8080/api/checkUsername', { username: this.username })
          .then(response => {
            if (response.data.exists) {
              console.log('이미 사용중인 아이디 입니다.');
              alert('이미 사용중인 아이디 입니다.');
              this.usernameChecked = false; // 중복된 아이디가 있는 경우 false로 설정
            } else {
              console.log('사용할 수 있는 아이디 입니다.');
              alert('사용할 수 있는 아이디 입니다.');
              this.usernameChecked = true; // 사용 가능한 아이디인 경우 true로 설정
            }
          })
          .catch(error => {
            console.error('아이디 중복 확인에 실패했습니다.', error);
            alert('아이디 중복 확인에 실패했습니다.');
            this.usernameChecked = false; // 오류 발생 시 false로 설정
          });
    },
  }
};
</script>

<style scoped>
.username-container,
.phone-container {
  position: relative;
  display: flex;
  align-items: center;
}

.username-text-field,
.phone-text-field {
  flex: 1;
}

.username-btn,
.phone-btn {
  position: absolute;
  right: 15px;
  top: 35%;
  transform: translateY(-50%);
  margin-left: 0;
}

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

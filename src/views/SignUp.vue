<template>
  <section class="signup-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card shadow-lg">
            <div class="card-body p-6">
              <h2 class="text-center">Sign Up</h2>
              <form @submit.prevent="signup">
                <div>
                  <input type="text" id="name" class="form-control" v-model="name" placeholder="이름" required />
                </div>
                <div>
                  <input type="text" id="username" class="form-control" v-model="username" placeholder="아이디" required />
                </div>
                <div>
                  <input type="submit" class="btn-primary" name="id_check" value="중복확인" @click="checkUsername" />
                </div>
                <div>
                  <input type="password" id="password" class="form-control" v-model="password" placeholder="비밀번호" required />
                </div>
                <div>
                  <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" placeholder="비밀번호 확인" required />
                  <p v-if="password !== confirmPassword" class="text-danger">비밀번호가 일치하지 않습니다.</p>
                </div>
                <div>
                  <input type="text" id="phoneNumber" class="form-control" v-model="phoneNumber" placeholder="휴대전화번호" required />
                </div>
                <div>
                  <button type="button" class="btn-primary" @click="verifyPhoneNumber">인증하기</button>
                </div>
                <div>
                  <input type="date" id="birthdate" class="form-control" v-model="birthdate" placeholder="생년월일" required />
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="agreeTerms" v-model="agreeTerms" required />
                  <label class="form-check-label" for="agreeTerms">이용 약관에 동의합니다.</label>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn" :disabled="password !== confirmPassword">가입</button>
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
      agreeTerms: false
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
.signup-section {
  background-color: #f2f3f8;
  padding: 100px 0;
}
.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  margin-bottom: 100px;
}
input.form-control {
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}
input.form-control:focus {
  box-shadow: 0 0 0 0.15rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  background-color: #003a70;
  border-color: #003a70;
  color: white;
  margin-top: -50px;
  transition: background-color 0.3s, border-color 0.3s;
  border-radius: 7px;
}
.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.form-check {
  margin-top: 200px;
}

.d-grid {
  padding: 10px;
}
</style>

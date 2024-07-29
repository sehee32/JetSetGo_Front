<template>
  <div class="changePassword">
    <h1>비밀번호 변경</h1>
    <p>새로운 비밀번호를 입력해 주세요.</p>
    <p>[ <span class="red">*</span> 는 필수 입력 사항입니다.]</p>
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <v-form validate-on="submit" @submit.prevent="submit">
            <div class = "inputPassword" >
              <!-- 현재 비밀번호 -->
              <p>현재 비밀번호 <span class="red">*</span> </p>
              <v-text-field
                  class="costom-text-field"
                  v-model="currentPassword"
                  type="password"
                  variant="underlined"
                  maxlength="20"
                  :rules="[rules.required]"
              ></v-text-field>
              <!-- 신규 비밀번호 -->
              <p>신규 비밀번호 <span class="red">*</span> </p>
              <v-text-field
                  class="costom-text-field"
                  v-model="newPassword"
                  type="password"
                  variant="underlined"
                  maxlength="20"
                  :rules="[rules.required, rules.password]"
                  ref="newPasswordField"
                  @input="validateNewPassword"
              ></v-text-field>
              <!-- 신규 비밀번호 확인 -->
              <p>신규 비밀번호 확인 <span class="red">*</span> </p>
              <v-text-field
                  class="costom-text-field"
                  v-model="confirmNewPassword"
                  type="password"
                  variant="underlined"
                  maxlength="20"
                  :rules="[rules.required, rules.matchPassword]"
              ></v-text-field>
            </div>
            <!-- 버튼 -->
            <div>
              <v-btn
                  @click="goBack"
                  class="backBtn"
                  text="취소"
                  block
              ></v-btn>
              <v-btn
                  :loading="loading"
                  class="submitBtn"
                  text="변경하기"
                  type="submit"
                  block
              ></v-btn>
            </div>
          </v-form>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>


<script>
export default {
  name: "MyPageChangePassword",
  components: {},
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      rules: {
        required : value => !!value || '필수 입력 항목입니다.',
        password: value => this.checkPassword(value),
        matchPassword: value => value === this.newPassword || '비밀번호가 일치하지 않습니다.'
      },
      loading: false,
      timeout: null,
      userName: '',
    };
  },
  methods: {
    async submit(event) {
      this.loading = true;
      const results = await event;
      this.loading = false;
      alert(JSON.stringify(results));
    },
    checkPassword(value) {
      if (value.length < 8) {
        return '비밀번호는 최소 8자 이상이어야 합니다.';
      }
      return true;
    },
    validateNewPassword() {
      if (0 < this.newPassword.length) {
        this.$refs.newPasswordField.validate();
      }
    },
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    },
  }
}
</script>


<style scoped>
.changePassword{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 70px;
}

.changePassword .costom-container{
  max-width: 1280px;
  padding: 0;
}

.changePassword h1{
  text-align: left;
  margin-bottom: 20px;
}

.changePassword p{
  text-align: left;
}

.changePassword .red{
  color: red;
  font-weight: 900;
}

/* 비밀번호 입력 */
.changePassword .inputPassword{
  margin: 20px 0;
}

.changePassword .inputPassword p{
  font-size: 14px;
  color: #555555;
}

.changePassword .inputPassword .costom-text-field{
  margin-bottom: 30px;
}

/* 버튼 */
.changePassword .backBtn,
.changePassword .submitBtn{
  display: inline-block;
  width: 320px;
  height: 65px;
  min-width: 34px;
  margin: 60px 2px 0;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 2;
  border: 1px solid #00256c;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}

.changePassword .backBtn {
  background-color: #fff;
  color: #00256c;
}

.changePassword .submitBtn {
  background-color: #00256c;
  color: #fff;
}

.changePassword .backBtn:hover,
.changePassword .submitBtn:hover {
  border: 2px solid #0064de;
}

</style>
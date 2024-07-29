<template>
  <div class="withdrawal">
    <!-- 비밀번호 확인 화면 -->
    <div v-if="!isPasswordValid" class="confirmPassword">
      <h1>비밀번호 확인</h1>
      <p>회원 정보 변경을 위해 비밀번호를 확인해 주세요.</p>
      <p>[ <span class="red">*</span> 는 필수 입력 사항입니다.]</p>
      <v-app>
        <v-main>
          <v-container class="costom-container">
            <v-form validate-on="submit" @submit.prevent="submitPassword">
              <div class = "inputPassword" >
                <!-- 아이디 -->
                <p>아이디</p>
                <v-text-field
                    class="costom-text-field"
                    v-model="id"
                    type="id"
                    variant="underlined"
                    readonly
                ></v-text-field>
                <!-- 비밀번호 확인 -->
                <p>비밀번호 확인 <span class="red">*</span> </p>
                <v-text-field
                    class="costom-text-field"
                    v-model="currentPassword"
                    type="password"
                    variant="underlined"
                    maxlength="20"
                    :rules="[rules.required]"
                    @keydown.enter="submitPassword"
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
                    text="확인"
                    type="submit"
                    block
                ></v-btn>
              </div>
            </v-form>
          </v-container>
        </v-main>
      </v-app>
    </div>
    <!------------------------------------------------------------------------------>
    <!-- 회원 탈퇴 화면 -->
    <div v-if="isPasswordValid" class="withdrawalTerms">
      <h1>회원탈퇴</h1>
      <v-app>
        <v-main>
          <v-container class="costom-container">
            <v-form validate-on="submit" @submit.prevent="withdrawalSubmit">
              <div class="costom-box">
                <h3>회원 탈퇴 시 유의사항</h3>
                <p>● 회원 탈퇴하시면 홈페이지 상에서 예약기록 조회 및 회원을 위한 항공권 할인 혜택 등의 서비스를 이용하실 수 없습니다.</p>
                <p>● 탈퇴 후 아이디/비밀번호 정보는 모두 삭제되며, 탈퇴한 아이디는 부정 사용 방지를 위하여 복구가 불가하오니 신중하게 선택해 주시기 바랍니다.</p>
                <v-checkbox
                    v-model="terms"
                    :rules="[rules.termsCheck]"
                    :label="`[필수] 위의 인터넷 회원 탈퇴 시 유의사항을 확인 하였고, 인터넷 회원 탈퇴에 동의 합니다.`"
                ></v-checkbox>

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
                    text="탈퇴"
                    type="submit"
                    block
                ></v-btn>
              </div>
            </v-form>
          </v-container>
        </v-main>
      </v-app>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPageWithdrawal",
  components: {},
  data() {
    return {
      id: 'hong',
      currentPassword: '',
      rules: {
        required : value => !!value || '필수 입력 항목입니다.',
        termsCheck : value => !!value || '회원 탈퇴를 원하시는 경우 유의 사항을 읽고 탈퇴에 동의해 주시기 바랍니다.'
      },
      loading: false,
      isPasswordValid: false, // 비밀번호 확인 상태
      terms: false, // 약관 동의 상태
    };
  },
  methods: {
    async submitPassword() {
      this.loading = true;

      // 비밀번호 확인 로직
      if (this.currentPassword === '1234') {
        this.isPasswordValid = true;
        console.log('비밀번호가 유효합니다. 추가 작업을 수행합니다.');
      } else {
        alert('비밀번호가 일치하지 않습니다.'); // 비밀번호가 일치하지 않으면 에러 메시지 표시
      }
      this.loading = false;
    },
    async withdrawalSubmit() {
      this.loading = true;
      if (this.terms == true) {
        alert('회원탈퇴 성공'); // 정보 변경 성공 시
      }
      this.loading = false;
    },
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    }
  }
}
</script>


<style scoped>
.withdrawal{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 70px;
}

.withdrawal .costom-container{
  max-width: 1280px;
  padding: 0;
}

.withdrawal h1{
  text-align: left;
  margin-bottom: 20px;
}

.withdrawal p{
  text-align: left;
}

.withdrawal .red{
  color: red;
  font-weight: 900;
}

/* 비밀번호 확인 화면, 기본정보 변경 화면 공통  */
/* 버튼 */
.withdrawal .backBtn,
.withdrawal .submitBtn{
  display: inline-block;
  width: 280px;
  height: 60px;
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

.withdrawal .backBtn {
  background-color: #fff;
  color: #00256c;
}

.withdrawal .submitBtn {
  background-color: #00256c;
  color: #fff;
}

.withdrawal .backBtn:hover,
.withdrawal .submitBtn:hover {
  border: 2px solid #0064de;
}

/* 비밀번호 확인 화면 */
/* 비밀번호 입력 */
.withdrawal .confirmPassword .inputPassword{
  margin: 20px 0;
}

.withdrawal .confirmPassword .inputPassword p{
  font-size: 14px;
  color: #555555;
}

.withdrawal .confirmPassword .inputPassword .costom-text-field{
  margin-bottom: 30px;
}

/* 회원 탈퇴 화면 */

.withdrawal .withdrawalTerms .costom-box{
  position: relative;
  text-align: left;
  padding: 40px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

</style>
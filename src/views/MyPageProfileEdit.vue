<template>
  <div class="profileEdit">
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
    <!-- 기본정보 변경 화면 -->
    <div v-if="isPasswordValid" class="profileList">
      <h1>기본정보</h1>
      <p class="costom-p">아이디는 변경할 수 없습니다.</p>
      <v-app>
        <v-main>
          <v-container class="costom-container">
            <!-- 회원정보 -->
            <div class="profile">
              <v-row>
                <!-- 첫 번째 항목 -->
                <v-col class="costom-profile-col">
                  <v-list dense bg-color="#f3f4f8">
                    <v-list-item>
                      <v-list-item-content >
                        <v-list-item-title>성명</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="costom-profile-title"><strong>홍길동</strong></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <!-- 두 번째 항목 -->
                <v-col class="costom-profile-col">
                  <v-list dense bg-color="#f3f4f8">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>아이디</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="costom-profile-title"><strong>hong</strong></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <!-- 세 번째 항목 -->
                <v-col class="costom-profile-col">
                  <v-list dense bg-color="#f3f4f8">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>연락처</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="costom-profile-title"><strong>01011111111</strong></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <!-- 네 번째 항목 -->
                <v-col class="costom-profile-col-last">
                  <v-list dense bg-color="#f3f4f8">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>생년월일</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="costom-profile-title"><strong>20240101</strong></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </div>
            <!-- 정보 변경 -->
            <v-form ref="profileForm" validate-on="submit" @submit.prevent="profileSubmit">
              <div class="costom-box">
                <div class = "Contact" >
                  <div class ="title">
                    <h3>연락처 정보</h3>
                    <p>[ <span class="red">*</span> 는 필수 입력 사항입니다.]</p>
                  </div>
                  <div class="info">
                    <p>휴대전화 번호 <span class="red">*</span> </p>
                    <v-text-field
                        class="costom-text-field"
                        v-model="contact"
                        type="contact"
                        variant="underlined"
                        maxlength="20"
                        :rules="[rules.required]"
                        ref="contactField"
                        @keydown.enter.stop.prevent
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <!-- 버튼 -->
              <div>
                <v-btn
                    @click="goBack"
                    class="backBtn"
                    text="이전"
                    block
                ></v-btn>
                <v-btn
                    :loading="loading"
                    class="submitBtn"
                    text="변경완료"
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
  name: "MyPageProfileEdit",
  components: {},
  data() {
    return {
      id: 'hong',
      currentPassword: '',
      rules: {
        required : value => !!value || '필수 입력 항목입니다.'
      },
      loading: false,
      isPasswordValid: false, // 비밀번호 확인 상태
      contact: '01011111111',
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
    async profileSubmit() {
      this.loading = true;
      const isValid = await this.$refs.contactField.validate();
      if (isValid == '') {
        alert('정보 변경 성공'); // 정보 변경 성공 시
      } else {
        if (!this.contact) this.$refs.contactField.focus(); // 에러난 필드 포커스
      }
      this.loading = false;
    },
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    }
  },
  mounted() {
    window.scrollTo(0, 0); // 페이지 스크롤 위치 맨 위로
  }
}
</script>

<style scoped>
.profileEdit{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 70px;
}

.profileEdit .costom-container{
  max-width: 1280px;
  padding: 0;
}

.profileEdit h1{
  text-align: left;
  margin-bottom: 20px;
}

.profileEdit p{
  text-align: left;
}

.profileEdit .red{
  color: red;
  font-weight: 900;
}

/* 비밀번호 확인 화면, 기본정보 변경 화면 공통  */
/* 버튼 */
.profileEdit .backBtn,
.profileEdit .submitBtn{
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

.profileEdit .backBtn {
  background-color: #fff;
  color: #00256c;
}

.profileEdit .submitBtn {
  background-color: #00256c;
  color: #fff;
}

.profileEdit .backBtn:hover,
.profileEdit .submitBtn:hover {
  border: 2px solid #0064de;
}

/* 비밀번호 확인 화면 */
/* 비밀번호 입력 */
.profileEdit .confirmPassword .inputPassword{
  margin: 20px 0;
}

.profileEdit .confirmPassword .inputPassword p{
  font-size: 14px;
  color: #555555;
}

.profileEdit .confirmPassword .inputPassword .costom-text-field{
  margin-bottom: 30px;
}

/* 기본정보 변경 화면 */
.profileEdit .costom-p{
  font-size: 14px;
  color: #555555;
  margin-bottom: 20px;
}

/* 회원정보 */
.profileEdit .profileList .profile{
  text-align: left;
  padding: 32px;
  margin-bottom: 40px;
  border-radius: 10px;
  border: 0;
  background-color: #f3f4f8;
}

.profileEdit .profileList .profile .costom-profile-col {
  border-right: 1px solid #ccc; /* 오른쪽에 border 추가 */
  padding: 0;
}

.profileEdit .profileList .profile .costom-profile-col-last {
  padding: 0;
}

.profileEdit .profileList .profile .costom-profile-title{
  font-size: 20px;
  font-weight: 500;
}

/* 정보 변경 */
.profileEdit .profileList .costom-box{
  text-align: left;
  padding: 40px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.profileEdit .profileList .costom-box .title,
.profileEdit .profileList .costom-box .info{
  display: inline-block;
}

.profileEdit .profileList .costom-box .title{
  width: 30%;
}

.profileEdit .profileList .costom-box .title h3{
  margin-bottom: 15px;
}

.profileEdit .profileList .costom-box .info{
  width: 60%;
}

.profileEdit .profileList .costom-box .info p{
  font-size: 14px;
  color: #555555;
}

.profileEdit .profileList .costom-box .costom-text-field{
  margin-bottom: 30px;
}

</style>
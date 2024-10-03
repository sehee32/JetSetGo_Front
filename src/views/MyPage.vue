<template>
<div class="myPage">
  <h1>회원정보</h1>
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
                    <v-list-item-title class="costom-profile-title"><strong>{{ name }}</strong></v-list-item-title>
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
                    <v-list-item-title class="costom-profile-title"><strong>{{ id }}</strong></v-list-item-title>
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
                    <v-list-item-title class="costom-profile-title"><strong>{{ contact }}</strong></v-list-item-title>
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
                    <v-list-item-title class="costom-profile-title"><strong>{{ birthDate }}</strong></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </div>
        <!-- 기본정보 변경 박스 -->
        <div class="costom-box">
          <h3>기본정보</h3>
          <p>성명, 연락처 정보를 변경할 수 있습니다.</p>
          <v-btn :ripple="false" variant="outlined" @click="togglePanel('profile')" class="costom-box-btn">변경</v-btn>
          <v-expansion-panels v-model="activePanel">
            <!-- 기본정보 변경 패널 -->
            <v-expansion-panel value="profile">
              <v-expansion-panel-text>
                <div class="profileEdit">
                  <!-- 비밀번호 확인 화면 -->
                  <div v-if="!isPasswordValid" class="confirmPassword">
                    <h1>비밀번호 확인</h1>
                    <p>회원 정보 변경을 위해 비밀번호를 확인해 주세요.</p>
                    <p>[ <span class="red">*</span> 는 필수 입력 사항입니다.]</p>
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
                              v-model="currentPasswordInfo"
                              type="password"
                              variant="underlined"
                              maxlength="20"
                              :rules="[rules.required]"
                              @keydown.enter="submitPassword"
                          ></v-text-field>
                        </div>
                        <!-- 버튼 -->
                        <div class="button-container">
                          <v-btn
                              :loading="loading"
                              class="submitBtn"
                              text="확인"
                              type="submit"
                              block
                          ></v-btn>
                        </div>
                      </v-form>
                  </div>
                  <!------------------------------------------------------------------------------>
                  <!-- 기본정보 변경 화면 -->
                  <div v-if="isPasswordValid" class="profileList">
                    <h1>기본정보</h1>
                    <p class="costom-p">아이디는 변경할 수 없습니다.</p>
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
                        <div class="button-container">
                          <v-btn
                              :loading="loading"
                              class="submitBtn"
                              text="변경완료"
                              type="submit"
                              block
                          ></v-btn>
                        </div>
                      </v-form>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <!-- 비밀번호 변경 박스 -->
        <div class="costom-box">
          <h3>비밀번호</h3>
          <p>회원님의 소중한 개인정보 보호를 위해 비밀번호를 주기적으로 변경해 주세요.</p>
          <v-btn :ripple="false" variant="outlined" @click="togglePanel('password')" class="costom-box-btn">변경</v-btn>
          <v-expansion-panels v-model="activePanel">
            <!-- 비밀번호 변경 패널 -->
            <v-expansion-panel value="password">
              <v-expansion-panel-text>
                <div class="changePassword">
                  <h1>비밀번호 변경</h1>
                  <p>새로운 비밀번호를 입력해 주세요.</p>
                  <p>[ <span class="red">*</span> 는 필수 입력 사항입니다.]</p>
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
                            @keydown.enter="submit"
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
                            @keydown.enter="submit"
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
                            @keydown.enter="submit"
                        ></v-text-field>
                      </div>
                      <!-- 버튼 -->
                      <div class="button-container">
                        <v-btn
                            :loading="loading"
                            class="submitBtn"
                            text="변경하기"
                            type="submit"
                            block
                        ></v-btn>
                      </div>
                    </v-form>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <!-- 예약내역 -->
        <div class="costom-box">
          <h3>예약내역</h3>
          <p>예약내역을 확인 할 수 있습니다.</p>
          <v-btn :ripple="false" variant="outlined" router to="/myPageReservationList" class="costom-box-btn">확인</v-btn>
        </div>
        <!-- 회원탈퇴 -->
        <div class="withdrawal">
          <v-btn :ripple="false" variant="text" router to="/myPageWithdrawal" class="withdrawalBtn">회원탈퇴</v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'MyPage',
    components: {},
    data() {
        return {
          name: '',
          id: '',
          contact: '',
          birthDate: '',
          userPassword: '',
          activePanel: [], // 현재 열려 있는 패널의 값을 저장
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
          rules: {
            required : value => !!value || '필수 입력 항목입니다.',
            password: value => this.checkPassword(value),
            matchPassword: value => value === this.newPassword || '비밀번호가 일치하지 않습니다.'
          },
          loading: false,
          currentPasswordInfo: '',
          isPasswordValid: false, // 비밀번호 확인 상태
         };
    },
  watch: {
    activePanel(newValue) {
      // 패널이 닫힐 때 특정 값을 설정
      if (!newValue.includes('profile')) {
        this.currentPasswordInfo = ''; // 특정 값 초기화
        this.isPasswordValid = false; // 비밀번호 확인 상태 초기화
      }
      if (!newValue.includes('password')) {
        this.currentPassword = ''; // 특정 값 초기화
        this.newPassword = '';
        this.confirmNewPassword = '';
      }
    }
  },
    methods: {
      togglePanel(panelValue) {
        // 클릭한 패널이 이미 열려 있는지 확인
        if (this.activePanel.includes(panelValue)) {
          // 열려 있으면 닫기
          this.activePanel = this.activePanel.filter(value => value !== panelValue);
        } else {
          // 닫혀 있으면 열기
          this.activePanel = [panelValue];
        }
      },
      // 비밀번호 변경 상세
      async submit(event) {
        this.loading = true;
        const results = await event;
        this.loading = false;
        alert(JSON.stringify(results));
        this.activePanel = []; // 모든 패널 닫기
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
      // 기본정보 변경 상세
      async submitPassword() {
        this.loading = true;

        // 비밀번호 확인 로직
        if (this.currentPasswordInfo === this.userPassword) {
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
          this.activePanel = []; // 모든 패널 닫기
        } else {
          if (!this.contact) this.$refs.contactField.focus(); // 에러난 필드 포커스
        }
        this.loading = false;
      },
      async fetchUserInfos() {
        const token = localStorage.getItem('jwtToken'); // 저장된 토큰 가져오기
        if (token) {
          try {
            const response = await axios.post('/api/getUserInfos', {
              token: token // 토큰을 본문에 포함
            });
            this.name = response.data.name; // 사용자 정보를 변수에 저장
            this.id = response.data.username;
            this.contact = response.data.phoneNumber;
            this.birthDate = response.data.birthdate;
            this.userPassword = response.data.password;
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        }
      }
    },
  mounted() {
    const element = this.$el.querySelector('.v-application__wrap');
    if (element) {
      element.style.minHeight = 'initial';
    } //v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용},
    this.fetchUserInfos();
  }
}
</script>

<style scoped>

.myPage {
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 70px;
}

.myPage .costom-container{
  max-width: 1280px;
  padding: 0;
}

.myPage h1{
  text-align: left;
  margin-bottom: 20px;
}

/* 회원정보 */
.myPage .profile{
  text-align: left;
  padding: 32px;
  margin-bottom: 40px;
  border-radius: 10px;
  border: 0;
  background-color: #f3f4f8;
}

.myPage .profile .costom-profile-col {
  border-right: 1px solid #ccc; /* 오른쪽에 border 추가 */
  padding: 0;
}

.myPage .profile .costom-profile-col-last {
  padding: 0;
}

.myPage .costom-profile-title{
  font-size: 20px;
  font-weight: 500;
}

/* 비밀번호 변경, 기본정보 변경, 예약내역 */
.myPage .costom-box{
  position: relative;
  text-align: left;
  padding: 40px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.myPage .costom-box h3{
  margin-bottom: 15px;
}

.myPage .costom-box .costom-box-btn{
  position: absolute;
  top: 30px;
  right: 40px;
  margin-bottom: 15px;
  border-radius: 10px;
}

.myPage .costom-box .costom-box-btn:hover{
  border: 2px solid #0064de;
}

/* 아코디언 패널 커스텀 스타일 */
.v-expansion-panel {
  //background-color: #F6F6F6;
  box-shadow: none; /* 그림자 제거 */
  border: none; /* 테두리 제거 */
}


/* 아코디언 패널 텍스트 스타일 */
.v-expansion-panel-text {
  padding: 0; /* 기본 패딩 제거 */
}

/* 비밀번호 변경 상세 */
.changePassword{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 30px;
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

/* 버튼 가운데 정렬 */
.button-container {
  text-align: center; /* 가운데 정렬 */
}

/* 비밀번호 변경 상세 */
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

/* 비밀번호 변경 상세 */
/* 버튼 */

.changePassword .submitBtn{
  display: inline-block;
  width: 280px;
  height: 60px;
  min-width: 34px;
  margin-bottom: 30px;
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

.changePassword .submitBtn {
  background-color: #00256c;
  color: #fff;
}

/* 기본정보 변경 상세*/
.profileEdit{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 30px;
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

/* 기본정보 변경 상세*/
/* 비밀번호 확인 화면, 기본정보 변경 화면 공통  */
/* 버튼 */
.profileEdit .submitBtn{
  display: inline-block;
  width: 280px;
  height: 60px;
  min-width: 34px;
  margin-bottom: 30px;
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

.profileEdit .submitBtn {
  background-color: #00256c;
  color: #fff;
}

/* 기본정보 변경 상세*/
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

/* 기본정보 변경 상세*/
/* 기본정보 변경 화면 */
.profileEdit .costom-p{
  font-size: 14px;
  color: #555555;
  margin-bottom: 20px;
}

/* 기본정보 변경 상세*/
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


/* 회원탈퇴 */
.myPage .withdrawal{
  text-align: left;
  margin-bottom: 30px;
}

.myPage .withdrawal .withdrawalBtn{
  text-decoration: underline; /* 밑줄 효과 */
}

.myPage .withdrawal .withdrawalBtn:hover{
  border: 1px solid #0064de; ;
}
</style>
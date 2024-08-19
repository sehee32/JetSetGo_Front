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
        <!-- 예약내역 -->
        <div class="costom-box">
          <h3>예약내역</h3>
          <p>예약내역을 확인 할 수 있습니다.</p>
          <v-btn :ripple="false" variant="outlined" router to="/myPageReservationList" class="costom-box-btn">확인</v-btn>
        </div>
        <!-- 비밀번호 변경 박스 -->
        <div class="costom-box">
          <h3>비밀번호</h3>
          <p>회원님의 소중한 개인정보 보호를 위해 비밀번호를 주기적으로 변경해 주세요.</p>
          <v-btn :ripple="false" variant="outlined" @click="togglePanel('password')" class="costom-box-btn">변경</v-btn>

          <v-expansion-panels v-model="activePanel">
            <!-- 비밀번호 변경 패널 -->
            <v-expansion-panel value="password">
              <v-expansion-panel-title>
                비밀번호 변경
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p>회원님의 소중한 개인정보 보호를 위해 비밀번호를 주기적으로 변경해 주세요.</p>
                <v-btn :ripple="false" variant="outlined" router to="/myPageChangePassword">변경</v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <!-- 기본정보 변경 박스 -->
        <div class="costom-box">
          <h3>기본정보</h3>
          <p>성명, 연락처 정보를 변경할 수 있습니다.</p>
          <v-btn :ripple="false" variant="outlined" @click="togglePanel('profile')" class="costom-box-btn">변경</v-btn>

          <v-expansion-panels v-model="activePanel">
            <!-- 기본정보 변경 패널 -->
            <v-expansion-panel value="profile">
              <v-expansion-panel-title>
                기본정보 변경
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p>성명, 연락처 정보를 변경할 수 있습니다.</p>
                <v-btn :ripple="false" variant="outlined" router to="/myPageProfileEdit">변경</v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
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
export default {
    name: 'MyPage',
    components: {},
    data() {
        return {
          activePanel: [], // 현재 열려 있는 패널의 값을 저장
         };
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
      }
    },
  mounted() {
    const element = this.$el.querySelector('.v-application__wrap');
    if (element) {
      element.style.minHeight = 'initial';
    }//v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용},
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
  box-shadow: none; /* 그림자 제거 */
  border: none; /* 테두리 제거 */
}

.v-expansion-panel-title {
  display: none; /* 제목 숨기기 (문구와 화살표 제거) */
}

/* 아코디언 패널 텍스트 스타일 */
.v-expansion-panel-text {
  padding: 0; /* 기본 패딩 제거 */
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
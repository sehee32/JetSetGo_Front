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
        <!-- 비밀번호 변경 -->
        <div class="costom-box">
          <h3>비밀번호</h3>
          <p>회원님의 소중한 개인정보 보호를 위해 비밀번호를 주기적으로 변경해 주세요.</p>
          <v-btn :ripple="false" variant="outlined" router to="/myPageWithdrawal" class="costom-box-btn">변경</v-btn>
        </div>
        <!-- 기본정보 변경 -->
        <div class="costom-box">
          <h3>기본정보</h3>
          <p>성명, 연락처 정보를 변경할 수 있습니다.</p>
          <v-btn :ripple="false" variant="outlined" router to="/myPageWithdrawal" class="costom-box-btn">변경</v-btn>
        </div>
        <!-- 예약내역 -->
        <div class="costom-box">
          <h3>예약내역</h3>
          <p>예약내역을 확인 할 수 있습니다.</p>
          <v-btn :ripple="false" variant="outlined" router to="/myPageWithdrawal" class="costom-box-btn">확인</v-btn>
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
            sampleData: ''
         };
    },
    methods: {}
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
}

.myPage .costom-box .costom-box-btn:hover{
  border: 2px solid #0064de; ;
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
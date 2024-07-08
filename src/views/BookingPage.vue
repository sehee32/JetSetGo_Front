<template>
  <v-container>
    <v-card class="custom-card pa-6 mt-6">
      <h2 class="text-center mb-6">항공권 예매하기</h2>
      <v-form v-model="formValid" @submit.prevent="bookTicket">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="departure"
                :rules="[rules.required]"
                label="출발지"
                variant="outlined"
                prepend-inner-icon="mdi-airplane-takeoff"
                clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="destination"
                :rules="[rules.required]"
                label="도착지"
                variant="outlined"
                prepend-inner-icon="mdi-airplane-landing"
                clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-date-input
                v-model="departureDate"
                :rules="[rules.required]"
                label="출발 날짜"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar-outline"
                variant="outlined"
            ></v-date-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-input
                v-model="returnDate"
                :rules="[rules.required]"
                label="도착 날짜"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar-outline"
                variant="outlined"
            ></v-date-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-select
                v-model="adults"
                :items="passengerOptions"
                label="성인"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                :rules="[rules.required]"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="children"
                :items="passengerOptions"
                label="아동"
                variant="outlined"
                prepend-inner-icon="mdi-account-child-outline"
            ></v-select>
          </v-col>
        </v-row>

        <v-btn
            class="mt-4 custom-btn"
            :disabled="!formValid"
            @click="bookTicket"
        >
          예매하기
        </v-btn>
      </v-form>
    </v-card>
  </v-container>

  <!-- 하단 부분 -->
  <div class="bookingLower">
    <v-container class="padding0">
      <v-slide-group v-model="currentIndex" class="marginTop50" show-arrows>
        <v-slide-item v-for="(slideItems, index) in slideItems" :key="index">
            <v-card
                :class="['ma-4', 'custom-card']"
                height="280"
                width="360"
                @click="goToPage(slideItems.route)"
            >
              <div class="image-container">
                <v-img
                    :src="slideItems.image"
                    class="custom-img"
                    @mouseover="handleMouseOver"
                    @mouseleave="handleMouseLeave"
                    aspect-ratio="1.77">
                </v-img>
              </div>
              <v-card-title class="custom-card-title">{{ slideItems.title }}</v-card-title>
            </v-card>
        </v-slide-item>
      </v-slide-group>
      <!-- 리스트 컴포넌트 -->
      <v-toolbar color="white" dark class="marginTop50">
        <v-toolbar-title class="custom-toolbar-title">알려드립니다.</v-toolbar-title>
        <v-btn :ripple="false" text router to="/support" class="btn-underline">목록보기</v-btn>
      </v-toolbar>
      <v-row>
        <v-col cols="7">
          <v-list lines="two">
            <v-list-item v-for="listItems in listItems" :key="listItems.id" class="custom-list-item" :class="{ 'custom-list-last-item': index === listItems.length - 1 }">
              <v-list-item-content  class="d-flex justify-space-between" @click="goToPage(listItems.route)">
                <v-list-item-title class="v-list-title">{{ listItems.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ listItems.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="3">
          <!-- 사진 컴포넌트 -->
          <v-img src="@/assets/mainimage1.jpg" aspect-ratio="1.5"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="colorblue">
    <div class="bookingLower">
      <v-toolbar color="#D0E7F6" dark class="marginTop50">
        <v-toolbar-title class="custom-toolbar-title">여행의 완성을 위한 경험</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex">
        <v-card
            class="mx-auto"
            max-width="344"
            subtitle="Same looks, no anchor"
            title="Hover and click me"
            link
        >
          <v-tooltip
              activator="parent"
              location="bottom"
              @click="goToPage('/support')"
          >Tooltip</v-tooltip>
        </v-card>
      </div>

    </div>
  </div>

</template>

<script>
// import router from "@/router";

export default {
  data() {
    return {
      departure: '', // 출발지
      destination: '', // 도착지
      departureDate: null, // 출발 날짜
      returnDate: null, // 도착 날짜
      adults: null, // 성인 수
      children: null, // 아동 수
      formValid: false,
      passengerOptions: Array.from({ length: 10 }, (v, i) => i + 1), // 승객 수 (1~10)
      rules: {
        required: value => !!value || '이 항목을 입력하지 않았습니다.' // 필수 입력 규칙
      },
      currentIndex: 0, // 현재 슬라이드의 인덱스
      // 하단 부분
      slideItems: [
        { image: require('@/assets/mainimage1.jpg'), title: '새로워진 홈페이지 콘텐츠를 소개합니다.', route: '/support' },
        { image: require('@/assets/mainimage2.jpg'), title: '더욱 강력하게 돌아온 카드! 혜택 알아보기', route: '/support' },
        { image: require('@/assets/mainimage3.jpg'), title: '기프트카드로 여행을 선물하세요', route: '/support' },
        { image: require('@/assets/mainimage4.jpg'), title: '동영상으로 알아보는 서비스 가이드', route: '/support' },
        { image: require('@/assets/mainimage5.jpg'), title: '안전한 여행을 위한 필수품, 여행보험\n 간편하게 가입하세요', route: '/support' },
        { image: require('@/assets/mainimage6.jpg'), title: '신규 취항 및 운항 재개 노선 스케줄을\n 확인하세요', route: '/support' },
      ], // 슬라이더 아이템
      listItems: [
        { id: 1, title: '국내선 유류할증료 (2024년 8월)', subtitle: '2024.07.03', route: '/support'},
        { id: 2, title: '카드 Edition2 출시 안내 (2024년 7월 3일부)', subtitle: '2024.07.03', route: '/support' },
        { id: 3, title: '국제선 브랜드 운임 개편 계획 안내', subtitle: '2024.06.28', route: '/support' },
        { id: 4, title: '스카이패스 마일리지 적립 제휴 종료', subtitle: '2024.06.25', route: '/support' },
      ] //리스트 아이템
    };
  },
  methods: {
    // 예매 정보 처리 메서드
    bookTicket() {

      console.log('예매 정보:', {
        departure: this.departure,
        destination: this.destination,
        departureDate: this.departureDate,
        returnDate: this.returnDate,
        adults: this.adults,
        children: this.children
      });
      this.$router.push('ticketsearch');
    },
    // 하단 부분
    goToPage(route) {
      this.$router.push(route); // 라우터 변경
    },
  }
};
</script>

<style scoped>

.custom-card {
  max-width: 1000px;
  margin: auto;
  background-color: #ffffff;
  color: #00256c;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-btn {
  background-color: #00256c; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
}

.custom-btn:hover {
  background-color: #001a4d; /* 호버 시 버튼 배경색 */
}

.text-center {
  color: #00256c;
}

/* 하단 효과 */
.bookingLower {
  max-width: 1280px;
  margin: 0 auto;
}

.bookingLower .padding0{
  padding: 0;
}

.bookingLower .marginTop50 {
  margin-top: 50px;
}

/* 하단 슬라이더 */
.bookingLower .v-card:hover {
  cursor: pointer;
}

.bookingLower .image-container {
  width: 100%; /* 이미지 컨테이너 고정 너비 */
  height: 203px; /* 이미지 컨테이너 고정 높이 */
  overflow: hidden; /* 이미지가 넘치는 경우를 대비하여 오버플로우 처리 */
}

.bookingLower .custom-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 연한 그림자 색상 */
}

.bookingLower .custom-card:hover .custom-img {
  transform: scale(1.2);
}

.bookingLower .custom-img {
  transition: transform 0.3s ease; /* 변환 효과를 부드럽게 만듦 */
}

.bookingLower .custom-card-title{
  color: #000;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  white-space: pre-line;
}

.bookingLower .custom-card-title:hover{
  text-decoration: underline; /* 마우스 오버 시 밑줄 추가 */
}

/* 하단 리스트, 아이콘 동일 */
.bookingLower .custom-toolbar-title {
  text-align: left;
  font-weight: 700;
  font-size: 25px;
  line-height: 1;
}

/* 하단 리스트 */
.bookingLower .btn-underline:hover {
  text-decoration: underline; /* 마우스 오버 시 밑줄 효과 */
}

.bookingLower .custom-list-item {
  border-top: 1px solid #ccc;
}

.bookingLower .custom-list-item:last-child  {
  border-bottom: 1px solid #ccc;
}

.bookingLower .custom-list-item:hover {
  cursor: pointer;
  text-decoration: underline;
}

.bookingLower .v-list-title{
  font-size: 15px;
  font-weight: bold;
}

/* 하단 아이콘 */
.colorblue{
  background-color: #D0E7F6;
}




</style>

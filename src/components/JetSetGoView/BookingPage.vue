<template>
  <v-container>
    <v-card class="custom-card pa-6 mt-6">
      <h2 class="text-center mb-6">항공권 예매하기</h2>
      <v-form v-model="formValid" @submit.prevent="bookTicket">
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
                v-model="departure"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                :rules="[rules.required]"
                label="출발지"
                variant="outlined"
                prepend-inner-icon="mdi-airplane-takeoff"
                clearable
                @keyup="searchAirports($event.target.value, 'departure')"
                no-data-text="일치하는 도시가 없습니다."
                item-value="value"
                item-text="label"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
                v-model="destination"
                :items="cities"
                :rules="[rules.required]"
                label="도착지"
                variant="outlined"
                prepend-inner-icon="mdi-airplane-landing"
                clearable
                @change="searchAirports('destination')"
            no-data-text="일치하는 도시가 없습니다."
            item-value="value"
            item-text="label"
            ></v-autocomplete>
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
  <v-app>
    <div class="bookingLower">
      <v-container class="padding0">
        <!-- 슬라이더 컴포넌트 -->
        <v-slide-group v-model="currentIndex" class="marginTop60" show-arrows>
          <div v-for="(slideItems, index) in slideItems" :key="index">
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
                    aspect-ratio="1.77">
                </v-img>
              </div>
              <v-card-title class="custom-card-title">{{ slideItems.title }}</v-card-title>
            </v-card>
          </div>
        </v-slide-group>
        <!-- 리스트 컴포넌트 -->
        <v-toolbar color="white" dark class="marginTop60">
          <v-toolbar-title class="custom-toolbar-title">알려드립니다</v-toolbar-title>
          <v-btn :ripple="false" variant="text" router to="/support" class="btn-underline">목록보기</v-btn>
        </v-toolbar>
        <v-row>
          <v-col cols="7">
            <v-list>
              <v-list-item v-for="listItems in listItems" :key="listItems.id" class="custom-list-item">
                <div class="d-flex justify-space-between" @click="goToPage(listItems.route)">
                  <v-list-item-title class="v-list-title">{{ listItems.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ listItems.subtitle }}</v-list-item-subtitle>
                </div>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="5">
            <v-img :src="require('@/assets/listImage.png')" aspect-ratio="1.5" class="costom-list-image" @click="goToPage('/support')" :rounded="4"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- 카드nav 컴포넌트 -->
    <div class="colorBlue marginTop60">
      <div class="bookingLower">
        <v-toolbar color="#D0E7F6" dark >
          <v-toolbar-title class="custom-toolbar-title">여행의 완성을 위한 경험</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col
                v-for="(card, index) in cards"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="1"
                class="card-column"
                @mouseover="showNav(index)"
                @mouseleave="hideNav"
            >
              <div class="card-container">
                <v-card variant="flat" class="custom-flat-card">
                  <v-card-title class="card-title">{{ card.title }}</v-card-title>
                  <v-img
                      :src="card.image"
                      aspect-ratio="16/9"
                      max-width="100%"
                      max-height="50px"
                      style="object-fit: cover;"
                  ></v-img>
                </v-card>
                <!-- 카드 아래에 네비게이션 항목을 표시 -->
                <v-list
                    v-if="hoveredCardIndex === index"
                    dense
                    nav
                    flat
                    class="custom-nav-list"
                >
                  <v-list-item
                      v-for="(navItem, navIndex) in card.navItems"
                      :key="navIndex"
                      @click="navigate(navItem.route)"
                      class="custom-nav-list-item"
                  >
                    <v-list-item-title class="custom-nav-item-title">{{ navItem.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  type: {
    default: "index"
  },
  data() {
    return {
      departure: '', // 출발지
      destination: '', // 도착지
      departureDate: null, // 출발 날짜
      returnDate: null, // 도착 날짜
      adults: null, // 성인 수
      children: null, // 아동 수
      formValid: false,
      cities: [], // api로 가져올 도시 목록
      passengerOptions: Array.from({length: 10}, (v, i) => i + 1), // 승객 수 (1~10)
      rules: {
        required: value => !!value || '이 항목을 입력하지 않았습니다.' // 필수 입력 규칙
      },
      currentIndex: 0, // 현재 슬라이드의 인덱스
      // 하단 부분
      slideItems: [
        {image: require('@/assets/mainimage1.jpg'), title: '새로워진 홈페이지 콘텐츠를 소개합니다.', route: '/support'},
        {image: require('@/assets/mainimage2.jpg'), title: '더욱 강력하게 돌아온 카드! 혜택 알아보기', route: '/support'},
        {image: require('@/assets/mainimage3.jpg'), title: '기프트카드로 여행을 선물하세요', route: '/support'},
        {image: require('@/assets/mainimage4.jpg'), title: '동영상으로 알아보는 서비스 가이드', route: '/support'},
        {image: require('@/assets/mainimage5.jpg'), title: '안전한 여행을 위한 필수품, 여행보험\n 간편하게 가입하세요', route: '/support'},
        {image: require('@/assets/mainimage6.jpg'), title: '신규 취항 및 운항 재개 노선 스케줄을\n 확인하세요', route: '/support'},
      ], // 슬라이더 아이템
      listItems: [
        {id: 1, title: '국내선 유류할증료 (2024년 8월)', subtitle: '2024.07.03', route: '/support'},
        {id: 2, title: '카드 Edition2 출시 안내 (2024년 7월 3일부)', subtitle: '2024.07.03', route: '/support'},
        {id: 3, title: '국제선 브랜드 운임 개편 계획 안내', subtitle: '2024.06.28', route: '/support'},
        {id: 4, title: '스카이패스 마일리지 적립 제휴 종료', subtitle: '2024.06.25', route: '/support'},
      ], //리스트 아이템
      cards: [
        {
          title: '항공카드', image: require('@/assets/main_icon1.png'),
          navItems: [
            {text: '항공카드', route: '/support'}
          ]
        },
        {
          title: '기프트카드', image: require('@/assets/main_icon2.png'),
          navItems: [
            {text: '기프트카드', route: '/support'}
          ]
        },
        {
          title: '호텔', image: require('@/assets/main_icon3.png'),
          navItems: [
            {text: '아고다', route: '/support'},
            {text: 'Hotels.com', route: '/support'}
          ]
        },
        {
          title: '렌터카', image: require('@/assets/main_icon4.png'),
          navItems: [
            {text: 'Hertz', route: '/support'},
            {text: 'SK렌터카', route: '/support'},
            {text: '롯데렌터카', route: '/support'},
            {text: 'Rentalcars.com', route: '/support'}
          ]
        },
        {
          title: '기내 면세점', image: require('@/assets/main_icon5.png'),
          navItems: [
            {text: 'SKYSHOP', route: '/support'}
          ]
        },
        {
          title: '여행자 보험', image: require('@/assets/main_icon6.png'),
          navItems: [
            {text: 'Chubb 여행보험', route: '/support'}
          ]
        },
        {
          title: '여행 상품', image: require('@/assets/main_icon7.png'),
          navItems: [
            {text: '한진관광', route: '/support'},
            {text: 'KALPAK', route: '/support'}
          ]
        }
      ],
      hoveredCardIndex: null,
    };
  },

  created() {
     console.log("beforeCreate");
    const query = this.departure;
    if (!query || query.length < 2) { // 최소 2자 이상 입력된 경우에만 검색
      this.cities = [];
    }

    try {
      const response = axios.get('/api/flights/airports', {
        params: { keyword: 'MUC' }, // 추출된 값 전달
      });
      console.log('api 요청 성공 : ', response.data); // 응답 데이터 확인
      this.cities = response.data.map(item => ({
        label: `${item.name} (${item.iataCode})`,
        value: item.iataCode,
      }));
    } catch (error) {
      console.error('api 요청 실패 : ',error);
    }
  },

  methods: {
    // 아마데우스 api이용해서 공항검색
      async searchAirports(e, type) {
        console.error('입력값 : ',e, type);
        // const query = type === 'departure' ? this.departure : this.destination;
        //
        // if (!query || query.length < 2) { // 최소 2자 이상 입력된 경우에만 검색
        //   this.cities = [];
        //   return;
        // }
        //
        // try {
        //   const response = await axios.get('/api/flights/airports', {
        //     params: { keyword: 'MUC' }, // 추출된 값 전달
        //   });
        //   this.cities = response.data.map(item => ({
        //     label: `${item.name} (${item.iataCode})`,
        //     value: item.iataCode,
        //   }));
        // } catch (error) {
        //   console.error('api 요청 실패 : ',error);
        // }
      },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'};
      return new Date(date).toLocaleDateString('ko-KR', options);
    },
    // 예매 정보 처리 메서드
    bookTicket() {

      if (!this.departure || !this.destination) {
        console.log("출발지 또는 도착지가 비어 있습니다.");
        return;
      }

      const formattedDepartureDate = this.formatDate(this.departureDate);
      const formattedReturnDate = this.formatDate(this.returnDate);

      this.$router.push({
        name: 'TicketSearch',
        query: {
          departure: this.departure,
          destination: this.destination,
          departureDate: formattedDepartureDate,
          returnDate: formattedReturnDate,
          adults: this.adults,
          children: this.children
        }
      });
    },
    // 하단 부분
    goToPage(route) {
      this.$router.push(route); // 라우터 변경
    },
    showNav(index) {
      this.hoveredCardIndex = index;
    },
    hideNav() {
      this.hoveredCardIndex = null;
    },
    navigate(route) {
      this.$router.push(route);
    }
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

.marginTop60 {
  margin-top: 60px;
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

.bookingLower .costom-list-image{
  margin-left: 45px;
  width: 90%;
  height: 88%;
  max-width: 600px;
  border-radius: 20px;
}

.bookingLower .costom-list-image:hover{
  border: 1px solid #7599EE;
  cursor: pointer;
}

/* 하단 아이콘 */
.colorBlue{
  background-color: #D0E7F6;
  padding: 60px 0 30px 0;
}

.bookingLower .card-container {
  position: relative; /* 부모 요소를 상대적으로 배치하여 자식 요소의 절대 위치를 설정할 수 있게 함 */
}

.bookingLower .card-column {
  flex: 1 0 calc(100% / 7); /* 각 카드의 너비를 7분의 1로 설정 */
  max-width: calc(100% / 7); /* 최대 너비를 7분의 1로 설정 */
  transition: padding-bottom 0.3s ease; /* 패딩 변화에 애니메이션 추가 */
}

.bookingLower .card-column:hover {
  text-decoration: underline; /* 마우스 오버 시 밑줄 추가 */
  padding-bottom: 40px;
}

.bookingLower .card-title{
  font-size: 15px;
  font-weight: bold;
}

.bookingLower .custom-flat-card {
  padding-top: 20px; /* 카드 상단 패딩 추가 */
  padding-bottom: 20px; /* 카드 하단 패딩 추가 */
  background-color: #E8F3FB;
  border-radius: 10px; /* 라운드 처리를 더 크게 설정 */
}

.bookingLower .custom-flat-card:hover {
  background-color: #f9f9f9; /* 마우스 오버 시 배경색 변경 */
}

.bookingLower .custom-nav-list{
  position: absolute;
  width: auto;
  margin-top: 10px;
  border-radius: 10px;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
}

.bookingLower .custom-nav-list-item {
  display: inline-block; /* 인라인 블록으로 설정하여 텍스트 너비에 맞춤 */
  min-height: 15px;
  padding-bottom: 0;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
}


.bookingLower .custom-nav-item-title {
  font-size: 13px; /* 글자 크기 설정 */
  padding: 3px; /* 항목의 패딩 설정 */
  text-decoration: none !important; /* 텍스트 밑줄 제거 */
}

</style>

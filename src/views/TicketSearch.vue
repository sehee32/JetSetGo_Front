<template>
  <v-container class="costom-container">
    <br>
    <!-- 출발지, 도착지, 날짜, 인원 정보 표시 -->
    <v-row>
      <v-col cols="12">
        <div class="route-info">
          <h2 class="route-title">
            {{ departureMutable }} <span class="arrow">→</span> {{ destinationMutable }}
          </h2>
          <h3 class="route-details">
            <p class="date">{{ departureDate }} - {{ returnDate }}</p>
            <p class="passengers">성인 {{ adults }}명, 아동 {{ children }}명</p>
          </h3>
        </div>
      </v-col>
    </v-row>

    <!-- 항공편 리스트 표시 -->
    <div v-for="flight in paginatedFlights" :key="flight.id"
         class="costom-box"
         :class="{'selected-flight': isSelectedFlight(flight.id)}"
         @click="selectFlight(flight.id)">
      <div class="list">
        <!-- 항공편 시간 및 소요시간 정보 표시 -->
        <div class="airport">
          <span><strong>{{departureMutable}}</strong></span>
          <span><strong>{{destinationMutable}}</strong></span>
        </div>

        <div class="time">
          <div class="flight-time">
            <span>{{ flight.departureTime }} ~ {{ flight.arrivalTime }}</span>
          </div>
          <div class="flight-duration">{{ flight.duration }}</div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 가격 정보 표시 -->
      <div class="price">
        <strong>{{ formatPrice(flight.price) }} {{ flight.currency }}</strong>
      </div>
    </div>

    <!-- 페이지 네비게이션 -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
            v-for="pageNumber in Math.ceil(currentFlights.length / flightsPerPage)"
            :key="pageNumber"
            :class="['pagination-btn', {'active': currentPage === pageNumber}]"
            @click="changePage(pageNumber)"
            class="mx-2"
        >
          {{ pageNumber }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- 결제하기 버튼 -->
    <v-row v-if="selectedFlightId !== null && !returnDate">
      <v-col cols="12" class="text-center">
        <v-btn @click="Payment" class="custom-btn mt-4">결제하기</v-btn>
      </v-col>
    </v-row>

    <!-- 다음여정 버튼 -->
    <v-row v-if="journeyStage === 'outgoing' && selectedFlightId !== null && returnDate">
      <v-col cols="12" class="btn">
        <v-btn @click="NextJourney" class="custom-btn mt-4">다음여정</v-btn>
      </v-col>
    </v-row>

    <!-- 돌아오는 항공편 선택 후 결제하기 버튼 -->
    <v-row v-if="journeyStage === 'return' && selectedFlightId !== null && returnFlightId !== null">
      <v-col cols="12" class="text-center">
        <v-btn @click="Payment" class="custom-btn mt-4">결제하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    departure: String,
    destination: String,
    departureDate: String,
    returnDate: String,
    adults: Number,
    children: Number,
    travelClass: String,
    nonStop: Boolean
  },
  data() {
    return {
      currentFlights: [], // 현재 화면에 표시되는 항공편 리스트
      selectedFlightId: null, // 선택된 출발 항공편 ID
      returnFlightId: null, // 선택된 돌아오는 항공편 ID
      journeyStage: 'outgoing', // 현재 여정 단계 ('outgoing' 또는 'return')
      departureMutable: this.departure, // 수정 가능한 출발지
      destinationMutable: this.destination, // 수정 가능한 도착지
      departureDateMutable: this.departureDate, // 수정 가능한 출발 날짜
      flightsPerPage: 5, // 페이지당 항공편 수
      currentPage: 1, // 현재 페이지 번호
    };
  },
  computed: {
    paginatedFlights() {
      const start = (this.currentPage - 1) * this.flightsPerPage;
      const end = start + this.flightsPerPage;
      return this.currentFlights.slice(start, end);
    }
  },
  created() {
    this.searchFlights();
  },
  methods: {
    async searchFlights() {
      try {
        const response = await axios.get('/api/flights/search', {
          params: {
            origin: this.departureMutable,
            destination: this.destinationMutable,
            departureDate: this.departureDateMutable,
            adults: this.adults,
            children: this.children,
            travelClass: this.travelClass,
            nonStop: this.nonStop ? 'true' : 'false'
          }
        });
        const flightOffers = response.data;
        const resultArray = [];
        if (flightOffers.length === 0) {
          console.log('검색된 항공편이 없습니다.');
        } else {
          for (const offer of flightOffers) {
            const flightData = {
              id: offer.id,
              departureTime: this.formatDateTime(offer.departureTime),
              arrivalTime: this.formatDateTime(offer.arrivalTime),
              duration: this.formatDuration(offer.duration),
              price: offer.price,
              currency: offer.currency
            };
            resultArray.push(flightData);
          }
        }
        this.currentFlights = resultArray;
      } catch (error) {
        console.error('항공편 검색 오류:', error);
      }
    },

    formatDuration(duration) {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
      const matches = duration.match(regex);
      const hours = matches[1] ? matches[1] : '0';
      const minutes = matches[2] ? matches[2] : '0';

      return `${hours}시간 ${minutes}분`;
    },

    formatPrice(price) {
      return Number(price).toLocaleString();
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    isSelectedFlight(flightId) {
      if (this.journeyStage === 'outgoing') {
        return this.selectedFlightId === flightId;
      } else if (this.journeyStage === 'return') {
        return this.returnFlightId === flightId;
      }
      return false;
    },

    selectFlight(flightId) {
      if (this.journeyStage === 'outgoing') {
        this.selectedFlightId = flightId; // 출발 항공편 선택
      } else if (this.journeyStage === 'return') {
        this.returnFlightId = flightId; // 돌아오는 항공편 선택
      }
    },

    NextJourney() {
      if (this.journeyStage === 'outgoing' && this.selectedFlightId !== null) {
        const tempDeparture = this.departureMutable;
        this.departureMutable = this.destinationMutable;
        this.destinationMutable = tempDeparture;
        this.departureDateMutable = this.returnDate;
        this.journeyStage = 'return';
        this.searchFlights(); // 돌아오는 항공편 검색
      }
    },

    Payment() {
      if (this.selectedFlightId !== null && (this.returnFlightId !== null || !this.returnDate)) {
        try {
          // // 사용자 정보 가져오기
          // const userResponse = await axios.get('/api/user/info');
          // this.userInfo = userResponse.data;

          // 선택된 항공편 가격 계산
          const selectedFlight = this.currentFlights.find(flight => flight.id === this.selectedFlightId);
          this.totalPrice = selectedFlight.price;

          if (this.returnFlightId) {
            const returnFlight = this.currentFlights.find(flight => flight.id === this.returnFlightId);
            this.totalPrice += returnFlight.price;
          }

          console.log('결제 정보:', {
            user: this.userInfo,
            totalAmount: this.totalPrice
          });

          // 여기서 실제 결제 API 호출 등을 처리하면 됩니다.
        } catch (error) {
          console.error('결제 오류:', error);
        }
      } else {
        console.error('결제 정보를 확인해 주세요.');
      }
    },


    changePage(pageNumber) {
      this.currentPage = pageNumber;
    }
  }
};

</script>

<style scoped>

.costom-container {
  max-width: 1200px; /* 원하는 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  overflow: hidden; /* 넘칠 경우 숨김 처리 */
}

.route-info {
  text-align: center;
  margin-bottom: 20px;
  background-color: #ffffff; /* 배경색 */
  padding: 20px; /* 내부 여백 */

}

.route-title {
  font-size: 30px; /* 제목 크기 */
  font-weight: bold; /* 두껍게 */
  color: #00256c; /* 텍스트 색상 */
  transition: color 0.3s;
}

.route-title:hover {
  color: #0056b3; /* 마우스 오버 시 색상 변화 */
}

.arrow {
  font-size: 40px; /* 화살표 크기 */
  color: #00256c; /* 화살표 색상 */
  margin: 0 10px; /* 좌우 여백 */
}

.route-details {
  font-size: 16px; /* 세부사항 크기 */
  color: #666; /* 세부사항 색상 */
  margin-top: 10px; /* 위쪽 여백 */
}

.date {
  margin: 5px 0; /* 위아래 여백 */
}

.passengers {
  font-weight: normal; /* 일반 두께 */
}

.selected-flight {
  border: 2px solid #00256c; /* 선택된 항공편의 테두리 변경 */
}

.flight-time {
  font-weight: bold;
  font-size: 18px;
}

.flight-duration {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.price {
  text-align: right;
  font-size: 16px;
  font-weight: bold;
}

.custom-btn {
  background-color: #00256c;
  color: white;
  transition: background-color 0.3s, transform 0.3s; /* 전환 효과 */
}

.custom-btn:hover {
  background-color: #001a4d;
  transform: translateY(-2px);
}

.text-center {
  color: #00256c;
}

.costom-box {
  text-align: left;
  padding: 25px 40px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: transform 0.3s; /* 애니메이션 효과 */
}

.costom-box:hover {
  transform: scale(1.02); /* 마우스 오버 시 살짝 확대 */
}

.costom-box::before {
  content: ""; /* 빈 콘텐츠 추가 */
  position: absolute; /* 절대 위치 지정 */
  top: 0; /* 상단에 위치 */
  left: 0; /* 왼쪽에 위치 */
  width: 100%; /* 전체 너비 */
  height: 4px; /* 원하는 높이 */
  background-color: #00256c; /* 라인 색상 */
  border-radius: 10px 10px 0 0; /* 모서리 둥글게 */
}

.costom-box .list,
.costom-box .line {
  display: inline-block;
}

.costom-box .line {
  width: 1px;
  height: 50px;
  background-color: #eee;
}

.costom-box .list {
  width: 71%;
  margin-top: -40px;
}

.costom-box .list .airport {
  display: inline-block;
  width: 40%;
  background: url('@/assets/flight.png') no-repeat 118px center;
  background-size: 20px 20px;
}

.costom-box .list .airport span {
  display: inline-block;
  margin-right: 40px;
  text-align: center;
  width: 110px;
}

.costom-box .list .airport span strong {
  display: block;
  font-size: 40px;
}

.costom-box .list .time {
  display: inline-block;
  margin-top: 50px;
  margin-left: 100px;
}

/* 페이지 네비게이션 버튼 스타일 */
.pagination-btn {
  background-color: #f0f0f0;
  color: #00256c;
  height: 30px;
  font-size: 16px;
  margin: 0 5px; /* 버튼 간격 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease; /* 마우스 오버 시 색상 전환 */
}

/* 마우스 오버 시 스타일 */
.pagination-btn:hover {
  background-color: #e0e0e0; /* 호버 시 배경색 변경 */
  cursor: pointer; /* 마우스 포인터 변경 */
}

 /*선택된 페이지 버튼 스타일 */
.pagination-btn.active {
  background-color: #00256c; /* 선택된 버튼 배경색 */
  color: white; /* 선택된 버튼 텍스트 색상 */
}

</style>

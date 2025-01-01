<!--TicketSearch.vue-->

<template>
  <v-container class="costom-container">
    <!-- 로딩 오버레이 -->
    <v-overlay :value="isLoading" absolute>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <br>
    <!-- 출발지, 도착지, 날짜, 인원 정보 표시 -->
    <v-row>
      <v-col cols="12">
        <div class="route-info">
          <div class="journey-stage">
            <span v-if="journeyStage === 'outgoing'">가는편</span>
            <span v-if="journeyStage === 'return'">오는편</span>
          </div>
          <h2 class="route-title">
            {{ departureMutable }} <span class="arrow">→</span> {{ destinationMutable }}
          </h2>
          <h3 class="route-details">
            <p class="date"> {{ journeyStage === 'outgoing' ? departureDateMutable : returnDateMutable }}</p>
            <p class="passengers">성인 {{ adultsMutable }}명, 아동 {{ childrenMutable }}명</p>
          </h3>

          <!-- 일정 변경 버튼 -->
          <v-btn color="#00256c" class="mt-4" @click="toggleSchedulePanel">
            일정 변경
          </v-btn>

          <v-expand-transition>
            <div v-show="showSchedulePanel">
              <ScheduleChangePanel
                  @update-schedule="handleScheduleUpdate"
                  :initialDeparture="departureMutable"
                  :initialDestination="destinationMutable"
                  :initialDepartureDate="departureDateMutable"
                  :initialReturnDate="returnDateMutable"
                  :initialAdults="adults"
                  :initialChildren="children"
                  :initialTravelClass="travelClass"
                  :initialNonStop="nonStop"
              />
            </div>
          </v-expand-transition>
        </div>
      </v-col>
    </v-row>


    <!-- 정렬 옵션 -->
    <div class="sort-container">
      <v-select
          v-model="sortOption"
          :items="sortOptions"
          label="정렬 기준"
          dense
          outlined
      ></v-select>
    </div>

    <!-- 로딩 바 -->
    <v-row v-if="isLoading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
        <p>항공편을 검색 중입니다...</p>
      </v-col>
    </v-row>

    <!-- 항공편 리스트 표시 -->
    <div v-if="!isLoading && currentFlights.length > 0">
      <div v-for="flight in paginatedFlights" :key="flight.id">
        <div class="flight-container">
          <div class="costom-box" :class="{'selected-flight': isSelectedFlight(flight.id)}" @click="selectFlight(flight.id)">
            <div class="list">
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
            <div class="price">
              <strong>{{ formatPrice(flight.price) }} {{ flight.currency }}</strong>
            </div>
          </div>
          <!-- 선택된 항공편의 버튼을 바로 아래에 표시 -->
          <div v-if="isSelectedFlight(flight.id)" class="button-container">
            <v-btn v-if="journeyStage === 'outgoing' && returnDate" @click="NextJourney" class="custom-btn">다음여정</v-btn>
            <v-btn v-if="journeyStage === 'return' || !returnDate" @click="Payment" class="custom-btn">결제하기</v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- 항공편이 없을 때 메시지 -->
    <div v-else-if="!isLoading && currentFlights.length === 0" class="no-flights">
      <p>검색된 항공편이 없습니다. <br><br> 검색 조건을 변경해보세요.</p>
    </div>

    <!-- 페이지 네비게이션 -->
    <v-row v-if="!isLoading">
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
  </v-container>
</template>

<script>
import axios from "axios";
import ScheduleChangePanel from "@/components/JetSetGoView/ScheduleChangePanel";

export default {
  components: {
    ScheduleChangePanel
  },
  props: {
    departure: String,
    destination: String,
    departureDate: String,
    returnDate: {
      type: String,
      required: true,
    },
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
      returnDateMutable: this.returnDate,
      returnDepartureDateMutable: this.returnDate,

      adultsMutable: this.adults,
      childrenMutable: this.children,
      travelClassMutable: this.travelClass,
      nonStopMutable: this.nonStop,
      flightsPerPage: 5, // 페이지당 항공편 수
      currentPage: 1, // 현재 페이지 번호
      isLoading: false, // 로딩 상태
      sortOption: '출발시간 빠른순', // 항공편 리스트 정렬
      sortOptions: [
        '출발시간 빠른순',
        '출발시간 늦은순',
        '최저가순'
      ],
      isScheduleChangeOpen: false,
      showSchedulePanel: false,
      totalPrice : 0
    };
  },

  watch: {
    // 정렬옵션이 변경될 때마다 재정렬
    sortOption() {
      this.sortFlights();
    },
    localReturnDate(newVal) {
      this.$emit("update:returnDate", newVal); // 로컬 returnDate가 변경될 때 부모로 변경 사항 전달
    },
    returnDate(newVal) {
      this.localReturnDate = newVal; // 부모 컴포넌트에서 returnDate가 변경될 때 변경 사항 감지
    },
  },

  computed: {
    paginatedFlights() {
      const start = (this.currentPage - 1) * this.flightsPerPage;
      const end = start + this.flightsPerPage;
      return this.currentFlights.slice(start, end); // 현재 페이지에 해당하는 항공편 목록 반환
    }
  },
  created() {
    this.searchFlights();
  },
  methods: {
    //항공권 검색
    async searchFlights() {
      this.isLoading = true;

      try {
        const response = await axios.get('/api/flights/search', {
          params: {
            origin: this.departureMutable,
            destination: this.destinationMutable,
            departureDate: this.journeyStage === 'outgoing' ? this.departureDateMutable : this.returnDateMutable,
            adults: this.adults,
            children: this.children,
            travelClass: this.travelClass,
            nonStop: this.nonStop ? 'true' : 'false'
          }
        });

        const flightOffers = response.data;
        if (flightOffers.length === 0) {
          console.log('검색된 항공편이 없습니다.');
        } else {
          this.currentFlights = flightOffers.map(offer => ({
            id: offer.id,
            departureTime: this.formatDateTime(offer.departureTime),
            arrivalTime: this.formatDateTime(offer.arrivalTime),
            duration: this.formatDuration(offer.duration),
            price: offer.price,
            currency: offer.currency
          }));
          this.sortFlights();
        }
      } catch (error) {
        console.error('항공편 검색 오류:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // 항공권 정렬
    sortFlights() {
      if (this.sortOption === '출발시간 빠른순') {
        this.currentFlights.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
      } else if (this.sortOption === '출발시간 늦은순') {
        this.currentFlights.sort((a, b) => new Date(b.departureTime) - new Date(a.departureTime));
      } else if (this.sortOption === '최저가순') {
        this.currentFlights.sort((a, b) => a.price - b.price);
      }
    },

    // 일정수정 패널
    toggleSchedulePanel() {
      this.showSchedulePanel = !this.showSchedulePanel;
    },
    handleScheduleUpdate(newSchedule) {
      this.departureMutable = newSchedule.departure;
      this.destinationMutable = newSchedule.destination;
      this.departureDateMutable = newSchedule.departureDate;
      this.returnDateMutable = newSchedule.returnDate;
      this.adultsMutable = newSchedule.adults;
      this.childrenMutable = newSchedule.children;
      this.travelClassMutable = newSchedule.travelClass;
      this.nonStopMutable = newSchedule.nonStop;

      // 일정 변경 후 항상 가는 여정으로 리셋
      this.journeyStage = 'outgoing';
      this.selectedFlightId = null;
      this.returnFlightId = null;

      this.showSchedulePanel = false;
      this.searchFlights(); // 항공권 재검색
    },

    // 소요시간 형식 변경
    formatDuration(duration) {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
      const matches = duration.match(regex);
      const hours = matches[1] ? matches[1] : '0';
      const minutes = matches[2] ? matches[2] : '0';
      return `${hours}시간 ${minutes}분`;
    },

    // 가격 형식 변경
    formatPrice(price) {
      return Number(price).toLocaleString();
    },

    // 시간 형식 변경
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    // 선택된 항공편인지 확인
    isSelectedFlight(flightId) {
      if (this.journeyStage === 'outgoing') {
        return this.selectedFlightId === flightId;
      } else if (this.journeyStage === 'return') {
        return this.returnFlightId === flightId;
      }
      return false;
    },

    // 항공편 선택
    selectFlight(flightId) {
      if (this.journeyStage === 'outgoing') {
        this.selectedFlightId = flightId; // 출발 항공편 선택
      } else if (this.journeyStage === 'return') {
        this.returnFlightId = flightId; // 돌아오는 항공편 선택
      }
    },

    // 다음 여정으로 넘어가기
    NextJourney() {
      if (this.journeyStage === 'outgoing' && this.selectedFlightId !== null) {
        // 출발지랑 목적지 스왑
        const tempDeparture = this.departureMutable;
        this.departureMutable = this.destinationMutable;
        this.destinationMutable = tempDeparture;


        // 여정 단계를 'return'으로 변경
        this.journeyStage = 'return';

        this.searchFlights(); // 돌아오는 항공편 검색
      }
    },

    Payment() {

      debugger;  // eslint-disable-line no-debugger
      // 선택한 항공권 정보 가져오기
      const outgoingFlight = {
        ...this.currentFlights.find(flight => flight.id === this.selectedFlightId),
        departure: this.departure,
        destination: this.destination,
        departureDate: this.departureDateMutable
      };

      let returnFlight = null;
      let totalPrice = parseFloat(outgoingFlight.price);

      if (this.returnDateMutable) {
        returnFlight = {
          ...this.currentFlights.find(flight => flight.id === this.returnFlightId),
          departure: this.destination,
          destination: this.departure,
          departureDate: this.returnDepartureDateMutable,
        };

        totalPrice += parseFloat(returnFlight.price);
      }

      // BookingDetail로 라우팅하며 데이터 전달
      this.$router.push({
        name: 'BookingDetail',
        query: {
          outgoingFlight: JSON.stringify(outgoingFlight),
          returnFlight: JSON.stringify(returnFlight || {}),
          adults: this.adultsMutable,
          children: this.childrenMutable,
          travelClass: this.travelClassMutable,
          departure: this.departure,
          destination: this.destination,
          totalPrice: totalPrice,
        }
      });
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
  font-weight: normal;
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
  margin: 0 10px;
  min-width: 150px;
}

.custom-btn:hover {
  background-color: #001a4d;
  transform: translateY(-2px);
}

.text-center {
  color: #00256c;
}

.flight-container {
  position: relative;
  margin-bottom: 60px;
}

.costom-box {
  text-align: left;
  padding: 25px 40px;
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
  width: 100%;
  height: 4px;
  background-color: #00256c; /* 라인 색상 */
  border-radius: 10px 10px 0 0;
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

.button-container {
  position: absolute;
  right: 0;
  margin-top: 10px;
  text-align: right;
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

.no-flights {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 20px;
}

.sort-container {
  width: 200px;
  margin-left: auto;
  margin-bottom: 20px;
}

.change-panel {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
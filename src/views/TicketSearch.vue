<template>
  <v-container>
<!--    <v-card class="custom-card pa-6 mt-6">-->
    <br>
      <h1 class="text-center mb-6">항공편 검색 결과</h1>

      <!-- 출발지, 도착지, 날짜, 인원 정보 표시 -->
      <v-row>
        <v-col cols="12">
          <div class="route-info">
            <h2><p>{{ departure }} - {{ destination }}</p></h2>
            <h3><p>{{ departureDate }} - {{ returnDate }}</p>
            <p>성인 {{ adults }}명, 아동 {{ children }}명</p></h3>
          </div>
        </v-col>
      </v-row>

      <!-- 탭 메뉴 표시 -->
      <v-tabs v-model="page" background-color="#00256c" centered grow>
        <v-tab v-for="(tab, index) in tabs" :key="index">
          {{ tab.date }}<br>{{ tab.price }}
        </v-tab>
      </v-tabs>
      <br>

      <!-- 항공편 리스트 표시 -->
      <v-row>
        <v-col cols="12" v-for="flight in currentFlights" :key="flight.id">
          <v-card class="flight-card pa-4 mb-4">
            <v-row>
              <!-- 항공편 시간 및 소요시간 정보 표시 -->
              <v-col cols="12" md="3">
                <div class="flight-time">
                  <span>{{ flight.departureTime }}</span>
                  <span> -> </span>
                  <span>{{ flight.arrivalTime }}</span>
                </div>
                <div class="flight-duration">소요시간: {{ flight.duration }}</div>
              </v-col>

              <!-- 가격 옵션 표시 -->
              <v-col cols="12" md="8">
                <v-row>
                  <v-col
                      cols="3"
                      class="price-option"
                      v-for="option in flight.priceOptions"
                      :key="option.type"
                      :class="{ selected: isSelected(flight.id, option.type) }"
                      @click="selectSeatOption(flight.id, option.type)"
                  >
                    <div>{{ option.type }}</div>
                    <div>{{ option.price }}</div>
                    <div>{{ option.availability }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- 다음여정 버튼 -->
      <v-row v-if="journeyStage === 'outgoing' && selectedFlightId !== null">
        <v-col cols="12" class="text-center">
          <v-btn @click="NextJourney" class="custom-btn mt-4">다음여정</v-btn>
        </v-col>
      </v-row>

      <!-- 결제하기 버튼 -->
      <v-row v-if="journeyStage === 'return' && selectedFlightId !== null && returnFlightId !== null">
        <v-col cols="12" class="text-center">
          <v-btn @click="Payment" class="custom-btn mt-4">결제하기</v-btn>
        </v-col>
      </v-row>
<!--    </v-card>-->
  </v-container>
</template>

<script>
export default {
  props: {
    departure: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    departureDate: {
      type: String,
      required: true
    },
    returnDate: {
      type: String,
      required: true
    },
    adults: {
      type: String,
      required: true
    },
    children: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentFlights: [], // 현재 화면에 표시되는 항공편 리스트
      outgoingFlights: [
        // 가는편 항공편 데이터
        {
          id: 1,
          departureTime: '08:30',
          arrivalTime: '11:00',
          duration: '2시간 30분',
          priceOptions: [
            { type: '일반석', price: '마감', availability: '' },
            { type: '프리미엄 일반석', price: '90,000원', availability: '9석' },
            { type: '비즈니스석', price: '마감', availability: '' }
          ]
        },
        {
          id: 2,
          departureTime: '10:35',
          arrivalTime: '12:55',
          duration: '2시간 20분',
          priceOptions: [
            { type: '일반석', price: '마감', availability: '' },
            { type: '프리미엄 일반석', price: '120,000원', availability: '1석' },
            { type: '비즈니스석', price: '180,000원', availability: '3석' }
          ]
        }
        // 더미 데이터 추가 가능
      ],
      returnFlights: [
        // 오는편 항공편 데이터
        {
          id: 3,
          departureTime: '13:00',
          arrivalTime: '15:30',
          duration: '2시간 30분',
          priceOptions: [
            { type: '일반석', price: '마감', availability: '' },
            { type: '프리미엄 일반석', price: '95,000원', availability: '5석' },
            { type: '비즈니스석', price: '마감', availability: '' }
          ]
        },
        {
          id: 4,
          departureTime: '15:45',
          arrivalTime: '18:05',
          duration: '2시간 20분',
          priceOptions: [
            { type: '일반석', price: '마감', availability: '' },
            { type: '프리미엄 일반석', price: '125,000원', availability: '3석' },
            { type: '비즈니스석', price: '185,000원', availability: '2석' }
          ]
        }
        // 더미 데이터 추가 가능
      ],
      page: 0, // 현재 선택된 탭 인덱스
      tabs: [
        { date: '07.24 (월)', price: '90,000원~' },
        { date: '07.25 (화)', price: '135,000원~' },
        { date: '07.26 (수)', price: '145,000원~' },
        { date: '07.27 (목)', price: '155,000원~' }
      ],
      selectedFlightId: null, // 선택된 가는편 항공편 ID
      selectedSeatType: null, // 선택된 가는편 좌석 유형
      returnFlightId: null, // 선택된 오는편 항공편 ID
      returnSeatType: null, // 선택된 오는편 좌석 유형
      journeyStage: 'outgoing' // 현재 여정 단계 ('outgoing' 또는 'return')
    };
  },
  created() {
    // 초기에 가는편 리스트로 설정
    this.currentFlights = this.outgoingFlights;
  },
  methods: {
    // 좌석 등급 선택 메소드
    selectSeatOption(flightId, seatType) {
      if (this.journeyStage === 'outgoing') {
        if (this.selectedFlightId === flightId && this.selectedSeatType === seatType) {
          this.selectedFlightId = null;
          this.selectedSeatType = null;
        } else {
          this.selectedFlightId = flightId;
          this.selectedSeatType = seatType;
        }
      } else if (this.journeyStage === 'return') {
        if (this.returnFlightId === flightId && this.returnSeatType === seatType) {
          this.returnFlightId = null;
          this.returnSeatType = null;
        } else {
          this.returnFlightId = flightId;
          this.returnSeatType = seatType;
        }
      }
    },
    // 선택된 옵션 확인 메소드
    isSelected(flightId, seatType) {
      if (this.journeyStage === 'outgoing') {
        return this.selectedFlightId === flightId && this.selectedSeatType === seatType;
      } else if (this.journeyStage === 'return') {
        return this.returnFlightId === flightId && this.returnSeatType === seatType;
      }
      return false;
    },
    // 다음 여정으로 진행 메소드
    NextJourney() {
      if (this.journeyStage === 'outgoing' && this.selectedFlightId !== null) {
        // 다음 여정으로 전환하고 오는편 리스트로 변경
        this.currentFlights = this.returnFlights;
        this.journeyStage = 'return';
        // // 선택 정보 초기화
        // this.selectedFlightId = null;
        // this.selectedSeatType = null;
      }
    },
    // 결제 페이지로 이동
    Payment() {

    }
  }
};
</script>

<style scoped>

.custom-card {
  max-width: 2000px;
  margin: auto;
  background-color: #ffffff;
  color: #00256c;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.route-info {
  text-align: center;
  margin-bottom: 20px;
}

.flight-card {
  background-color: #f3f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.flight-time {
  font-weight: bold;
  font-size: 18px;
}

.flight-duration {
  font-size: 14px;
  color: #666;
}

.price-option {
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  background-color: #f3f4f8;
}

.price-option:hover {
  background-color: #d0d0d0;
}

.price-option.selected {
  border-color: #00256c;
  background-color: #cce0ff;
}

.custom-btn {
  background-color: #00256c;
  color: white;
}

.custom-btn:hover {
  background-color: #001a4d;
}

.text-center {
  color: #00256c;
}

</style>

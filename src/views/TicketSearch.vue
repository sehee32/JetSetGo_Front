<template>
  <v-container>
    <v-card class="custom-card pa-6 mt-6">

      <h2 class="text-center mb-6">항공편 검색 결과</h2>

      <v-row>
        <v-col cols="12">
          <div class="route-info">
            <p>{{ departure }} -> {{ destination }}</p>
            <p>{{ departureDate }} - {{ returnDate }}</p>
            <p>성인 {{ adults }}명, 아동 {{ children }}명</p>
          </div>
        </v-col>
      </v-row>

      <v-tabs v-model="page" background-color="#00256c" centered grow>
        <v-tab v-for="(tab, index) in tabs" :key="index">
          {{ tab.date }}<br>{{ tab.price }}
        </v-tab>
      </v-tabs>
      <br>


      <!-- 더미 항공편 -->
      <v-row>
        <v-col cols="12" v-for="flight in dummyFlights" :key="flight.id">
          <v-card class="flight-card pa-4 mb-4">
            <v-row>
              <v-col cols="12" md="3">
                <!-- 항공편 상세 정보 표시 -->
                <div class="flight-time">
                  <span>{{ flight.departureTime }}</span>
                  <span> -> </span>
                  <span>{{ flight.arrivalTime }}</span>
                </div>
                <div class="flight-duration">소요시간: {{ flight.duration }}</div>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="4" class="price-option" v-for="option in flight.priceOptions" :key="option.type">
                    <!-- 가격 옵션 표시 -->
                    <div>{{ option.type }}</div>
                    <div>{{ option.price }}</div>
                    <div>{{ option.availability }}</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="3">
                <!-- 예약 버튼 -->
                <v-btn @click="bookFlight(flight.id)" class="custom-btn mt-2">예약하기</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      departure: '출발지',
      destination: '도착지',
      departureDate: '출발일',
      returnDate: '도착일',
      adults: '성인',
      children: '어린이',
      dummyFlights: [
        {
          id: 1,
          departureTime: '08:30',
          arrivalTime: '11:00',
          duration: '2시간 30분',
          priceOptions: [
            { type: 'FLY', price: '마감', availability: '' },
            { type: 'FLYBAG', price: '90,000', availability: '9석' },
            { type: 'BIZ LITE', price: '마감', availability: '' }
          ]
        },
        {
          id: 2,
          departureTime: '10:35',
          arrivalTime: '12:55',
          duration: '2시간 20분',
          priceOptions: [
            { type: 'FLY', price: '마감', availability: '' },
            { type: 'FLYBAG', price: '120,000', availability: '1석' },
            { type: 'BIZ LITE', price: '180,000', availability: '3석' }
          ]
        }
        // 더미 데이터
      ],
      page: 0, // 현재 선택된 탭 인덱스
      tabs: [
        { date: '06.24 (월)', price: '90,000원~' },
        { date: '06.25 (화)', price: '135,000원~' },
        { date: '06.26 (수)', price: '145,000원~' },
        { date: '06.27 (목)', price: '155,000원~' },
        { date: '06.27 (목)', price: '155,000원~' },
        { date: '06.27 (목)', price: '155,000원~' },
        { date: '06.27 (목)', price: '155,000원~' },
        { date: '06.27 (목)', price: '155,000원~' },
        { date: '06.27 (목)', price: '155,000원~' },

      ]
    };
  },
  methods: {
    // 항공편 예약 메소드
    bookFlight(flightId) {
      console.log('예약한 항공편 ID:', flightId);
      // 예약 코드 추가
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

.route-info {
  text-align: center;
  margin-bottom: 20px;
}

.flight-card {
  background-color: #f9f9f9;
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

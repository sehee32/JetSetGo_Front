<template>
  <v-container>
    <br>
    <h1 class="text-center mb-6">항공편 검색 결과</h1>

    <!-- 출발지, 도착지, 날짜, 인원 정보 표시 -->
    <v-row>
      <v-col cols="12">
        <div class="route-info">
          <h2><p>{{ departureMutable }} - {{ destinationMutable }}</p></h2>
          <h3>
            <p>{{ departureDate }} - {{ returnDate }}</p>
            <p>성인 {{ adults }}명, 아동 {{ children }}명</p>
          </h3>
        </div>
      </v-col>
    </v-row>

    <!-- 항공편 리스트 표시 -->
    <v-row>
      <v-col cols="12" v-for="flight in currentFlights" :key="flight.id">
        <v-card
            class="flight-card pa-4 mb-4"
            :class="{'selected-flight': selectedFlightId === flight.id}"
        @click="selectFlight(flight.id)"
        >
        <v-row>
          <!-- 항공편 시간 및 소요시간 정보 표시 -->
          <v-col cols="12" md="3">
            <div class="flight-time">
              <span>{{ flight.departureTime }}</span>
              <span> -> </span>
              <span>{{ flight.arrivalTime }}</span>
            </div>
            <div class="flight-duration">{{ flight.duration }}</div>
          </v-col>

          <!-- 가격 정보 표시 -->
          <v-col cols="12" md="8">
            <div class="flight-price">
              <strong>{{ formatPrice(flight.price) }} {{ flight.currency }}</strong>
            </div>
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
  </v-container>
</template>

<script>
import axios from "axios";

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
      type: Number,
      required: true
    },
    children: {
      type: Number,
      required: true
    },
    travelClass: {
      type: String,
      required: true
    },
    nonStop: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      currentFlights: [], // 현재 화면에 표시되는 항공편 리스트
      selectedFlightId: null, // 선택된 항공편 ID
      returnFlightId: null, // 돌아오는 항공편 ID
      journeyStage: 'outgoing', // 현재 여정 단계 ('outgoing' 또는 'return')
      departureMutable: this.departure, // 수정 가능한 출발지
      destinationMutable: this.destination, // 수정 가능한 도착지
      departureDateMutable: this.departureDate // 수정 가능한 출발 날짜
    };
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

        // API 응답 JSON에서 필요한 데이터만 추출
        const flightOffers = response.data;
        const resultArray = [];

        if (flightOffers.length === 0) {
          console.log('검색된 항공편이 없습니다.');
        } else {
          for (const offer of flightOffers) {
            const flightData = {
              id: offer.id,
              departureTime: offer.departureTime,
              arrivalTime: offer.arrivalTime,
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

    selectFlight(flightId) {
      this.selectedFlightId = flightId; // 선택된 항공편 ID 설정
    },

    NextJourney() {
      if (this.journeyStage === 'outgoing' && this.selectedFlightId !== null) {
        // 출발지와 도착지, 날짜 변경 후 검색
        const tempDeparture = this.departureMutable;
        this.departureMutable = this.destinationMutable;
        this.destinationMutable = tempDeparture;
        this.departureDateMutable = this.returnDate; // 출발일을 반환일로 변경

        this.journeyStage = 'return'; // 여정 상태를 'return'으로 변경
        this.selectedFlightId = null; // 선택된 항공편 초기화

        this.searchFlights(); // 다시 항공편 검색 실행
      }
    },

    Payment() {
      if (this.selectedFlightId !== null && this.returnFlightId !== null) {
        // 결제 로직 처리
      } else {
        console.error('결제 정보를 확인해 주세요.');
      }
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
  cursor: pointer;
}

.flight-card.selected-flight {
  border: 2px solid #00256c; /* 선택된 항공편의 테두리 변경 */
}

.flight-time {
  font-weight: bold;
  font-size: 18px;
}

.flight-duration {
  font-size: 14px;
  color: #666;
}

.flight-price {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
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

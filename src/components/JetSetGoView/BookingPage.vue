<template>
  <v-container>
    <v-card class="custom-card pa-6 mt-6">
      <h2 class="text-center mb-6">항공권 예매하기</h2>
      <v-form v-model="formValid" @submit.prevent="bookTicket">
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
                v-model="departure"
                :rules="[rules.required]"
                label="출발지"
                variant="outlined"
                prepend-inner-icon="mdi-airplane-takeoff"
                clearable
                @keyup="searchAirports($event.target.value, 'departure')"
                no-data-text="일치하는 도시가 없습니다."
                :items="cities"
                item-value="value"
                item-title="label"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
                v-model="destination"
                :rules="[rules.required]"
                label="도착지"
                variant="outlined"
                prepend-inner-icon="mdi-airplane-landing"
                clearable
                @keyup="searchAirports($event.target.value, 'destination')"
                no-data-text="일치하는 도시가 없습니다."
                :items="cities"
                item-value="value"
                item-title="label"
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
</template>

<script>
import axios from "axios";
export default {
  // type: {
  //   default: "index"
  // },
  data() {
    return {
      departure: '', // 출발지
      destination: '', // 도착지
      departureDate: null, // 출발 날짜
      returnDate: null, // 도착 날짜
      adults: null, // 성인 수
      children: null, // 아동 수
      formValid: false,
      cities: [{label:'', value:''}], // api로 가져올 도시 목록
      keyword : '',
      passengerOptions: Array.from({length: 10}, (v, i) => i + 1), // 승객 수 (1~10)
      rules: {
        required: value => !!value || '이 항목을 입력하지 않았습니다.' // 필수 입력 규칙
      }
    };
  },

  // created() {
  //   console.log("beforeCreate");
  //   const query = this.departure;
  //   if (!query || query.length < 2) { // 최소 2자 이상 입력된 경우에만 검색
  //     this.cities = [];
  //   }
  //
  //   try {
  //     const response = axios.get('/api/flights/airports', {
  //       params: { keyword: 'MUC' }, // 추출된 값 전달
  //     });
  //     console.log('api 요청 성공 : ', response.data); // 응답 데이터 확인
  //     this.cities = response.data.map(item => ({
  //       label: `${item.name} (${item.code})`,
  //       value: item.code,
  //     }));
  //   } catch (error) {
  //     console.error('api 요청 실패 : ',error);
  //   }
  // },

  created() {
    this.loadAirports(); // 컴포넌트가 생성될 때 공항 데이터 불러오기
  },


  methods: {
    async loadAirports() {
      try {
        const response = await axios.get('/api/flights/airports', {
          params: { keyword: this.keyword }
        });
        console.log(response.data);
        this.airports = response.data.airports; // 서버에서 받은 airports 배열

        if (Array.isArray(response.data.airports)) {
          this.cities = response.data.airports.map(airport => ({
            label: `${airport.city} (${airport.code})`,
            value: airport.code
          }));
          console.log('도시배열확인',this.cities);

        } else {
          console.error('응답 데이터가 배열이 아닙니다:', response.data);
          this.cities = []; // 기본값 설정
        }
      } catch (error) {
        console.error('api 요청 실패 : ', error);
      }

    },


    async searchAirports(keyword) {
      this.keyword = keyword;
      console.log('입력값 : ', keyword);

      if (keyword) {
        let keywordData = '';
        console.log(this.cities);
        keywordData = this.cities.filter(item =>
            item.label.toLowerCase().includes(keyword.toLowerCase())
        );
        console.log(keywordData);
      } else {
        this.keywordData = this.cities;
      }
    }
    ,

    // async searchAirports(e, type) {
    //   console.error('입력값 : ',e, type);
    // },

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
</style>

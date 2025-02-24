<!--ScheduleChangePanel.vue-->

<template>
  <v-container>
    <v-card class="custom-card pa-6 mt-6">
      <h2 class="text-center mb-6">일정 변경</h2>
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
            <v-select
                v-model="travelClass"
                :rules="[rules.required]"
                :items="classOptions"
                label="좌석 등급"
                variant="outlined"
                prepend-inner-icon="mdi-airplane"
                clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="nonStop"
                :rules="[rules.required]"
                :items="nonStopOptions"
                label="직항 여부"
                variant="outlined"
                prepend-inner-icon="mdi-airplane"
                clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="departureDate"
                :rules="[rules.required, rules.minDate]"
                label="가는 날"
                type="date"
                :min="today"
                prepend-inner-icon="mdi-calendar-outline"
                variant="outlined"
                clearable
                @input="validateDate($event, 'departureDate')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="returnDate"
                :rules="[rules.minDate, rules.afterDepartureDate]"
                label="오는 날"
                type="date"
                :min="today"
                prepend-inner-icon="mdi-calendar-outline"
                variant="outlined"
                clearable
                @input="validateDate($event, 'returnDate')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model.number="adults"
                :items="passengerOptions"
                label="성인"
                type="number"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                :rules="[rules.required, rules.adults]"
                min="1"
                clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model.number="children"
                :items="passengerOptions"
                label="아동"
                type="number"
                variant="outlined"
                prepend-inner-icon="mdi-account-child-outline"
                clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="d-flex justify-center mt-4">
          <v-btn
              class="custom-btn"
              :disabled="!departure || !destination || !departureDate || !adults"
              @click="updateSchedule"
          >
            변경하기
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: {
    initialDeparture: String,
    initialDepartureCity:String,
    initialDestination: String,
    initialDestinationCity:String,
    initialDepartureDate: String,
    initialReturnDate: String,
    initialAdults: Number,
    initialChildren: Number,
    initialTravelClass: String,
    initialNonStop: Boolean
  },
  data() {
    return {
      departure: this.initialDeparture,
      departureCity: this.initialDepartureCity,
      destination: this.initialDestination,
      destinationCity: this.initialDestinationCity,
      departureDate: this.initialDepartureDate,
      returnDate: this.initialReturnDate,
      adults: this.initialAdults,
      children: this.initialChildren,
      travelClass: this.initialTravelClass,
      nonStop: this.initialNonStop,
      formValid: false,
      cities: [{label: '', value: ''}], // api로 가져올 도시 목록
      keyword: '',
      keywordData: [],
      classOptions: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'],
      nonStopOptions: [{title: '직항', value: true}, {title: '경유', value: false}],
      passengerOptions: Array.from({length: 11}, (v, i) => i), // 승객 수 (0~10)
      today: new Date().toISOString().split('T')[0], // 오늘 날짜
      rules: {
        required: value => (value !== null && value !== '') || '이 항목을 입력하지 않았습니다.',// 필수 입력 규칙
        adults: value => value >= 1 || '성인은 1명이상이어야 합니다.',
        minDate: value => new Date(value) >= new Date(this.today) || '오늘 이후의 날짜를 선택해주세요.',
        afterDepartureDate: value => !this.departureDate || new Date(value) > new Date(this.departureDate) || '오는 날은 가는 날 이후여야 합니다.'
      }
    };
  },

  created() {
    this.loadAirports(); // 컴포넌트가 생성될 때 공항 데이터 불러오기
  },
  watch: {
    departure(newCode) {
      const selectedAirport = this.cities.find(city => city.value === newCode);
      this.departureCity = selectedAirport ? selectedAirport.label.split(" (")[0] : '';
    },
    destination(newCode) {
      const selectedAirport = this.cities.find(city => city.value === newCode);
      this.destinationCity = selectedAirport ? selectedAirport.label.split(" (")[0] : '';
    }
  },
  methods: {
    async loadAirports() {
      try {
        const response = await axios.get('/api/flights/airports', {
          params: {keyword: this.keyword}
        });
        console.log(response.data);
        this.airports = response.data.airports; // 서버에서 받은 airports 배열

        if (Array.isArray(response.data.airports)) {
          this.cities = response.data.airports.map(airport => ({
            label: `${airport.city} (${airport.code})`,
            value: airport.code
          }));
          console.log('도시배열확인', this.cities);

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
    },

    formatDate(date) {
      if (!date) return null;
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 맞추기
      const day = String(d.getDate()).padStart(2, '0'); // 일을 2자리로 맞추기
      return `${year}-${month}-${day}`;
    },

    validateDate(event, field) {
      const input = event.target.value;
      const [year, month, day] = input.split('-').map(Number);

      const inputDate = new Date(year, month - 1, day);
      const isValidDate = inputDate.getFullYear() === year &&
          inputDate.getMonth() === month - 1 &&
          inputDate.getDate() === day;

      if (isValidDate) {
        const minDate = new Date(this.today);
        if (inputDate >= minDate) {
          this[field] = input;
        } else {

          console.warn('선택한 날짜가 오늘 이전입니다.');
        }
      } else {
        console.warn('유효하지 않은 날짜입니다.');
      }
    },

    updateSchedule() {
      this.$emit('update-schedule', {
        departure: this.departure,
        departureCity: this.departureCity,
        destination: this.destination,
        destinationCity: this.destinationCity,
        departureDate: this.departureDate,
        returnDate: this.returnDate,
        adults: this.adults,
        children: this.children,
        travelClass: this.travelClass,
        nonStop: this.nonStop
      });
    },

    // 예매 정보 처리 메서드
    async bookTicket() {
      if (!this.departure || !this.destination) {
        console.log("출발지 또는 도착지가 비어 있습니다.");
        return;
      }

      console.log('선택된 travelClass: ', this.travelClass);

      const formattedDepartureDate = this.formatDate(this.departureDate);
      const formattedReturnDate = this.returnDate ? this.formatDate(this.returnDate) : null; // 오는 날이 없을 경우 null로 처리

      await this.searchFlights();

      this.$router.push({
        name: 'TicketSearch',
        query: {
          departure: this.departure,
          departureCity: this.departureCity,
          destination: this.destination,
          destinationCity: this.destinationCity,
          departureDate: formattedDepartureDate,
          returnDate: formattedReturnDate,
          adults: Number(this.adults),
          children: Number(this.children),
          travelClass: this.travelClass,
          nonStop: this.nonStop
        }
      });
    }
  }
}

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

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
</template>

<script>
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
      }
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

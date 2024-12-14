<template>
  <div class="reservationDetail">
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <div class="info">
            <h5>결제 정보</h5>
            <v-row class="payment">
              <v-col class="text-left">{{ paymentMethodStatus }}</v-col>
              <v-col class="text-right">{{ totalPaymentAmount }} 원</v-col>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "ReservationPayment",
  data() {
    return {
      reservationId: null,
      flights:[]
    };
  },
  computed: {
    totalPaymentAmount() {
      const total = this.flights.reduce((total, flight) => {
        return total + (flight.payment_Amount || 0); // PAYMENT_AMOUNT가 없는 경우 0으로 처리
      }, 0);

      // 금액에 쉼표 추가
      return new Intl.NumberFormat().format(total);
    },
    paymentMethodStatus() {
      if (this.flights.length === 0) return "예약 정보가 없습니다.";

      const firstMethod = this.flights[0].payment_Method;
      const allSame = this.flights.every(
          (flight) => flight.payment_Method === firstMethod
      );

      // 결과 반환
      return allSame
          ? `${firstMethod}`
          : `${firstMethod} 외`;
    },
  },
  methods: {
    async getReservationDetail(){
      const response = await axios.post('/api/myPageReservationDetails', {
        id: this.reservationId
      });
      // API 요청이 성공한 경우
      console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
      this.flights = response.data;
    }
  },
  mounted() {
    const element = this.$el.querySelector('.v-application__wrap');
    if (element) {
      element.style.minHeight = 'initial';
    } //v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용},


    // localStorage에서 ID 값을 읽어와서 데이터에 저장
    this.reservationId = localStorage.getItem('reservationId');
    this.getReservationDetail();

    console.log('예약 ID:', this.reservation_Id);
  }
}
</script>



<style scoped>
.reservationDetail{
  max-width: 1280px;
  margin: 0 auto;
}

/* 예약 */
.reservationDetail .costom-container{
  max-width: 1280px;
  padding: 0;
}

/* 결제 정보*/
.reservationDetail .info h5{
  padding-top: 50px;
  text-align: left;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 2px solid #00256c;
}

.reservationDetail .info .payment{
  margin: 0px;
  padding: 5px 20px;
  border-bottom: 1px solid #cccccc;
  line-height: 36px;
}

</style>
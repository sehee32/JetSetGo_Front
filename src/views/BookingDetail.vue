<!--BookingDetail.vue -->
<template>
  <div class="booking-container">
    <h2 class="section-title">여정 정보</h2>

    <div class="journey-box">
      <!-- 가는 편 -->
      <div class="journey-item">
        <div class="journey-header">
          <h3>가는 편</h3>
          <div class="route">
            <span class="city">{{ outgoingFlight.departure }}</span>
            <span class="arrow">→</span>
            <span class="city">{{ outgoingFlight.destination }}</span>
          </div>
        </div>
        <div class="journey-details">
          <div class="time">
            <span>{{ outgoingFlight.departureTime }} ~ {{ outgoingFlight.arrivalTime }}</span>
          </div>
          <div class="class">
            <span>{{ travelClass }}</span>
          </div>
        </div>
      </div>

      <!-- 오는 편 -->
      <div class="journey-item">
        <div class="journey-header">
          <h3>오는 편</h3>
          <div class="route">
            <span class="city">{{ returnFlight.departure }}</span>
            <span class="arrow">→</span>
            <span class="city">{{ returnFlight.destination }}</span>
          </div>
        </div>
        <div class="journey-details">
          <div class="time">
            <span>{{ returnFlight.departureTime }} ~ {{ returnFlight.arrivalTime }}</span>
          </div>
          <div class="class">
            <span>{{ travelClass }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="passenger-section">
      <div class="section-header">
        <h2 class="section-title">승객 정보</h2>
        <p class="journey-passenger">성인: {{ adults }}명 아동: {{ children }}명</p>
      </div>

      <div class="passenger-form">
        <div class="passenger-header">
          <span class="passenger-number">승객 1</span>
        </div>

        <div class="form-content">
          <div class="form-row">
            <label class="form-text">국적<span class="required">*</span></label>
            <input type="text" placeholder="예) 대한민국 또는 KOREA">
          </div>

          <div class="form-row">
            <div class="name-inputs">
              <div class="input-group">
                <label class="form-text">승객 성<span class="required">*</span></label>
                <input type="text" placeholder="예) 김 또는 KIM">
              </div>
              <div class="input-group">
                <label class="form-text">승객 이름<span class="required">*</span></label>
                <input type="text" placeholder="예) 대한 또는 DAEHAN">
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="input-group">
              <label class="form-text">성별<span class="required">*</span></label>
              <select>
                <option>여성</option>
                <option>남성</option>
              </select>
            </div>
            <div class="input-group">
              <label class="form-text">생년월일(YYYY.MM.DD.)<span class="required">*</span></label>
              <input type="text">
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="payment-section">
      <div class="total-amount">
        <span>최종 결제 금액</span>
        <span class="amount">{{totalPrice}}원</span>
      </div>
      <button @click="Payment" class="payment-button">결제하기</button>
    </div>
  </div>
</template>

<script>

export default {
  props : {

  },

  data() {
    return {
      totalPrice : 0,
      outgoingFlight: null,
      returnFlight: null,
      adults: 0,
      children: 0,
      travelClass: "",
      departureDate: "",
      returnDate: "",
      departure: "",
      destination: ""
    };
  },
  created() {
    // 라우터에서 데이터 파싱
    const query = this.$route.query;
    this.outgoingFlight = JSON.parse(decodeURIComponent(query.outgoing || '{}'));
    this.returnFlight = JSON.parse(decodeURIComponent(query.returning || '{}'));
    this.adults = parseInt(query.adults || 0, 10);
    this.children = parseInt(query.children || 0, 10);
    this.travelClass = query.travelClass;
    this.departureDate = query.departureDate;
    this.returnDate = query.returnDate;
    this.departure = query.departure;
    this.destination = query.destination;
    this.totalPrice = parseFloat(query.totalPrice || 0);
  },

  methods : {
    async Payment() {
      // if (this.selectedFlightId !== null && (this.returnFlightId !== null || !this.returnDate)) {
      //   try {
      //
      //     // 선택된 항공편 가격 계산
      //     const selectedFlight = this.currentFlights.find(flight => flight.id === this.selectedFlightId);
      //     this.totalPrice = selectedFlight.price;
      //     if (this.returnFlightId) {
      //       const returnFlight = this.currentFlights.find(flight => flight.id === this.returnFlightId);
      //       this.totalPrice += returnFlight.price;
      //     }
      //     console.log('결제 정보:', {
      //       user: this.userInfo,
      //       totalAmount: this.totalPrice
      //     });

          const IMP = window.IMP;
          IMP.init("imp12777257");

          try {
            IMP.request_pay(
                {
                  // param
                  pg: "kakaopay",
                  merchant_uid: `uid-${crypto.randomUUID()}`, // 주문 번호
                  channelKey: "channel-key-016f94c1-5b8c-448d-81ee-f544a25da15b",
                  paymentId: `payment-${crypto.randomUUID()}`,
                  name: "항공권~~",
                  pay_method: "card",
                  amount: 100000
                },
                function (rsp) {
                  // callback
                  if (rsp.success) {
                    // 결제 성공 시
                    console.log("결제 성공");
                    this.verificationSuccess = true; // 인증 성공 시 변수 값을 true로 설정
                  } else {
                    // 실패 시 로직
                    console.log("결제 실패", rsp);
                    this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
                  }
                }.bind(this) // 함수 내부에서 this를 사용할 수 있도록 바인딩
            );
          } catch (error) {
            console.error("본인 인증 요청 실패:", error);
            this.verificationMessage = '본인 인증 요청에 실패했습니다.';
            this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
          }
          // 결제 api 호출 여기서 하기
      //   } catch (error) {
      //     console.error('결제 오류:', error);
      //   }
      // } else {
      //   console.error('결제 정보를 확인해 주세요.');
      // }
    }
  }
}
</script>

<style scoped>
.booking-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: left;

}

.journey-box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e0e0e0;
}

.journey-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.journey-item:last-child {
  border-bottom: none;
}

.journey-header {
  margin-bottom: 15px;
  text-align: left;
}

.journey-header h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
}

.route {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}

.city {
  font-size: 16px;
  font-weight: bold;
}

.arrow {
  color: #666;
}

.journey-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.time {
  font-size: 14px;
}

.class {
  font-size: 14px;
  color: #888;
}
.passenger-section {
  margin-top: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


.passenger-form {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.passenger-header {
  background: #002c5f;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.journey-passenger {
  color: #001a4d;
}

.form-content {
  padding: 20px;

}

.form-row {
  margin-bottom: 20px;
  text-align: left;
}

.form-text {
  margin-left: 10px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.required {
  color: red;
  margin-left: 2px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.name-inputs, .membership-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.payment-section {
  margin-top: 30px;
  text-align: right;
}

.total-amount {
  font-size: 18px;
  margin-bottom: 15px;
}

.amount {
  font-weight: bold;
  margin-left: 10px;
}

.payment-button {
  background: #002c5f;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
</style>
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
      <div v-if="returnFlight && returnFlight.departure" class="journey-item">
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

      <!-- 승객 정보 폼 -->
      <div v-for="(passenger, index) in passengers" :key="index" class="passenger-form">
        <div class="passenger-header" @click="toggleForm(index)">
          <span class="passenger-number">승객 {{ index + 1 }}</span>
          <span class="toggle-icon">{{ expandedForms[index] ? '▲' : '▼' }}</span>
        </div>

        <div v-if= expandedForms[index] class="form-content">
          <div class="form-row">
            <label class="form-text">국적<span class="required">*</span></label>
            <input type="text" v-model="passenger.nationality" placeholder="예) 대한민국 또는 KOREA">
          </div>

          <div class="form-row">
            <div class="name-inputs">
              <div class="input-group">
                <label class="form-text">승객 이름<span class="required">*</span></label>
                <input type="text" v-model="passenger.passengerName">
              </div>
              <div class="input-group">
                <label class="form-text">성별<span class="required">*</span></label>
                <select v-model="passenger.gender">
                  <option value="female">여성</option>
                  <option value="male">남성</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="input-group">
              <label class="form-text">생년월일(YYYY-MM-DD)<span class="required">*</span></label>
              <input type="text" v-model="passenger.birthDate" placeholder="예) 1990-01-01">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-section">

        <span class="total-amount">최종 결제 금액</span>
        <span class="amount">{{formatNumberWithCommas(totalPrice)}}원</span>

      <button @click="Back" class="back-button">뒤로가기</button>
      <button @click="Payment" class="payment-button">결제하기</button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import dayjs from "dayjs";

export default {
  props : {

  },

  data() {
    return {
      totalPrice : 0,
      totalPassenger: 0,
      outgoingFlight: {},
      returnFlight: {},
      adults: 0,
      children: 0,
      nonStop:"",
      tripType:"",
      travelClass: "",
      departureDate: "",
      returnDate: "",
      departure: "",
      departureCity:"",
      destination: "",
      destinationCity:"",
      passengers: [],
      expandedForms: [],
      token : localStorage.getItem('token'), // JWT 토큰 저장
      birthDate: "",
      name: "",
      id: "",
      phoneNumber: "",
      contact: "",
      userPassword: "",
      member_Id: 0,
    };
  },
  mounted() {
    this.fetchUserInfos();
  },
  created() {
    // 라우터에서 데이터 파싱
    const query = this.$route.query;
    this.outgoingFlight = JSON.parse(decodeURIComponent(query.outgoingFlight || '{}'));
    this.returnFlight = JSON.parse(decodeURIComponent(query.returnFlight || '{}'));

    console.log("outgoingFlight:", this.outgoingFlight);
    console.log("returnFlight:", this.returnFlight);


    this.adults = parseInt(query.adults || 0, 10);
    this.children = parseInt(query.children || 0, 10);
    this.travelClass = query.travelClass;
    this.departureDate = query.departureDate;
    this.returnDate = query.returnDate;
    this.departure = query.departure;
    this.departureCity = query.departureCity;
    this.destination = query.destination;
    this.destinationCity = query.destinationCity;
    this.totalPrice = parseFloat(query.totalPrice || 0);
    this.nonStop = query.nonStop;
    this.tripType = this.returnFlight && Object.keys(this.returnFlight).length > 0 ? "왕복" : "편도";

    // 총 승객 수 계산 및 초기화
    this.totalPassenger = this.adults + this.children;

    this.passengers = Array.from({ length: this.totalPassenger }, () => ({
      nationality: "",
      passengerName: "",
      gender: "",
      birthDate: "",
    }));
    this.expandedForms = Array(this.totalPassenger).fill(false);  // expandedForms도 총 승객 수에 맞게 초기화
    this.expandedForms[0] = true; // 첫번째 폼은 펼쳐짐

  },

  methods : {
    async fetchUserInfos() {


      const token = localStorage.getItem('jwtToken'); // 저장된 토큰 가져오기
      if (token) {
        try {
          const response = await axios.post('/api/getUserInfos', {
            token: token // 토큰을 본문에 포함
          });
          this.name = response.data.name; // 사용자 정보를 변수에 저장
          this.id = response.data.username;
          this.phoneNumber = response.data.phoneNumber;
          this.contact = response.data.phoneNumber;
          this.birthDate = response.data.birthdate;
          this.userPassword = response.data.password;
          this.member_Id = response.data.membernum;

          if (this.passengers.length > 0) {
            this.passengers[0].passengerName = response.data.name;
            this.passengers[0].birthDate = response.data.birthdate;
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    },

    // 숫자 포맷팅 메서드 추가
    formatNumberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async Payment() {


      const IMP = window.IMP;
      IMP.init("imp12777257");

      //merchant_uid 들어갈 예약 시간 저장
      const date = new Date().toISOString()

      if (!this.$store.getters.isAuthenticated) {
        // 현재 예약 정보를 Vuex에 저장
        this.$store.dispatch('saveBookingData', {
          outgoingFlight: this.outgoingFlight,
          returnFlight: this.returnFlight,
          adults: this.adults,
          children: this.children,
          travelClass: this.travelClass,
          totalPrice: this.totalPrice,
          passengers: this.passengers,
          nonStop: this.nonStop
        });

        // 로그인 페이지로 리다이렉트
        this.$router.push('/loginpage');

        return;
      }

      const flightData = [];

      const outgoingFlightData = {
        departureTime: dayjs(this.outgoingFlight.departureTime).format("YYYY-MM-DDTHH:mm:ss"),
        arrivalTime: dayjs(this.outgoingFlight.arrivalTime).format("YYYY-MM-DDTHH:mm:ss"),
        originlocationcode: this.outgoingFlight.departure,
        destinationlocationcode: this.outgoingFlight.destination,
        departureCity: this.destinationCity,
        arrivalCity: this.departureCity,
      };

      flightData.push(outgoingFlightData);

      if (this.tripType === "왕복" && this.returnFlight && this.returnFlight.departure) {
        const returnFlightData = {
          departureTime: dayjs(this.returnFlight.departureTime).format("YYYY-MM-DD HH:mm:ss"),
          arrivalTime: dayjs(this.returnFlight.arrivalTime).format("YYYY-MM-DD HH:mm:ss"),
          originlocationcode: this.returnFlight.departure,
          destinationlocationcode: this.returnFlight.destination,
          departureCity: this.departureCity,
          arrivalCity: this.destinationCity,
        };

        flightData.push(returnFlightData);
      }
      console.log("flightData", flightData);
      const response = await axios.post("/api/reservation/flights", flightData);
      const savedFlightIds = response.data.flightIds; // 가는편,오는편ID 받음

      console.log("저장된 항공편 ID들:", savedFlightIds);

      try {
        // 예약 데이터 먼저 저장
        for (let i=0; i < this.passengers.length; i++) {
          await axios.post('/api/reservation', {
            member_Id: this.member_Id,
            reservation_Id: `${this.member_Id}_${this.passengers[i].passengerName}_${date}`,
            status: "예약대기",
            trip_Type: this.tripType,
            reservation_Date: date,
            passenger_Name: this.passengers[i].passengerName,
            phone_Number: this.phoneNumber,
            passport_Number: "123123123",
            passport_Expirydate: "123123123",
            passport_Issuingcountry: "123123",
            payment_Amount: this.totalPrice,
            payment_Method: "card",
            nonstop: this.nonStop === "true" ? 1 : 0,
            travelclass: this.travelClass,
            adults: this.adults,
            children: this.children,
            flightIds: savedFlightIds // 저장된 항공편 ID 전달
          });
        }
        this.verificationSuccess = true;
      } catch (error) {
        console.error("[ERROR] 예약 실패:", error);
        this.verificationMessage = '[ERROR] 예약을 실패했습니다.';
        this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
      }
      try {
        if (this.verificationSuccess) {
          // 결제 진행
          IMP.request_pay({
            // param
            pg: "kakaopay",
            merchant_uid: "uid_" + this.member_Id + date,   // 주문 번호
            channelKey: "channel-key-016f94c1-5b8c-448d-81ee-f544a25da15b",
            paymentId: `payment-${crypto.randomUUID()}`,
            name: "항공권 예약",
            pay_method: "card",
            amount: this.totalPrice
          }, async function (rsp) {
            // callback
            this.verificationSuccess = rsp.success
            console.log("결제 결과: ", rsp)

            for (let i=0; i < this.passengers.length; i++) {
              /* 결제 완료 내역 DB 저장 */
              const response = await axios.post('/api/payment', {
                reservation_Id: `${this.member_Id}_${this.passengers[i].passengerName}_${date}`,
                status: this.verificationSuccess,
                amount: this.totalPrice
              });
              console.log("결제 완료 내역 DB 저장 결과", response.data); // 서버로부터의 응답 확인
            }
            this.$router.push({
              path: "/paymentcompleted",
              query: {
                amount: this.totalPrice,
                paymentMethod: "카드",
                reservationId: `${this.member_Id}_${this.passengers[0].passengerName}_${date}`
              }
            });
          }.bind(this));
        }
      } catch (error) {
        console.error("[ERROR] 결제 실패:", error);
        this.verificationMessage = '[ERROR] 결제가 실패했습니다.';
        this.verificationSuccess = false; // 인증 실패 시 변수 값을 false로 설정
      }


    },
    Back() {
      this.$router.go(-1);
    },
    toggleForm(index) {
      this.expandedForms[index] = !this.expandedForms[index];
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
  margin-bottom: 30px;
}

.passenger-header {
  background: #002c5f;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.toggle-icon {
  font-size: 12px;
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.total-amount {
  font-size: 18px;
}

.amount {
  font-weight: bold;
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
}
.booking-container {
  padding-bottom: 80px; /* payment-section 높이만큼 패딩 추가 */
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

.back-button {
  background: white;
  color: #002c5f;
  padding: 12px 30px;
  border: 1px solid #002c5f;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
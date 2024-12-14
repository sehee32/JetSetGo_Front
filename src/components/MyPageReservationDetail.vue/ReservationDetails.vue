<template>
  <div class="reservationID">
    <!-- 예약 정보 -->
    <div style="max-width: 1280px; margin: 0 auto;">
      <h1>예약번호 : {{ reservationId }}</h1>
      <h3>{{ flightsDepartureCity }}&nbsp;&nbsp;<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;{{ flightsArrivalCity }}</h3>
    </div>
  </div>
  <div class="reservationDetail">
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <!-- 예약 항공편 정보 -->
          <div v-for="(item, index) in uniqueflights" :key="index" class="costom-box">
            <div class="title">
              <span :style="getBackgroundStyle(item.status)">여정 {{index+1}}</span>
              <span>{{ item.originlocationcode }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.destinationlocationcode }}</span>
            </div>
            <div class="detail">
              <h4>{{ item.departureDate }}</h4>
              <v-row>
                <v-col class="departure">
                  <p><strong>{{ item.departureTime }}</strong></p>
                  <p>{{ item.departure_City }}</p>
                  <p class="code">{{ item.originlocationcode }}</p>
                </v-col>
                <v-col cols="2" class="img">
                  <p>총 {{ item.duration }} 소요</p>
                  <p></p>
                  <p></p>
                </v-col>
                <v-col class="arrival">
                  <p><strong>{{ item.arrivalTime }}</strong></p>
                  <p>{{ item.arrival_City }}</p>
                  <p class="code">{{ item.destinationlocationcode }}</p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- 연락처 및 탑승객 정보 -->
          <div class="info">
            <h5>연락처 및 탑승객 정보</h5>
            <v-row class="text-left representative">
              <v-col cols="4">
                <span><strong>대표자 연락처</strong></span>
              </v-col>
              <v-col cols="3">
                <span><strong>이름</strong>{{userName}}</span>
              </v-col>
              <v-col cols="5">
                <span><strong>연락처</strong> {{userPhoneNumber}}</span>
              </v-col>
            </v-row>
            <v-row class="passengerTitle">
              <v-col cols="3" class="text-left">
                <p>탑승객</p>
              </v-col>
              <v-col>
                <p>연락처</p>
              </v-col>
              <v-col>
                <p>여권정보</p>
              </v-col>
            </v-row>
            <v-row v-for="(item, index) in infoflights" :key="index" class="passengerData">
              <v-col cols="3" class="text-left">
                <span>{{ item.passenger_Name }}</span>
              </v-col>
              <v-col>
                <span>{{ item.phone_Number }}</span>
              </v-col>
              <v-col>
                <v-btn
                    text
                    @click="updatePassport(item)"
                    :disabled="item.status === '사용완료' || item.status === '예약취소'"
                    class="btn"
                >
                  {{ item.passport_Number ? '수정' : '등록' }}
                </v-btn>
              </v-col>
            </v-row>
            <!-- 여권정보 입력 -->
            <v-dialog v-model="currentPassportDialog" max-width="400px">
              <v-card>
                <v-card-title class="headline">여권 정보</v-card-title>
                <v-card-text>
                  <!-- 여권번호 입력 -->
                  <v-text-field
                      v-model="currentPassport.passport_Number"
                      :rules="[rules.required]"
                      label="여권번호"
                      required
                      clearable
                  ></v-text-field>

                  <!-- 여권만료일 입력 -->
                  <v-text-field
                      v-model="currentPassport.passport_ExpiryDate"
                      :rules="[rules.required]"
                      label="여권 만료일"
                      type="date"
                      :min="today"
                      prepend-inner-icon="mdi-calendar"
                      required
                      clearable
                  ></v-text-field>

                  <!-- 여권발행국 선택 -->
                  <v-select
                      v-model="currentPassport.passport_IssuingCountry"
                      :rules="[rules.required]"
                      :items="countries"
                      label="여권 발행국"
                      item-title="name"
                      item-value="code"
                      required
                  ></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text @click="currentPassportDialog = false">취소</v-btn>
                  <v-btn color="primary" text @click="goUpdatePassport">확인</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservaionDetails",
  data() {
    return {
      reservationId: null,
      flights:[],
      countries: [
        { name: '대한민국', code: 'KR' },
        { name: '미국', code: 'US' },
        { name: '일본', code: 'JP' },
        { name: '영국', code: 'GB' },
        // 더 많은 국가 리스트 추가
      ],
      currentPassport: {
        passenger_Name:'',
        phone_Number: '',
        passport_Number: '',
        passport_ExpiryDate: null,
        passport_IssuingCountry: null,
      },
      passportExpiryDateMenu: false,
      currentPassportDialog: false,
      rules: {
        required: value => (value !== null && value !== '') || '이 항목을 입력하지 않았습니다.' ,// 필수 입력 규칙
      },
      today: new Date().toISOString().split('T')[0], // 오늘 날짜
    };
  },
  computed: {
    uniqueflights() {
      // 중복 제거 로직: 예약 번호와 출발 시간 기준으로 중복 제거
      const uniqueMap = new Map();
      this.flights.forEach((item) => {
        const key = `${item.reservation_Id}-${item.departureDate}-${item.departureTime}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      });
      return Array.from(uniqueMap.values());
    },
    infoflights() {
      // 중복 제거 로직: 탑승자 이름과 번호 동일할 경우 중복 제거
      const uniqueMap = new Map();
      this.flights.forEach((item) => {
        const key = `${item.passenger_Name}-${item.phone_Number}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      });
      return Array.from(uniqueMap.values());
    },
    flightsDepartureCity() {
      return this.flights.length > 0 ? this.flights[0].arrival_City : '데이터 없음';
    },
    flightsArrivalCity() {
      return this.flights.length > 0 ? this.flights[0].departure_City : '데이터 없음';
    },
    userName() {
      return this.flights.length > 0 ? this.flights[0].name : '데이터 없음';
    },
    userPhoneNumber() {
      return this.flights.length > 0 ? this.flights[0].phoneNumber : '데이터 없음';
    }
  },
  methods: {
    async getReservationDetail(){
      const response = await axios.post('/api/myPageReservationDetails', {
        id: this.reservationId
      });
      // API 요청이 성공한 경우
      console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
      this.flights = response.data;
    },
    getBackgroundStyle(status) {
      let backgroundColor;
      switch (status) {
        case '사용완료':
          backgroundColor = '#cccccc';
          break;
        case '예약취소':
          backgroundColor = '#666666';
          break;
        default:
          backgroundColor = '#5985e1'; // 기본 색상
      }
      return {
        'background-color' : `${backgroundColor}`
      };
    },
    updatePassport(item) {
      // 현재 클릭한 항목의 데이터를 currentPassport에 넣어서 다이얼로그에 표시
      this.currentPassport = { ...item };
      this.currentPassportDialog = true;
    },
    async goUpdatePassport() {
      // 현재 항목의 passport 정보 갱신
      if (!this.currentPassport.passport_Number || !this.currentPassport.passport_ExpiryDate || !this.currentPassport.passport_IssuingCountry) {
        alert('여권정보를 입력하세요');
      }else {
        const response = await axios.post('/api/myPageEditPassport', {
          id: this.reservationId,
          passengerName: this.currentPassport.passenger_Name,
          phoneNumber: this.currentPassport.phone_Number,
          passportNumber: this.currentPassport.passport_Number,
          passportExpiryDate: this.currentPassport.passport_ExpiryDate,
          passportIssuingCountry: this.currentPassport.passport_IssuingCountry
        });
        // API 요청이 성공한 경우
        console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
        this.$router.go(0);
        alert('여권정보가 저장되었습니다.');
      }
      }
  },
  mounted() {
      const element = document.querySelector('.v-application__wrap');
      if (element) {
        element.style.minHeight = 'initial';
      } //v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용},

    // localStorage에서 ID 값을 읽어와서 데이터에 저장
    this.reservationId = localStorage.getItem('reservationId');
    this.getReservationDetail();

    console.log('예약 ID:', this.reservationId);
  }
}
</script>


<style scoped>

.reservationID{
  background: linear-gradient(to right, #00256c, #0064de);
  padding: 20px 0 30px 0;
}

.reservationID h1,
.reservationID h3{
  color: white;
  text-align: left;
}

.reservationID h1{
  font-size: 15px;
}

.reservationID h3{
  font-size: 20px;
  font-weight: 500;
}

.reservationID h3 span{
  background: url('@/assets/to_w.svg') no-repeat center center;
}

.reservationDetail{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 50px;
}

/* 예약 */
.reservationDetail .costom-container{
  max-width: 1280px;
  padding: 0;
}

/* 예약 항공편 정보 */
.reservationDetail .costom-box{
  text-align: left;
  margin-bottom: 60px;
  border-radius: 10px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2); /* 수평 오프셋, 수직 오프셋, 흐림 정도, 색상 */
}
.reservationDetail .costom-box .title{
  border-bottom: 1px solid #eee;
}
.reservationDetail .costom-box .title span{
  display: inline-block;
  padding: 13px 25px;
  font-weight: 700;
  font-size: 17px;
}

.reservationDetail .costom-box .title span:first-of-type {
  border-radius: 10px 0 3px 0;
  color: white;
  padding: 16px 28px;
  font-size: 15px;
}

.reservationDetail .costom-box .title span:last-child{
  background: url('@/assets/to.svg') no-repeat center center;
}

.reservationDetail .costom-box .detail{
  padding: 30px 40px 50px 40px;
}

.reservationDetail .costom-box .detail p{
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  color: #777;
}

.reservationDetail .costom-box .detail p strong{
  font-size: 30px;
  color: #000000;
}

.reservationDetail .costom-box .detail .code{
  font-size: 18px;
  font-weight: 600;
  color: #000000;
}

.reservationDetail .costom-box .detail .img{
  font-size: 20px;
  background: url('@/assets/flight.png') no-repeat center;
  background-size: 25px 25px;
}

.reservationDetail .costom-box .detail .departure p{
  text-align: right;
}

.reservationDetail .costom-box .detail .arrival p{
  text-align: left;
}

/* 연락처 및 탑승객 정보 */
.reservationDetail .info h5{
  padding-top: 50px;
  text-align: left;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 2px solid #00256c;
}

.reservationDetail .info span{
  color: #666666;
}

.reservationDetail .info .representative{
  margin: 0px;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid #00256c;
}

.reservationDetail .info strong{
  margin-right: 10px;
  color: black;
}

.reservationDetail .info .passengerTitle{
  margin: 0px;
  color: #00256c;
  padding: 5px 20px;
  background-color: #f3f4f8;
  border-bottom: 1px solid #cccccc;
}

.reservationDetail .info .passengerData{
  margin: 0px;
  padding: 5px 20px;
  border-bottom: 1px solid #cccccc;
  line-height: 36px;
}

.reservationDetail .info .passengerData .btn{
  font-weight: 700;
  border: 1px solid #5985e1;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  background-color: #5985e1;
  color: #fff;
}

.reservationDetail .info .passengerData .btn:hover{
  background-color: #fff;
  color: #5985e1;
}

</style>
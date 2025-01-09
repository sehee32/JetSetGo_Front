<template>
  <div class="reservationID">
    <!-- 예약 정보 -->
    <div style="max-width: 1280px; margin: 0 auto;">
      <h1>예약번호 : {{ reservationId }}</h1>
      <h3>{{ flightsDepartureCity }}&nbsp;&nbsp;<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;{{ flightsArrivalCity }}</h3>
    </div>
  </div>
  <div v-if="selectPage" class="reservationDetail">
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <!-- 예약 항공편 정보 -->
          <h2>여정 변경하기</h2>
          <P> 예약 변경시 출발 시간 정보만 변경이 가능합니다.</P>
          <div v-for="(item, index) in uniqueflights" :key="index" class="costom-box" :class="{'selected-flight': isSelectedFlight(item.flight_Id)}" @click="selectFlight(item)">
            <div class="title">
              <span :style="getBackgroundStyle(item.status)">여정 {{index+1}}</span>
              <span>{{ item.originlocationcode }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.destinationlocationcode }}</span>
            </div>
            <div class="detail">
              <div class="detailTitle">
                <h4>{{ item.departureDate }}</h4>
                <h5>{{ item.travelclass }} / {{ isnonstop(item.nonstop) }}</h5>
              </div>
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
              <h4 class="paymentAmount">결제 금액 : {{paymentAmount(item.payment_Amount)}} 원</h4>
            </div>
            <!-- 수정 시 확인 -->
            <div v-if="getInChangeFlight(item)" class="ChangeFlight">
              <h4>변경내역</h4>
              <p>{{ item.departureTime }} ~ {{ item.arrivalTime }} ▶ {{convertToTime(getChangeFlight(item).changeDetail.departureTime)}} ~ {{convertToTime(getChangeFlight(item).changeDetail.arrivalTime)}}</p>
              <p>{{paymentAmount(item.payment_Amount)}} 원 ▶ {{paymentAmount(getChangeFlight(item).changeDetail.price)}} 원 </p>
              <p>결과 :{{ changeFlight }}</p>
            </div>
          </div>

          <div v-if="selectedFlightId" class="view">
            <!-- 중첩 라우팅 -->
            <router-view :key="selectedFlightId"></router-view>
          </div>


          <!-- 버튼 -->
          <div>
            <v-row class="changeCencel">
              <v-col class="first">
                <v-btn @click="goBack" class="btn">취소</v-btn>
              </v-col>
              <v-col>
                <v-btn @click="goChange" class="btn">결제/환불 하기</v-btn>
              </v-col>
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
  name: "ReservationCancelSearch",
  data() {
    return {
      reservationId: null,
      selectedFlightChangeId: [], // 배열로 초기화
      selectPage: true,
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
      selectedFlightId: '', //현재 선택된 ID
      changeFlight: [], // 결과
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
    async getReservationChangeDetail(){
      const response = await axios.post('/api/myPageReservationChangeDetails', {
        id: this.reservationId,
        selectedFlightChangeId: this.selectedFlightChangeId
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
    paymentAmount(pay) {
      // 금액에 쉼표 추가
      return new Intl.NumberFormat().format(pay);
    },
    isnonstop(value){
      if(value === 1){
        return '직항';
      }else{
        return '경유';
      }
    },
    isSelectedFlight(flightId) {
      return this.selectedFlightId === flightId;
    },
    selectFlight(item) {
      if(this.selectedFlightId === item.flight_Id){
        this.selectedFlightId = '';
      }else {

        const formattedDepartureDate = this.formatDate(item.departureDate);
        const formattedReturnDate = item.returnDate ? this.formatDate(item.returnDate) : null;

        this.$router.push({
          name: 'TicketChangeSearch',
          query: {
            departure: item.originlocationcode,
            destination: item.destinationlocationcode,
            departureDate: formattedDepartureDate,
            returnDate: formattedReturnDate,
            adults: item.adults,
            children: item.children,
            travelClass: item.travelclass,
            nonStop: item.nonstop === 1,
            reservationChange: true
          }
        }).then(() => {
          // 라우팅이 완료된 후에 설정
          this.selectedFlightId = item.flight_Id;
        });
        console.log('현재 선택된 Flight ID:', this.selectedFlightId);

      }

    },
    goBack(){
      this.$emit('deactivateCancelSearch');
    },
    async goChange(){
      if (this.selectedFlightChangeId.length === this.changeFlight.length) {
        const response = await axios.post('/api/myPageReservationChangeDetailsData', this.changeFlight );
        // API 요청이 성공한 경우
        console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
        if(response.data){
          alert('변경되었습니다.');
          this.$emit('goDetail');
        }else{
          alert('변경실패 : 관리자에게 문의하세요.');
        }

      } else {
        alert('변경하지 않은 예약이 있습니다.');
      }

      // 리렌더링 강제
      this.$forceUpdate();

    },
    formatDate(date) {
      if (!date) return null;
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 맞추기
      const day = String(d.getDate()).padStart(2, '0'); // 일을 2자리로 맞추기
      return `${year}-${month}-${day}`;
    },
    getInChangeFlight(item) {
      const index = this.changeFlight.findIndex((flight) => flight.flightId === item.flight_Id);

      return index !== -1 ? true : false;
    },
    getChangeFlight(item){
      const index = this.changeFlight.findIndex((flight) => flight.flightId === item.flight_Id);

        return index !== -1 ? this.changeFlight[index] : [{changeDetail:{departureTime : "", arrivalTime : ""}}];
    },
    convertToTime(dateTime) {
      const date = new Date(dateTime);
      const time = date.toLocaleTimeString('en-GB', { hour12: false });  // '11:00:00'
      return time;
    }
  },
  mounted() {
    const element = document.querySelector('.v-application__wrap');
    if (element) {
      element.style.minHeight = 'initial';
    } //v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용},

    // localStorage에서 ID 값을 읽어와서 데이터에 저장
    this.reservationId = localStorage.getItem('reservationId');
    this.selectedFlightChangeId = JSON.parse(localStorage.getItem('selectedFlightId')) || [];
    this.getReservationChangeDetail();

    console.log('예약 ID:', this.reservationId);
    console.log('예약 ID:', this.selectedFlightId);
    console.log('예약 ID:', this.$route.query.changeFlight);
  },
  watch: {
    // $route 객체를 직접 감시
    '$route.query.changeFlight': function(newValue) {
      if (newValue && this.selectedFlightId) {


        // changeFlight 배열에서 flightId가 selectedFlightId와 같은 항목 찾기
        const existingIndex = this.changeFlight.findIndex(
            (flight) => flight.flightId === this.selectedFlightId
        );

        if (existingIndex === -1) {
          // flightId가 없는 경우 새 항목 추가
          this.changeFlight.push({
            reservationId: this.reservationId,
            flightId: this.selectedFlightId,
            changeDetail: JSON.parse(newValue)
          });
        } else {
          // flightId가 있는 경우 changeDetail 값만 변경
          this.changeFlight[existingIndex].changeDetail = newValue;
        }
        this.selectedFlightId = '';

      }
    }
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

.reservationDetail h2{
  text-align: left;
  color: #00256c;
  margin-bottom: 10px;
}

.reservationDetail p{
  text-align: left;
  color: #00256c;
  margin-bottom: 10px;
}

/* 예약 항공편 정보 */
.reservationDetail .costom-box{
  text-align: left;
  margin-bottom: 60px;
  border-radius: 10px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2); /* 수평 오프셋, 수직 오프셋, 흐림 정도, 색상 */
  cursor: pointer;
  transition: transform 0.3s;
}
.reservationDetail .costom-box:hover{
  transform: scale(1.02);
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

.reservationDetail .costom-box .detail .detailTitle{
  overflow: hidden; /* float로 인해 깨질 수 있는 레이아웃 문제 해결 */
  margin-bottom: 15px;
}

.reservationDetail .costom-box .detail .detailTitle h4{
  float: left; /* 왼쪽 정렬 */
}

.reservationDetail .costom-box .detail .detailTitle h5{
  float: right; /* 오른쪽 정렬 */
  font-size: 14px;
  text-align: right;
  color: #666666;
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

.reservationDetail .costom-box .detail .paymentAmount{
  text-align: right;
  color: #00256c;
}

.selected-flight {
  border: 2px solid #00256c; /* 선택된 항공편의 테두리 변경 */
}




/* 검색화면 */
.reservationDetail .view{
  padding: 25px;
  border: 2px solid #00256c; /* 선택된 항공편의 테두리 변경 */
  border-radius: 10px;
}
/* 버튼 */
.reservationDetail .changeCencel{
  margin: 50px 0 100px 0;
  padding: 20px;
}

.reservationDetail .changeCencel .btn{
  font-size: 18px;
  font-weight: 700;
  width: 280px;
  height: 60px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid #00256c;
  border-radius: 15px;
  text-decoration: none;
  cursor: pointer;
  background-color: #00256c;
  color: #fff;
}

.reservationDetail .changeCencel .first .btn{
  background-color: #fff;
  color: #00256c;
}

.reservationDetail .changeCencel .btn:hover{
  background-color: #fff;
  color: #00256c;
}

.reservationDetail .changeCencel .first .btn:hover{
  background-color: #00256c;
  color: #fff;
}
</style>

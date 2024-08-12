<template>
  <div class="reservationID">
    <!-- 예약 정보 -->
    <div style="max-width: 1280px; margin: 0 auto;">
      <h1>예약번호 : {{ reservationId }}</h1>
      <h3>{{ flights[0].departureCity }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ flights[0].arrivalCity }}</h3>
    </div>
  </div>
  <div class="reservationDetail">
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <!-- 예약 항공편 정보 -->
          <div v-for="(item, index) in flights" :key="index" class="costom-box">
            <div class="title">
              <span>여정 {{index+1}}</span>
              <span>{{ item.departureCode }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.arrivalCode }}</span>
            </div>
            <div class="detail">
              <h4>{{ item.departureDate }}</h4>
              <v-row>
                <v-col class="departure">
                  <p><strong>{{ item.departureTime }}</strong></p>
                  <p>{{ item.departureCity }}</p>
                  <p class="code">{{ item.departureCode }}</p>
                </v-col>
                <v-col cols="2" class="img">
                  <p>총 {{ item.duration }} 소요</p>
                  <p></p>
                  <p></p>
                </v-col>
                <v-col class="arrival">
                  <p><strong>{{ item.arrivalTime }}</strong></p>
                  <p>{{ item.arrivalCity }}</p>
                  <p class="code">{{ item.arrivalCode }}</p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- 연락처 및 탑승객 정보 -->
          <div class="info">
            <h5>연락처 및 탑승객 정보</h5>
            <v-row>
              <v-col>
                <p><strong>{{user.name}}</strong></p>
              </v-col>
              <v-col>
                <p><strong>연락처</strong> {{user.phoneNumber}}</p>
              </v-col>
              <v-col>
              </v-col>
            </v-row>
          </div>
          <div class="info">
            <h5>여행 변경 및 취소</h5>
            <v-row>
              <v-col>
                <v-btn></v-btn>
                <p>예약변경</p>
              </v-col>
              <v-col>
                <v-btn></v-btn>
                <p>예약취소/환불</p>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "MyPageReservationDetail",
  components: {},
  props: ['id'], // Define id as a prop
  data() {
    return {
      flights: [
        { flightID:100, departureCode:'ICN', arrivalCode:'KIX', departureCity: '서울', arrivalCity: '오사카', departureDate: '2025-05-07', arrivalDate: '2025-05-07', departureTime: '15:15', arrivalTime: '17:15', duration: '2시간 0분' },
        { flightID:321, departureCode:'KIX', arrivalCode:'ICN', departureCity: '오사카', arrivalCity: '서울', departureDate: '2025-05-09', arrivalDate: '2025-05-09', departureTime: '14:30', arrivalTime: '16:31', duration: '2시간 1분' },
        // Add more items as needed
      ],
      reservationId: null,
      status: '미사용',
      user: {name:'사용자', phoneNumber:'01022222222'},
    };
  },
  methods: {
    goDetail() {
      this.$router.go(-1); // 우선 이전 페이지로 이동
    }
  },
  mounted() {
    // localStorage에서 ID 값을 읽어와서 데이터에 저장
    this.reservationId = localStorage.getItem('reservationId');

    // 필요에 따라 ID를 기반으로 추가 작업을 수행할 수 있습니다.
    console.log('예약자 ID:', this.reservationId);
  },
  beforeUnmount() {
    // 컴포넌트가 사라질 때 localStorage에서 ID 값을 삭제할 수 있습니다.
    localStorage.removeItem('reservationId');
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
  background: url('@/assets/to_w.svg') no-repeat 50px center;
}

.reservationDetail{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 40px;
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
  background: url('@/assets/to.svg') no-repeat 155px center;
}
.reservationDetail .costom-box .title span{
  display: inline-block;
  padding: 13px 25px;
  font-weight: 700;
  font-size: 17px;

}

.reservationDetail .costom-box .title span:first-of-type {
  background-color: #5985e1;
  border-radius: 10px 0 3px 0;
  color: white;
  padding: 17px 29px;
  font-size: 13px;
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


</style>
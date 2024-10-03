<template>
  <div class="reservationList">
    <h1>예약 목록</h1>
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <!-- 예약 -->
          <div v-for="(item, index) in reservations" :key="index" class="costom-box" :style="getBorderTopStyle(item.status)">
            <div class="list">
              <div class="status">
                <p><strong>{{ item.status }}</strong> {{ item.reservation_Id }}</p>
              </div>
              <div class="airport">
                <span><strong>{{ item.originlocationcode }}</strong>{{ item.departure_City }} </span>
                <span> <strong>{{ item.destinationlocationcode }}</strong>{{ item.arrival_City }}</span>
              </div>
              <div class="time">
                <strong>{{ item.departure_Time }} ~ {{ item.arrival_Time }}</strong>
              </div>
            </div>
            <div class="line"></div>
            <div class="btn">
              <v-btn
                  @click="goDetail(item.reservation_Id)"
                  class="detailBtn"
                  text="상세보기"
                  block
              ></v-btn>
            </div>
          </div>
<!--          <div v-if="noData">예약내역이 없습니다.</div>-->
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyPageReservationList",
  components: {},
  data() {
    return {
      reservation: [
        { reservation_Id: 1002, status: '미사용', originlocationcode:'ICN', destinationlocationcode:'KIX', departure_City: '서울', arrival_City: '오사카', departure_Time: '2025-05-07 15:15', arrival_Time: '2025-05-07 17:15'  },
        { reservation_Id: 1001, status: '사용완료', originlocationcode:'ICN', destinationlocationcode:'KIX', departure_City: '서울', arrival_City: '오사카', departure_Time: '2025-05-03 13:30', arrival_Time: '2025-05-03 15:30'  },
        // Add more items as needed
      ],
      reservations:[],
      userId: ''
    };
  },
  methods: {
    goDetail(id) {
      // ID 값을 localStorage에 저장
      localStorage.setItem('reservationId', id);
      // MyPageReservationDetail로 이동
      this.$router.push({ name: 'MyPageReservationDetail' });
    },
    getBorderTopStyle(status) {
      let borderColor;
      switch (status) {
        case '사용완료':
          borderColor = '#cccccc';
          break;
        default:
          borderColor = '#000256'; // 기본 색상
      }
      return {
        borderTop: `4px solid ${borderColor}`
      };
    },
    async getReservation(){
      const token = localStorage.getItem('jwtToken'); // 저장된 토큰 가져오기
      if (token) {
        try {
          const response = await axios.post('/api/getUserInfos', {
            token: token // 토큰을 본문에 포함
          });
          this.userId = response.data.membernum; // 사용자 ID를 변수에 저장

        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
      console.log('userId 확인: ' + this.userId); // 서버에서 받은 데이터 출력
      const response = await axios.post('/api/myPageReservations', {
        userId: this.userId
      });
      // API 요청이 성공한 경우
      console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
      this.reservations = response.data;
      console.log(this.noData);
    }
  },
  mounted() {
    const element = this.$el.querySelector('.v-application__wrap');
    if (element) {
      element.style.minHeight = 'initial';
    } //v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용
    this.getReservation();
    window.scrollTo(0, 0); // 페이지 스크롤 위치 맨 위로
  }
}
</script>


<style scoped>
.reservationList{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 70px;
}

.reservationList .costom-container{
  max-width: 1280px;
  padding: 0;
}

.reservationList h1{
  text-align: left;
  margin-bottom: 40px;
  color: #00256c;
}

/* 예약 */
.reservationList .costom-box{
  text-align: left;
  padding: 25px 40px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.2); /* 수평 오프셋, 수직 오프셋, 흐림 정도, 색상 */
}

.reservationList .costom-box .list,
.reservationList .costom-box .line,
.reservationList .costom-box .btn{
  display: inline-block;
}

.reservationList .costom-box .line{
  width: 1px;
  height: 50px;
  background-color: #eee;
}

.reservationList .costom-box .list{
  width: 71%;
}

.reservationList .costom-box .list .status{
  width: 100%;
  margin-bottom: 30px;
}

.reservationList .costom-box .list .airport{
  display: inline-block;
  width: 40%;
  background: url('@/assets/flight.png') no-repeat 118px center;
  background-size: 20px 20px; /* 너비와 높이 모두 지정 */
}

.reservationList .costom-box .list .airport span{
  display: inline-block;
  margin-right: 40px;
  text-align: center;
  width: 110px;
}

.reservationList .costom-box .list .airport span strong{
  display: block;
  font-size: 40px;
}

.reservationList .costom-box .list .time{
  display: inline-block;
  margin-top: 20px;
}

.reservationList .costom-box .btn{
  width: 28%;
}

.reservationList .costom-box .btn .detailBtn {
  width: 280px;
  height: 50px;
  margin-left: auto;
  min-width: 34px;
  padding: 18px 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 2;
  border: 1px solid #00256c;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  background-color: #00256c;
  color: #fff;
}

.reservationList .costom-box .btn .detailBtn:hover{
  background-color: #fff;
  color: #00256c;
}

</style>
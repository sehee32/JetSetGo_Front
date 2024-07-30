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
                <p><strong>{{ item.status }}</strong> {{ item.reservationId }}</p>
              </div>
              <div class="airport">
                <span><strong>{{ item.departureCode }}</strong>{{ item.departureCity }} </span>
                <span> <strong>{{ item.arrivalCode }}</strong>{{ item.arrivalCity }}</span>
              </div>
              <div class="time">
                <strong>{{ item.departureTime }} ~ {{ item.arrivalTime }}</strong>
              </div>
            </div>
            <div class="line"></div>
            <div class="btn">
              <v-btn
                  @click="goDetail(item.reservationId)"
                  class="detailBtn"
                  text="상세보기"
                  block
              ></v-btn>
            </div>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "MyPageReservationList",
  components: {},
  data() {
    return {
      reservations: [
        { reservationId: 1002, status: '미사용', departureCode:'ICN', arrivalCode:'KIX', departureCity: '서울', arrivalCity: '오사카', departureTime: '2025-05-07 15:15', arrivalTime: '2025-05-07 17:15'  },
        { reservationId: 1001, status: '사용완료', departureCode:'ICN', arrivalCode:'KIX', departureCity: '서울', arrivalCity: '오사카', departureTime: '2025-05-03 13:30', arrivalTime: '2025-05-03 15:30'  },
        // Add more items as needed
      ],
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
        borderTop: `3px solid ${borderColor}`
      };
    }
  },
  mounted() {
    const element = this.$el.querySelector('.v-application__wrap');
    if (element) {
      element.style.minHeight = 'initial';
    } //v-app 아래의 div class="v-application__wrap" 요소에 min-height: initial; 스타일을 적용
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
  width: 30%;
  background: url('@/assets/flight.png') no-repeat 88px center;
  background-size: 20px 20px; /* 너비와 높이 모두 지정 */
}

.reservationList .costom-box .list .airport span{
  display: inline-block;
  margin-right: 60px;
  text-align: center;
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
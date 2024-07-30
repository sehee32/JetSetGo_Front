<template>
  <div class="reservationList">
    <h1>예약 상세 페이지</h1>
    <p>예약 ID: {{ reservationId }}</p>
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <!-- 예약 -->
          <div v-for="(item, index) in reservations" :key="index" class="costom-box">
            <div class="list">
              <p><strong>Name:</strong> {{ item.name }}</p>
              <p><strong>Date:</strong> {{ item.date }}</p>
              <p><strong>Location:</strong> {{ item.location }}</p>
            </div>
            <div class="line"></div>
            <div class="btn">
              <v-btn
                  @click="goDetail"
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
  name: "MyPageReservationDetail",
  components: {},
  props: ['id'], // Define id as a prop
  data() {
    return {
      reservations: [
        { name: 'John Doe', date: '2024-07-30', location: 'New York' },
        { name: 'Jane Smith', date: '2024-08-01', location: 'Los Angeles' }
      ],
      reservationId: null
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
  padding: 40px 30px;
  margin-bottom: 40px;
  border-radius: 10px;
  border-top: 3px solid #00256c;
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
  width: 72%;
}

.reservationList .costom-box .btn{
  width: 27%;
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
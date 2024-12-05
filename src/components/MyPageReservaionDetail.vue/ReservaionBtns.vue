<template>
  <div class="reservationDetail">
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <div class="info">
            <h5>여행 변경 및 취소</h5>
            <v-row class="changeCencel">
              <v-col>
                <v-btn @click="goDialog('change')" :disabled="status !== '예약확정'" class="btn">예약변경</v-btn>
              </v-col>
              <v-col>
                <v-btn @click="goDialog('cancel')" :disabled="status !== '예약확정'" class="btn">예약취소/환불</v-btn>
              </v-col>
            </v-row>
          </div>
          <!-- 알림창 -->
          <v-dialog v-model="showDialog" max-width="400px">
            <v-card>
              <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
              <v-card-text v-html="dialogDetail"></v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="showDialog = false">취소</v-btn>
                <v-btn color="primary" text @click="goAction">확인</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservaionBtns",
  data() {
    return {
      reservationId: null,
      flights:[],
      showDialog: false,
      dialogTitle: '',
      dialogDetail: ''
    };
  },
  computed: {
    status() {
      return this.flights.length > 0 ? this.flights[0].status : '데이터 없음';
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
    },
    goDialog(action){
      if (action === 'cancel') {
        this.dialogTitle = '예약 취소/환불';
        this.dialogDetail = '환불 신청 시 예약과 항공권이 모두 취소되며 취소 이후에는 사용이 불가합니다.<br> 승객 본인의 의사에 따라 신청한 것으로 간주하며 그에 따른 책임은 신청인에게 있습니다.';
        this.showDialog = true;
      } else if (action === 'change') {
        this.dialogTitle = '예약 변경';
        this.dialogDetail = '예약 변경은 출발 24시간 전까지만 가능합니다.<br> 변경 수수료가 부과될 수 있습니다.';
        this.showDialog = true;
      }
    },
    async goAction(){
      if (this.dialogTitle === '예약 취소/환불') {
        const response = await axios.post('/api/myPageCancelReservation', {
          id: this.reservationId
        });
        // API 요청이 성공한 경우
        console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
        this.showDialog = false;
        this.$router.go(0);
        alert('예약 취소 되었습니다.');
      } else if (this.dialogTitle === '예약 변경'){
        this.$router.push({ name: 'MyPageReservationList' });
      }
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
  },
  beforeUnmount() {
    // 컴포넌트가 사라질 때 localStorage에서 ID 값을 삭제할 수 있습니다.
    localStorage.removeItem('reservationId');
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

/* 변경 취소 버튼 */
.reservationDetail .info h5{
  padding-top: 50px;
  text-align: left;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 2px solid #00256c;
}

.reservationDetail .info .changeCencel{
  margin: 0 0 100px 0;
  padding: 20px;
  border-bottom: 1px solid #cccccc;
}

.reservationDetail .info .changeCencel .btn{
  font-size: 18px;
  font-weight: 700;
  width: 280px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid #5985e1;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  background-color: #5985e1;
  color: #fff;
}

.reservationDetail .info .changeCencel .btn:hover{
  background-color: #fff;
  color: #5985e1;
}

</style>
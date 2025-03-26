<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card class="text-center content-card" elevation="0">
      <v-icon class="custom-icon" size="70">
        mdi-check-circle
      </v-icon>

      <p class="text-h5 font-weight-bold mt-4">결제 완료</p>
      <p class="text-subtitle1 mt-1">
        예약이 성공적으로 완료되었습니다.
      </p>

      <!-- 결제 정보 카드 -->
      <v-card class="payment-info mt-5" elevation="0">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <span class="text-subtitle1 font-weight-medium">총 결제 금액</span>
            <span class="text-h6 font-weight-bold">{{ formatNumber(paymentInfo.amount) }} 원</span>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="payment-details">
          <div class="detail-item">
            <span class="detail-label">승인번호</span>
            <span class="detail-value">{{ paymentInfo.reservationId || "정보 없음" }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">결제 수단</span>
            <span class="detail-value">{{ paymentInfo.paymentMethod || "정보 없음" }}</span>
          </div>
        </v-card-text>
      </v-card>

      <v-btn
          class="mt-6"
          color="#002c5f"
          elevation="2"
          @click="goToHome"
      >
        홈으로 돌아가기
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PaymentCompleted",
  data() {
    return {
      paymentInfo: {
        amount: this.$route.query.amount || 0,
        paymentMethod: this.$route.query.paymentMethod || "정보 없음",
        reservationId: this.$route.query.reservationId || "정보 없음",
      }
    };
  },
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
    },
    formatNumber(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.v-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background-color: white;
}

.custom-icon {
  background-color: #002c5f;
  color: white;
  border-radius: 50%;
  padding: 16px;
}

.content-card {
  padding: 50px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.payment-info {
  border-radius: 8px;
  background-color: #f5f8fa;
}

.payment-details {
  margin-top: 10px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.detail-label {
  font-size: 14px;
  color: #555;
}

.detail-value {
  font-size: 14px;
  font-weight: bold;
}
</style>

<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card class="text-center content-card" elevation="0">

      <v-icon
          class="custom-icon"
          size="70"
      >
        mdi-check-circle
      </v-icon>
      <p class="text-h6 mt-5">결제가 완료되었습니다.</p>


      <v-btn
          class="mt-6"
          color="primary"
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
  methods: {
    goToHome() {

      this.$router.push({ path: "/" });
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
  background-color: #62B1F6;
  color: white;
  border-radius: 50%;
  padding: 16px;
}


.content-card {
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

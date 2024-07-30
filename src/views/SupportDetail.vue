<template>
  <div class="supportDetail">
    <div class="supportDetailTitle">
      <h1>문의하기 상세</h1>
      <v-btn icon @click="goBack" class="backBt">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div>
      <h1>문의 상세 페이지</h1>
      <p>문의 ID: {{ supportId }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InquiryPage',
  data() {
    return {
      supportId: null // 초기에는 null로 설정하여 초기화
    };
  },
  methods: {
    goBack()
    {
      this.$router.go(-1); //이전 페이지로 이동
    }
  },
  mounted() {
    // localStorage에서 ID 값을 읽어와서 데이터에 저장
    this.supportId = localStorage.getItem('supportId');

    // 필요에 따라 ID를 기반으로 추가 작업을 수행할 수 있습니다.
    console.log('예약자 ID:', this.supportId);
  },
  beforeUnmount() {
    // 컴포넌트가 사라질 때 localStorage에서 ID 값을 삭제할 수 있습니다.
    localStorage.removeItem('supportId');
  }
}

</script>

<style scoped>

.supportDetail {
  max-width: 1280px;
  margin: 0 auto;
  padding: 65px 0 110px;
}

.supportDetail .supportDetailTitle{
  position: relative;
}

.supportDetail .supportDetailTitle h1 {
  font-weight: 400;
  font-size: 35px;
  color: #000;
  margin: 0 0 50px 0;
}

.supportDetail .supportDetailTitle .backBt{
  position: absolute;
  top: 0;
  left: 10px;
}
</style>
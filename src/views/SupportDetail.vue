<template>
  <div class="supportDetail">
    <div class="supportDetailTitle">
      <h1>문의하기 상세</h1>
      <v-btn icon @click="goBack" class="backBt">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div>
      <p>Support Number: <span>{{ supportNum }}</span></p>
      왜 안나오지...
    </div>
  </div>
</template>

<script>

export default {
  name: 'InquiryPage',
  data() {
    return {
      supportNum: null // 초기에는 null로 설정하여 초기화
    };
  },
  created() {
    // Vue 라이프사이클 훅인 created에서 this.$route.params를 통해 params 값에 접근
    this.supportNum = this.$route.params.supportNum;
    console.log('확인',this.$route.params.supportNum)
  },
  methods: {
    goBack()
    {
      this.$router.go(-1); //이전 페이지로 이동
    }
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
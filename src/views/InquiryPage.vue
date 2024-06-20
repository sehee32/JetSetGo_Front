<template>
  <div class="inquiry">
    <div class="inquiryTitle">
      <h1>문의하기</h1>
      <v-btn icon @click="goBack" class="backBt">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InquiryPage',
  data: function (){
    return{
      selectedCategory: '',
      categories: [
        { name: '항공권', value: 'ticket' },
        { name: '수하물', value: 'baggage' },
        { name: 'etc', value: 'etc' }
      ],
      title: '',
      detail: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    }
  }
}
</script>

<style scoped>

ul {
  list-style: none;
}

.inquiry {
  max-width: 1280px;
  margin: 0 auto;
  padding: 65px 0 110px;
}

.inquiry .inquiryTitle{
  position: relative;
}

.inquiry .inquiryTitle h1 {
  font-weight: 400;
  font-size: 35px;
  color: #000;
  margin: 0 0 50px 0;
}

.inquiry .inquiryTitle .backBt{
  position: absolute;
  top: 0;
  left: 10px;
}
</style>
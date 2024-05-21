<template>
  <div class="inquiry">
    <h1>문의하기</h1>
    <router-link to="/support">뒤로가기</router-link>
    <div class="category-name-selector">
      <ul>
        <li>
          <h3>유형<span>*</span></h3>
          <select id="category" v-model="selectedCategory">
            <option value="" disabled>선택해주세요</option>
            <option v-for="category in categories" :key="category.value" :value="category.value">
              {{ category.name }}
            </option>
          </select>
        </li>
        <li>
          <h3>제목<span>*</span></h3>
          <input id="title" type="text" v-model="title" placeholder="입력해주세요" />
        </li>
        <li>
          <h3>내용<span>*</span></h3>
          <input id="detail" type="text" v-model="detail" placeholder="신속하고 정확한 안내를 위해 주문번호를 입력해주세요." />
        </li>
      </ul>

    </div>
  </div>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-date-input
            label="Select a date"
            prepend-icon=""
            prepend-inner-icon="$calendar"
            variant="solo"
        ></v-date-input>

      </v-col>

      <v-col cols="12" md="6">
        <v-date-input
            label="Select a date"
            prepend-icon=""
            variant="solo"
        ></v-date-input>

      </v-col>
    </v-row>

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

.inquiry h1 {
  font-weight: 400;
  font-size: 35px;
  color: #000;
  margin: 0 0 50px 0;
}
</style>
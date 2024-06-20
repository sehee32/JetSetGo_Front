<template>
  <div class="inquiry">
    <div class="inquiryTitle">
      <h1>문의하기</h1>
      <v-btn icon @click="goBack" class="backBt">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col cols="1">
            <v-sheet class="pa-3 fontSize20">
              유형<span class="colRed">*</span>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet>
              <v-select
                  variant="outlined"
                  placeholder="선택해주세요."
                  :items="categories"
                  item-title="name"
                  item-value="value"
                  :rules="[rules.requiredSelect]"
              ></v-select>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="1">
            <v-sheet class="pa-3 fontSize20">
             제목<span class="colRed">*</span>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet>
              <v-text-field
                  variant="outlined"
                  placeholder="입력해주세요."
                  v-model="title"
                  :rules="[rules.required, rules.counterTitle]"
                  maxlength="50"
                  counter
              ></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="1">
            <v-sheet class="pa-3 fontSize20">
              내용<span class="colRed">*</span>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet>
              <v-textarea
                  variant="outlined"
                  placeholder="신속하고 정확한 안내를 위해 주문번호를 입력해주세요."
                  hint="신속하고 정확한 안내를 위해 주문번호를 입력해주세요."
                  rows="15"
                  class="no-resize"
                  :rules="[rules.required, rules.counterDetail]"
                  maxlength="2000"
                  counter
              ></v-textarea>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="1">
            <v-sheet class="pa-3 fontSize20">
              공개여부
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2">

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

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
      detail: '',
      rules: {
        required: value => !!value || '이 항목을 입력하지 않았습니다.',
        requiredSelect: value => !!value || '이 항목을 선택하지 않았습니다.',
        counterTitle: value => value.length <= 50 || '최대 50자입니다.',
        counterDetail: value => value.length <= 2000 || '최대 2000자입니다.',
      },
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

.inquiry .no-resize >>> textarea {
  resize: none;
}

.inquiry .fontSize20{
  font-size: 20px;
}

.inquiry .colRed{
  color: red;
}


</style>
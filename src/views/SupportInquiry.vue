<template>
  <div class="inquiry">
    <div class="inquiryTitle">
      <h1>문의하기</h1>
      <v-btn icon @click="goBack" class="backBt">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <v-form @submit.prevent="submit" ref="form">
      <div>
        <v-container>
          <!--유형-->
          <v-row no-gutters>
            <v-col cols="1">
              <v-sheet class="pa-3 fontSize20">
                유형<span class="colRed">*</span>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet>
                <v-select
                    v-model="selectedCategory"
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
          <!--제목-->
          <v-row no-gutters>
            <v-col cols="1">
              <v-sheet class="pa-3 fontSize20">
               제목<span class="colRed">*</span>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet>
                <v-text-field
                    v-model="title"
                    variant="outlined"
                    placeholder="입력해주세요."
                    :rules="[rules.required, rules.counterTitle]"
                    maxlength="50"
                    counter
                ></v-text-field>
              </v-sheet>
            </v-col>
          </v-row>
          <!--내용-->
          <v-row no-gutters>
            <v-col cols="1">
              <v-sheet class="pa-3 fontSize20">
                내용<span class="colRed">*</span>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet>
                <v-textarea
                    v-model="detail"
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
          <!--공개여부-->
          <v-row no-gutters>
            <v-col cols="1">
              <v-sheet class="pa-3 fontSize20">
                공개여부
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet>
                <v-switch
                    v-model="isPublic"
                    :label="switchLabel"
                    color="primary"
                    @change="onSwitchChange"
                    inset
                ></v-switch>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div>
        <v-btn
            :loading="loading"
            class="submitBtn"
            text="문의하기"
            type="submit"
            block
        ></v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SupportInquiry',
  data: function (){
    return{
      selectedCategory: null,
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
      isPublic: true,  // v-switch의 초기 상태를 false로 설정
      loading: false,
    }
  },
  methods: {
    goBack() {
      if (this.selectedCategory || this.title || this.detail) {
        const confirmed = window.confirm('작성 중인 내용이 있습니다. 정말 이동하시겠습니까?'); // 폼이 수정되었을 경우 사용자에게 경고 메시지 표시
        if (confirmed) {
          this.$router.go(-1); // 사용자가 확인을 눌렀을 경우 이전 페이지로 이동
        } else {
          // 사용자가 취소를 눌렀을 경우 아무 작업도 하지 않음
        }
      } else {
        this.$router.go(-1); //폼이 수정되지 않았을 경우 이전 페이지로 이동
      }

    },
    onSwitchChange() {
      if (!this.isPublic) {
        alert('비공개 시 계정 비밀번호 입력 후 확인 가능합니다.');
      }
    },
    async submit() {
      try {
        this.loading = true;
        // 폼 유효성 검사 수행
        const isValid = await this.$refs.form.validate();
        if (!isValid.valid) {
          alert('모든 필수 항목을 입력해주세요.'); // 유효하지 않은 경우 처리
          return;
        }
        console.log('유효성 검사 결과 : ' + isValid.valid); // 유효성 검사 결과 확인
        const response = await axios.post('/api/supportAdd', {
          category: this.selectedCategory,
          title: this.title,
          detail: this.detail,
          isPublic: this.isPublic
        });
        // API 요청이 성공한 경우
        console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력

        alert('문의가 성공적으로 제출되었습니다.');
        this.$router.push({path: '/support'});


      } catch (error) {
        console.error('오류 발생:', error);
        alert(`오류 발생: ${error.message}`);
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    switchLabel() {
      return this.isPublic ? '공개' : '비공개';  // 상태에 따라 라벨 변경
    },
  },
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

.inquiry .submitBtn {
  display: block;
  width: 320px;
  height: 65px;
  min-width: 34px;
  margin: 60px auto 0;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 2;
  border: 1px solid #00256c;
  border-radius: 10px;
  background-color: #fff;
  color: #00256c;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}

.inquiry .submitBtn:hover {
  background-color: #00256c;
  color: #fff;
}

</style>
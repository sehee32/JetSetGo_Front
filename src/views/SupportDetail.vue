<template>
  <div class="supportDetail">
    <div class="supportDetailTitle">
      <h1>문의하기 상세 {{ supportId }}</h1>
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
                    :readonly="adminId || !editable"
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
                    :readonly="adminId || !editable"
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
                    :readonly="adminId || !editable"
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
                    :readonly="adminId || !editable"
                    v-model="isPublic"
                    :label="switchLabel"
                    color="primary"
                    @change="onSwitchChange"
                    inset
                ></v-switch>
              </v-sheet>
            </v-col>
          </v-row>
          <!--내용-->
          <v-row no-gutters>
            <v-col cols="1">
              <v-sheet class="pa-3 fontSize20">
                답변<span class="colRed">*</span>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet>
                <v-textarea
                    :readonly="!adminId || !editable"
                    v-model="answer"
                    variant="solo-filled"
                    placeholder="답변을 기다리는 중입니다."
                    rows="15"
                    class="no-resize"
                    :rules="[rules.counterDetail]"
                    maxlength="2000"
                    counter
                ></v-textarea>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-if="(!answer && supportWiter) || adminId">
        <v-btn v-if="editable"
            :loading="loading"
            class="submitBtn"
            :text="adminId ? '답변완료하기' : '문의수정하기'"
            type="submit"
            block
        ></v-btn>
        <v-btn v-if="!editable"
               :loading="loading"
               class="submitBtn"
               @click="goEditable"
               :text="adminId ? '답변하기' : '수정하기'"
               block
        ></v-btn>
      </div>
      <div v-if="answer && supportWiter">
        <v-btn v-if="!adminId"
               :loading="loading"
               class="submitBtn"
               @click="openDeleteDialog"
               text="삭제하기"
               block
        ></v-btn>
      </div>
    </v-form>
  </div>
  <!-- 삭제 확인 폼 -->
  <v-dialog v-model="deleteDialog" max-width="500px">
    <v-card>
      <v-card-title>삭제 확인</v-card-title>
      <v-card-text>
        삭제 시 영구 삭제 됩니다.
        <br>
        삭제 하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="deleteSupport">확인</v-btn>
        <v-btn @click="closeDeleteDialog">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import axios from "axios";

export default {
  name: 'InquiryPage',
  data() {
    return {
      supportId: null, // 초기에는 null로 설정하여 초기화
      sessionId: '',
      adminId: false,
      answer: '',
      editable: false, // 수정 가능 상태
      selectedCategory: '',
      categories: [
        {name: '항공권', value: 'ticket'},
        {name: '수하물', value: 'baggage'},
        {name: 'etc', value: 'etc'}
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
      supportWiter: false, // 현재 문의 작성자 인지 확인
      deleteDialog: false // 삭제 확인 다이얼로그 표시 여부
    }
  },
  methods: {
    goBack() {
      if (this.editable) {
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
    goEditable(){
      this.editable = true;
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
        const response = await axios.post('/api/supportEdit', {
          support_Id: this.supportId,
          category: this.selectedCategory,
          title: this.title,
          detail: this.detail,
          public_Status: this.isPublic,
          answer: this.answer
        });
        // API 요청이 성공한 경우
        console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력

        if(this.adminId){
          alert('답변이 완료되었습니다.');
        }else {
          alert('수정이 완료되었습니다.');
        }
        this.editable = false;

      } catch (error) {
        console.error('오류 발생:', error);
        alert(`오류 발생: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },
    // 삭제 확인 다이얼로그 열기
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    // 삭제 확인 다이얼로그 닫기
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    async deleteSupport(){
      this.closeDeleteDialog();
      const response = await axios.post('/api/supportRemove', {
        supportId: this.supportId
      });
      // API 요청이 성공한 경우
      console.log('결과 확인: ' + response.data); // 서버에서 받은 데이터 출력
      alert('삭제가 완료되었습니다.');
      this.$router.push({path: '/support'});
    },
    async selectSupport(){
      const response = await axios.post('/api/enterSupport', {
        supportId: this.supportId
      });
      // API 요청이 성공한 경우
      console.log('결과 확인: ' + response.data.public_Status); // 서버에서 받은 데이터 출력
      //supportId로 문의 내용 받아오기
      this.selectedCategory = response.data.category;// 응답 데이터를 저장
      this.title = response.data.title;
      this.detail = response.data.detail;
      this.isPublic = response.data.public_Status;
      this.answer = response.data.answer || ''; // null일 경우 빈 문자열로 대체

      if(this.sessionId == response.data.writer_Id){
        this.supportWiter = true;//sessionId로 작성자인지 아닌지 여부 확인
      }else{
        this.supportWiter = false;//sessionId로 작성자인지 아닌지 여부 확인
      }
    }
  },
  computed: {
    switchLabel() {
      return this.isPublic ? '공개' : '비공개';  // 상태에 따라 라벨 변경
    },
  },
  mounted() {
    // localStorage에서 ID 값을 읽어와서 데이터에 저장
    this.supportId = localStorage.getItem('supportId');
    // this.sessionId = localStorage.getItem('session_id'); // 저장된 키에 맞게 수정
    this.sessionId = 1; //임시 아이디 부여

    this.adminId = false;//sessionId로 관리자인지 아닌지 여부 확인

    this.selectSupport();
  },
  beforeUnmount() {
    // 컴포넌트가 사라질 때 localStorage에서 ID 값을 삭제할 수 있습니다.
    localStorage.removeItem('supportId');
  }
}

</script>

<style scoped>

ul {
  list-style: none;
}

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

.supportDetail .no-resize >>> textarea {
  resize: none;
}

.supportDetail .fontSize20{
  font-size: 20px;
}

.supportDetail .colRed{
  color: red;
}

.supportDetail .submitBtn {
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

.supportDetail .submitBtn:hover {
  background-color: #00256c;
  color: #fff;
}
</style>
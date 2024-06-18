<template>
  <div class="faq">
    <h1>FAQ (자주 묻는 질문)</h1>
    <div>
      <ul class="faq-list">
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton1" :aria-expanded="faqContent1.toString()">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div v-if="faqContent1" class="faq-content">
            답변 내용 입니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton2" :aria-expanded="faqContent2.toString()">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div v-if="faqContent2" class="faq-content">
            답변 내용 입니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton3" :aria-expanded="faqContent3.toString()">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div v-if="faqContent3" class="faq-content">
            답변 내용 입니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton4" :aria-expanded="faqContent4.toString()">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div v-if="faqContent4" class="faq-content">
            답변 내용 입니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton5" :aria-expanded="faqContent5.toString()">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div v-if="faqContent5" class="faq-content">
            답변 내용 입니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton6" :aria-expanded="faqContent6.toString()">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div v-if="faqContent6" class="faq-content">
            답변 내용 입니다.
          </div>
        </li>
      </ul>
    </div>
    <router-link to="/support" class="supportBtn">1:1 문의하기</router-link>
  </div>
</template>

<script>
export default {
  name: `FAQ`,
  data() {
    return {
      faqContent1: false, // 초기에는 Content가 표시되지 않도록 false로 설정합니다.
      faqContent2: false,
      faqContent3: false,
      faqContent4: false,
      faqContent5: false,
      faqContent6: false
    };
  },
  methods: {
    faqButton1() {
      // faqButton 메서드는 faqContent 데이터를 토글합니다.
      this.faqContent1 = !this.faqContent1;
    },
    faqButton2() {
      this.faqContent2 = !this.faqContent2;
    },
    faqButton3() {
      this.faqContent3 = !this.faqContent3;
    },
    faqButton4() {
      this.faqContent4 = !this.faqContent4;
    },
    faqButton5() {
      this.faqContent5 = !this.faqContent5;
    },
    faqButton6() {
      this.faqContent6 = !this.faqContent6;
    }
  }
}
</script>

<style scoped>

ul {
  list-style: none;
}

.faq {
  max-width: 1280px;
  margin: 0 auto;
  padding: 65px 0 110px;
}

.faq h1 {
  font-weight: 400;
  font-size: 35px;
  color: #000;
  margin: 0 0 50px 0;
}

.faq .faq-list {
  padding : 0;
  //border-bottom: 1px solid #d9dbe1;
}

.faq .faq-item {
  border-bottom: 1px solid #d9dbe1;
}

.faq .faq-title {
  position: relative;
  display: flex;
  width: 100%;
  padding: 35px 60px;
  border: 0;
  background: url(@/assets/ico-expander.svg) no-repeat calc(100% - 20px) 50%;
  background-size: 24px 24px;
  font-size: 20px;
  line-height: 1.5;
  color: #000;
  text-align: left;
}

.faq .faq-title:hover {
  box-shadow: inset 0 0 0 1px #0064de;
}

.faq .faq-title[aria-expanded=true] {
  background-image: url(@/assets/ico-expander-active.svg);
  font-weight: 700;
}

.faq .ico-q{
  display: inline-block;
  width: 58px;
  margin-left: -56px;
  padding-left: 7px;
  text-align: center;
  font-weight: 700;
}

.faq .ico-q+span {
  width: calc(100% - 2.6rem);
  display: block;
}

.faq .faq-content{
  text-align: left;
  padding: 30px 54px;
  font-size: 16px;
  line-height: 1.58;
  color: #555;
  background-color: #f3f4f8;
}

.faq .supportBtn {
  display: block;
  width: 320px;
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

.faq .supportBtn:hover {
  background-color: #00256c;
  color: #fff;
}

</style>
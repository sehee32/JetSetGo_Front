<template>
  <div class="faq">
    <h1>FAQ (자주 묻는 질문)</h1>
    <div>
      <ul class="faq-list">
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton1" :aria-expanded="faqContent1.toString()">
              <span class="ico-q">Q</span>
              <span>예약했는데 항공원 구매는 어디에서 할 수 있나요?</span>
            </button>
          </div>
          <div v-if="faqContent1" class="faq-content">
            아래 방법을 통해 고객님의 예약에 대한 구매(결제)를 할 수 있습니다.
            <br><br>
            - 항공사를 통해 예약하였으나 홈페이지를 통한 구매(결제)가 불가한 경우, 서비스센터로 문의해 주세요.
            <br><br>
            - 여행사를 통해 예약하신 경우, 해당 여행사로 문의해 주세요.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton2" :aria-expanded="faqContent2.toString()">
              <span class="ico-q">Q</span>
              <span>항공권은 꼭 순서대로 사용해야 하나요?</span>
            </button>
          </div>
          <div v-if="faqContent2" class="faq-content">
            항공권은 반드시 항공권에 명시된 구간의 순서대로 사용해야 합니다.
            <br><br>
            단, 국내선 항공권의 경우 2구간 이내로 발권된 항공권에 한해 역순 사용이 허용되며 잔여 쿠폰은 재발행 또는 환불 처리합니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton3" :aria-expanded="faqContent3.toString()">
              <span class="ico-q">Q</span>
              <span>수하물이 파손되었는데 어떻게 해야 하나요?</span>
            </button>
          </div>
          <div v-if="faqContent3" class="faq-content">
            수하물이 파손되었을 경우, 수하물을 수취한 날로부터 7일 이내에 항공사에 신고하셔야 합니다.
            <br><br>
            여러 항공사를 이용한 경우 최종 운송 항공사로 문의하시기 바랍니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton4" :aria-expanded="faqContent4.toString()">
              <span class="ico-q">Q</span>
              <span>개인 휴대 전자 기기에 장착된 리튬 배터리를 가져갈 수 있나요?</span>
            </button>
          </div>
          <div v-if="faqContent4" class="faq-content">
            개인 휴대 전자기기에 장착된 리튬 배터리는 휴대 및 위탁 모두 가능합니다.
            <br><br>
            • 배터리 용량(개당) 별 제한 사항
            <br><br>
            - 100Wh(2g) 이하 : 1인 15개 제한 (휴대+위탁)
            <br><br>
            - 100Wh(2g) 초과 ~ 160Wh(8g) 이하 : 항공사 승인 필요
            단, 2g 초과 ~ 8g 이하 용량의 리튬 메탈/합금 배터리는 휴대용 의료 기기만 허용
            <br><br>
            - 160Wh(8g) 초과 : 운송 불가
            <br><br>
            * 항공사 승인 : 개인 사용 용도, 전원 OFF, 배터리가 서로 닿지 않도록 포장 등 안전 조치 적절성을 확인하는 절차
            <br><br><br>
            • 기타 제한 사항
            <br><br>
            - 배터리 분리가 불가한 헤어컬(고데기) : 운송 불가 (일본 출발편 한정)
            <br><br>
            - 리튬 배터리가 분리되지 않는 전동 휠, 스마트 가방 : 운송 불가
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton5" :aria-expanded="faqContent5.toString()">
              <span class="ico-q">Q</span>
              <span>전자담배 가져갈 수 있나요?</span>
            </button>
          </div>
          <div v-if="faqContent5" class="faq-content">
            리튬 배터리를 포함한 전자담배는 기내 휴대는 가능하나, 위탁 수하물로 운송은 불가합니다.
            <br><br>
            - 배터리 용량은 리튬금속/합금인 경우 2g, 리튬이온인 경우 100Wh 이하로 제한됩니다.
            <br><br>
            - 기내에서 충전은 불가하며, 기내 휴대 시 여분의 배터리는 서로 닿지 않도록 개별 포장해 주세요.
            <br><br>
            - 일부 국가에서는 현지 제한 규정에 따라 전자담배 관련 물품(기계, 용액 등)의 해외 반입을 전면 금지하고 있으니 여행지 국가의 전자담배 허용 여부를 사전에 확인하여 주세요.
            <br><br>
            아래 [운송 제한 물품]에서 반입이 제한되는 물품에 대해 추가 확인이 가능합니다.
          </div>
        </li>
        <li class="faq-item">
          <div>
            <button class="faq-title" @click="faqButton6" :aria-expanded="faqContent6.toString()">
              <span class="ico-q">Q</span>
              <span>보조(여분) 리튬 배터리 가져갈 수 있나요?</span>
            </button>
          </div>
          <div v-if="faqContent6" class="faq-content">
            개인 사용 용도의 보조(여분) 리튬 배터리는 제한적으로 기내 휴대 수하물로 운송 가능하나 위탁수하물로 운송은 불가합니다.
            <br><br>
            • 배터리 용량(개당) 별 제한 사항
            <br><br>
            - 100Wh(2g) 이하 : 1인 20개 제한, 6개 이상 항공사 승인 필요
            <br><br>
            - 100Wh(2g) 초과 ~ 160Wh(8g) 이하 : 항공사 승인 필요, 1인 2개 제한
            단, 2g 초과 ~ 8g 이하 용량의 리튬 메탈/합금 배터리는 ‘휴대용 의료 기기’용 만 허용
            <br><br>
            - 160Wh(8g) 초과 : 운송 불가
            <br><br>
            • 여분의 배터리들이 서로 닿지 않도록 개별 포장 필요하며, 배터리 용량이 표시되지 않았거나 확인이 불가한 경우 운송 불가(충전용 배터리 포함)
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
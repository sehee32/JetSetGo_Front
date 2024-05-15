<template>
  <div class="faq">
    <h1>FAQ</h1>
    <div>
      <ul class="faq-list">
        <li class="faq-item">
          <div>
            <button class="faq-title" aria-expanded="true">
              <span class="ico-q">Q</span>
              <span>무엇을 질문 할까요?</span>
            </button>
          </div>
          <div>
            답변 내용 입니다.
          </div>
        </li>
      </ul>
    </div>
    <router-link to="/support">1:1 문의하기</router-link>
  </div>
</template>

<script>
export default {
  name: `FAQ`
}
</script>

<style>

ul {
  list-style: none;
}

.faq {
  max-width: 1400px;
  margin: 0 auto;
  padding: 65px 0 110px;
}

.faq h1 {
  font-weight: 400;
  font-size: 35px;
  color: #000;
  margin: 0 0 10px 0;
}

.faq .faq-list {
  padding : 0;
  border-bottom: 1px solid #d9dbe1;
}

.faq .faq-item {
  border-top: 1px solid #d9dbe1;
}

.faq .faq-title {
  position: relative;
  display: flex;
  width: 100%;
  padding: 35px 60px;
  border: 0;
  background: url(https://www.koreanair.com/ico-expander.svg) no-repeat calc(100% - 20px) 50%;
  background-size: 24px 24px;
  font-size: 20px;
  line-height: 1.5;
  color: #000;
  text-align: left;
}

.faq .faq-title[aria-expanded=true] {
  background-image: url(https://www.koreanair.com/ico-expander-active.svg);
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

</style>
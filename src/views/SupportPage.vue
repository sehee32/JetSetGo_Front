<template>
  <div class="support">
    <h1>1:1 문의하기</h1>
    <div class="search">
      <div>
        <input type="text" class="searchInput" v-model="searchQuery" @keyup.enter="search" placeholder="검색어를 입력하세요"/>
        <button type="button" class="searchRm" v-if="searchQuery" @click="searchRm"></button> <!--x 버튼-->
      </div>
      <button type="button" class="searchBt" @click="search"></button> <!--검색 버튼-->
    </div>
    <div>
      <ul>
        <li>
        </li>
      </ul>
      <router-link to="/inquiry">문의하기</router-link>
    </div>

    <router-link to="/faq">fAQ</router-link>
    <div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SupportPage',
  data: function () {
    return {
      searchQuery: "", // 검색어를 저장하는 데이터
      xhr: ""
    }
  },
  methods: {
    async search() {// 검색어 백엔드로 전달하는 과정
      try {
        const response = await axios.post('/api/supportSearch',{search : this.searchQuery});
        console.log(response.data); // 서버로부터의 응답 확인
        // 성공적으로 데이터를 전송한 후에는 적절한 작업을 수행합니다.
      } catch (error) {
        console.error('Error:', error);
        // 오류 처리
      }
    },
    searchRm() {
      this.searchQuery = "";
    }
  }
}
</script>

<style>

ul {
  list-style: none;
}

.support {
  max-width: 1280px;
  margin: 0 auto;
  padding: 65px 0 110px;
}

.support h1 {
  font-weight: 400;
  font-size: 35px;
  color: #000;
  margin: 0 0 50px 0;
}

.support .search {
  max-width: 780px;
  margin: 0 auto;
  position: relative;
  text-align: left;
  display: flex;
//align-items: flex-end;
box-sizing: border-box;
}

.support .search div{
  width: 780px;
}

.support .searchInput{
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 52px;
  padding-left: 30px;
  padding-right: 92px;
  border-radius: 26px;
  background-color: #fff;
  box-shadow: 0 0 0 2px transparent;
  border: 1px solid #00256c;
  font-size: 18px;
  line-height: 1.56;
}

.support .searchInput:hover,
.support .searchInput:focus {
  outline: none;
  border: 1px solid transparent;
  box-shadow: 0 0 0 2px #0064de;
}

.support .searchRm{
  position: absolute;
  top: 7px;
  right: 50px;
  width: 36px;
  height: 36px;
  background: url(https://www.koreanair.com/ico-n-clear.svg) no-repeat 50% 50%;
  background-size: 24px 24px;
  cursor: pointer;
  border: 0;
}

.support .searchBt{
  position: absolute;
  top: 7px;
  right: 10px;
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent url(https://www.koreanair.com/search__button.svg) no-repeat center center;
  background-size: 24px 24px;
  cursor: pointer;
}

.support .searchRm:hover,
.support .searchBt:hover{
  outline: 0;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px #0064de;
}


</style>


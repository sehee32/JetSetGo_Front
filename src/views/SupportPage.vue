<template>
  <div class="support">
    <h1>1:1 문의하기</h1>
    <div class="search">
      <div>
        <input type="text" class="searchInput" v-model="searchQuery" @keyup.enter="searchText" placeholder="검색어를 입력하세요"/>
        <button type="button" class="searchRm" v-if="searchQuery" @click="searchRm"></button> <!--x 버튼-->
      </div>
      <button type="button" class="searchBt" @click="searchText"></button> <!--검색 버튼-->
      <router-link to="/inquiry" class="inquiryBtn">문의하기</router-link>
    </div>
    <div>
      <ul class="categoryList">
        <li v-for="categorySelect in categories" :key="categorySelect.value">
          <button :class="{ active: category === categorySelect.value }" type="button" @click="setCategory(categorySelect.value)">{{ categorySelect.name }}</button>
        </li>
      </ul>
    </div>
    <div class="page-size-selector">
      <select id="pageSize" v-model="itemsPerPage">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}줄 보기</option>
      </select>
    </div>
    <div>
      <div v-if="searchResults.length > 0">
        <ul>
          <li>
            <span>번호</span>
            <span>문의번호</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
            <span>답변</span>
            <span>공개여부</span>
          </li>
          <li v-for="result in paginatedData" :key="result.supportNum">
            <span>{{ result.num }}</span>
            <span>{{ result.supportNum }}</span>
            <span>{{ result.title }}</span>
            <span>{{ result.author }}</span>
            <span>{{ result.createdDate }}</span>
            <span>{{ result.answer }}</span>
            <span>{{ result.isPublic }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        검색 결과가 없습니다.
      </div>
    </div>
    <div>
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
    <router-link to="/faq" class="faqBtn">FAQ</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SupportPage',
  data: function () {
    return {
      searchQuery: '', // 검색어를 저장하는 데이터
      category: 'total', // 카테고리 값 저장
      categories: [
        { name: '전체', value: 'total' },
        { name: '항공권', value: 'ticket' },
        { name: '수하물', value: 'baggage' },
        { name: 'etc', value: 'etc' }
      ],
      searchResults: [],
      currentPage: 1,
      itemsPerPage: 5,
      pageSizes: [5, 10, 30]
    }
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.searchResults.slice(start, end);
    },
    totalPages() { // 전체 페이지
      return Math.ceil(this.searchResults.length / this.itemsPerPage);
    }
  },
  methods: {
    async search() {// 검색어 백엔드로 전달하는 과정
      try {
        const response = await axios.post('/api/supportSearch',{search : this.searchQuery, category : this.category});
        console.log(response.data); // 서버로부터의 응답 확인
        this.searchResults = response.data;// 응답 데이터를 results에 저장
      } catch (error) {
        console.error('Error:', error);
        // 오류 처리
      }
    },
    searchRm() {
      this.searchQuery = '';
    },
    searchText() {
      this.category = 'total';
      this.search();
    },
    setCategory(categoryValue) {
      this.category = categoryValue; // 카테고리 값을 설정
      this.searchQuery = '';
      console.log(this.category);
      this.search();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.search(); // 컴포넌트가 마운트될 때 검색 메서드 실행
  }
}
</script>

<style scoped>

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
  max-width: 850px;
  margin: 0 auto;
  position: relative;
  text-align: left;
  display: flex;
//align-items: flex-end;
box-sizing: border-box;
}

.support .search div{
  width: 850px;
}

.support .searchInput{
  box-sizing: border-box;
  display: block;
  width: 550px;
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
  right: 350px;
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
  right: 310px;
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

.support .inquiryBtn {
  display: inline-block;
  width: 250px;
  min-width: 34px;
  padding: 7px 0;
 /* position: absolute;
  top: -5px;
  right: -315px;*/
  font-size: 18px;
  font-weight: 700;
  line-height: 2;
  border: 1px solid #00256c;
  border-radius: 10px;
  background-color: #00256c;
  color: #fff;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}

.support .inquiryBtn:hover {
  background-color: #fff;
  color: #00256c;
}

.support .categoryList{
  flex-wrap: wrap;
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.support .categoryList li{
  padding: 4px;
}

.support .categoryList li button{
  padding: 11px 16px 13px;
  font-size: 16px;
  min-width: 140px;
  text-align: center;
  display: block;
  border: solid 1px #d9dbe1;
  border-radius: 24px;
  background-color: #fff;
  color: #00256c;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}

.support .categoryList li button.active {
  background-color: #00256c;
  border-color: #00256c;
  color: #fff;
  font-weight: 700;
}



.support .faqBtn {
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

.support .faqBtn:hover {
  background-color: #00256c;
  color: #fff;
}




</style>


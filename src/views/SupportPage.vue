<template>
  <div class="support">
    <h1>1:1 문의하기</h1>
    <div class="search">
      <div>
        <input type="text" class="searchInput" v-model="searchQueryText" @keyup.enter="searchText" placeholder="검색어를 입력하세요"/>
        <button type="button" class="searchRm" v-if="searchQueryText" @click="searchRm"></button> <!--x 버튼-->
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
    <div>
      <v-data-table-server
          :items-per-page="itemsPerPage"
          :items-per-page-text="'항목 갯수'"
          :items-per-page-options="[5, 10, 30]"
          :headers="headers"
          :items="serverItems"
          :items-length="searchResults.length"
          :loading="loading"
          :search="searchQuery"
          item-value="num"
          no-data-text="검색 결과가 없습니다."
          @update:options="search"
          @click:row="showDetail">
      </v-data-table-server>
      <!-- 설명 : 페이지당항목수 테이블 헤더 현재페이지항목 전체항목수 데이터로딩상태 검색어 고유식별자 메서드-->
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
      searchQueryText:'', // 검색어
      category: 'total', // 카테고리 값 저장
      categories: [
        { name: '전체', value: 'total' },
        { name: '항공권', value: 'ticket' },
        { name: '수하물', value: 'baggage' },
        { name: 'etc', value: 'etc' }
      ],
      searchResults: [], // 검색한 값들
      serverItems: [], // 현재 페이지 값들
      currentPage: 1, // 현재 페이지
      itemsPerPage: 5, // 줄 갯수
      headers: [
        { title: '번호', align: 'start', key: 'num', sortable: false }, //제목 정렬방향 키 정렬가능여부
        { title: '문의번호', key: 'supportNum', align: 'end', sortable: false },
        { title: '제목', key: 'title', align: 'end' },
        { title: '작성자', key: 'author', align: 'end' , sortable: false},
        { title: '작성일', key: 'createdDate', align: 'end' },
        { title: '답변', key: 'answer', align: 'end' , sortable: false},
        { title: '공개여부', key: 'public', align: 'end' , sortable: false},
      ],
      loading: false,
    }
  },
  methods: {
    async search({ page, itemsPerPage, sortBy}) {
      this.loading = true;
      try {
        const response = await axios.post('/api/supportSearch', {
          search: this.searchQuery,
          category: this.category
        });
        console.log(response.data); // 서버로부터의 응답 확인
        this.searchResults = response.data;// 응답 데이터를 results에 저장
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage
          const items = this.searchResults.slice()
          this.currentPage = page;
          this.itemsPerPage = itemsPerPage;

          if (sortBy.length) {
            const sortKey = sortBy[0].key;
            const sortOrder = sortBy[0].order;
            items.sort((a, b) => {
              const aValue = a[sortKey];
              const bValue = b[sortKey];

              if (sortOrder === 'desc') {
                if (aValue > bValue) return -1;
                if (aValue < bValue) return 1;
                return 0;
              } else {
                if (aValue > bValue) return 1;
                if (aValue < bValue) return -1;
                return 0;
              }
            });
          }

          this.serverItems = items.slice(start, end);
        }, 500)
      } catch (error) {
        console.error('Error:', error);
        // 오류 처리
      } finally {
        this.loading = false;
      }
    },
    searchRm() {
      this.searchQuery = '';
      this.searchQueryText = '';
    },
    searchText() {
      this.searchQuery = this.searchQueryText;
      this.category = 'total';
      this.search({
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        sortBy: []
      });
    },
    setCategory(categoryValue) {
      this.category = categoryValue; // 카테고리 값을 설정
      this.searchQuery = '';
      console.log(this.category);
      this.search({
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        sortBy: []
      });
    },
    showDetail(item) {
      // 특정 행 클릭 시 호출되는 메소드 우선은 문의하기 페이지에 연결 변경 예정
      this.$router.push({ name: 'Inquiry', params: { supportNum: item.supportNum } });
    }
  },
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
  margin: 0 auto 30px;
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
  background: url(@/assets/ico-n-clear.svg) no-repeat 50% 50%;
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
  background: transparent url(@/assets/search__button.svg) no-repeat center center;
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

<template>
  <div class="support">
    <h1>1:1 문의하기</h1>
    <!-- 검색하기 -->
    <div class="search">
      <div>
        <input type="text" class="searchInput" v-model="searchQueryText" @keyup.enter="searchText" placeholder="검색어를 입력하세요"/>
        <button type="button" class="searchRm" v-if="searchQueryText" @click="searchRm"></button> <!--x 버튼-->
      </div>
      <button type="button" class="searchBt" @click="searchText"></button> <!--검색 버튼-->
      <router-link to="/supportInquiry" class="inquiryBtn">문의하기</router-link> <!--문의하기 버튼-->
    </div>
    <!-- 카테고리 -->
    <div>
      <ul class="categoryList">
        <li v-for="categorySelect in categories" :key="categorySelect.value">
          <button :class="{ active: category === categorySelect.value }" type="button" @click="setCategory(categorySelect.value)">{{ categorySelect.name }}</button>
        </li>
      </ul>
    </div>
    <!-- 목록 -->
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
          @update:options=search
          @click:row=showDetail>
        <template v-slot:[`item.index`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.answer`]="{ item }">
          <span>{{ item.answer ? '완료' : '확인중' }}</span>
        </template>
        <template v-slot:[`item.public_Status`]="{ item }">
          <v-icon>{{ item.public_Status ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </template>
      </v-data-table-server>
      <!-- 설명 : 페이지당항목수 테이블 헤더 현재페이지항목 전체항목수 데이터로딩상태 검색어 고유식별자 메서드-->
    </div>
    <!-- FAQ버튼 -->
    <router-link to="/faq" class="faqBtn">FAQ</router-link>
  </div>
  <!-- 비밀번호 입력 폼 -->
  <v-dialog v-model="passwordDialog" max-width="500px">
    <v-card>
      <v-card-title>비밀번호 입력</v-card-title>
      <v-card-text>
        <v-text-field v-model="password" label="비밀번호" type="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submitPassword">확인</v-btn>
        <v-btn @click="closePasswordDialog">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
        { title: '번호', align: 'start', value: 'index' , sortable: false},
        { title: '문의번호', key: 'support_Id', align: 'end', sortable: false }, //제목 키 정렬방향 정렬가능여부
        { title: '제목', key: 'title', align: 'end' },
        { title: '작성자', key: 'writer_Name', align: 'end' , sortable: false},
        { title: '작성일', key: 'created_Date', align: 'end' },
        { title: '답변', key: 'answer', align: 'end' , sortable: false},
        { title: '공개여부', key: 'public_Status', align: 'end' , sortable: false},
      ],
      loading: false,
      passwordDialog: false, // 비밀번호 입력 다이얼로그 표시 여부
      password: '', // 사용자가 입력한 비밀번호
      selectedSupportNum: null // 선택된 문의번호
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
    showDetail(event, { item }) {
      if (item.public_Status) {
        this.goDetail(item.support_Id)
      }else{
        this.openPasswordDialog(item.support_Id)
      }
    },
    goDetail(id) {
      // ID 값을 localStorage에 저장
      localStorage.setItem('supportId', id);
      // MyPageReservationDetail로 이동
      this.$router.push({ name: 'SupportDetail' });
    },
    openPasswordDialog(support_Id) {
      this.selectedSupportNum = support_Id;
      this.passwordDialog = true;
    },
    // 비밀번호 입력 확인
    async submitPassword() {
      // 비밀번호 확인 로직
      try {
        const response = await axios.post('/api/supportCheckPassword', {
          supportId: this.selectedSupportNum,
          password: this.password
        });
        if(response.data){
          this.goDetail(this.selectedSupportNum)
        }else{
          alert('비밀번호가 일치하지 않습니다.');
        }
      } catch (error) {
        console.error('오류 발생:', error);
        alert('비밀번호 확인 중 오류가 발생했습니다.');

      } finally {
        this.closePasswordDialog();
      }
    },

    // 비밀번호 입력 다이얼로그 닫기
    closePasswordDialog() {
      this.passwordDialog = false;
      this.password = '';
      this.selectedSupportNum = null;
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

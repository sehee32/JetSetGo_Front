<template>
  <div class="jetSetGoBody">
    <h1>{{ msg }}</h1>
    <p>
      예매하기
    </p>
    <div class="box-container">
      <div class="box">운항정보</div>
      <div class="box">출발도시 도착도시 가는날 오는날 인원수 검색</div>
      <div class="box">인기 여행지</div>
    </div>
    <ul>
      <li></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'JetSetGoBody',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jetSetGoBody {

}

.box-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.box {
  width: 1000px;
  height: 100px;
  width: 80%;
  background-color: #CEE3F6;
  margin: 0 auto; /* 가운데 정렬*/
}
</style>
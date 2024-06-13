<template>
  <div class="home">
    <br><br>
    <h2> JetSetGo에서 여행을 떠나보세요</h2>
    <v-container><BookingPage /></v-container>
    <JetSetGoBody></JetSetGoBody>
  </div>
</template>

<script>
// @ is an alias to /src
import BookingPage from "@/views/BookingPage";
import JetSetGoBody from "@/components/JetSetGoBody";

export default {
  name: 'JetSetGoView',
  components: {
    BookingPage,
    JetSetGoBody
  }
}
</script>

<template>
  <div class="home">
    <br><br>
    <h2> JetSetGo에서 여행을 떠나보세요</h2>
    <v-container><BookingPage /></v-container>
    <AboutPage />
    <JetSetGoBody></JetSetGoBody>
  </div>
</template>

<script>
// @ is an alias to /src
import BookingPage from "@/components/JetSetGoView/BookingPage";
import JetSetGoBody from "@/components/JetSetGoBody";
import AboutPage from "@/components/JetSetGoView/AboutPage.vue";

export default {
  name: 'JetSetGoView',
  components: {
    AboutPage,
    BookingPage,
    JetSetGoBody
  }
}
</script>

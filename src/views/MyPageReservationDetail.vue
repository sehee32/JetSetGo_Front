<template>
  <ReservaionDetails />
  <ReservaionBtns />

</template>

<script>
import ReservaionDetails from "@/components/MyPageReservaionDetail.vue/ReservaionDetails.vue";
import ReservaionBtns from "@/components/MyPageReservaionDetail.vue/ReservaionBtns.vue";

export default {
  name: "MyPageReservationDetail",
  components: {
    ReservaionDetails,
    ReservaionBtns
  },
  mounted() {

  }
}
</script>


<style scoped>


</style>
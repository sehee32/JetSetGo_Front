<template>
  <ReservaionDetails v-if="!isCancelMode && !isCancelSearchMode" />
  <ReservationPayment v-if="!isCancelMode && !isCancelSearchMode" />
  <ReservationBtns @activateCancel="activateCancel" v-if="!isCancelMode && !isCancelSearchMode" />
  <ReservationCancel @deactivateCancel="deactivateCancel" @activateCancelSearch="activateCancelSearch" v-if="isCancelMode" />
  <ReservationCancelSearch @deactivateCancelSearch="deactivateCancelSearch" v-if="isCancelSearchMode" />
</template>

<script>
import ReservaionDetails from "@/components/MyPageReservationDetail.vue/ReservationDetails.vue";
import ReservationBtns from "@/components/MyPageReservationDetail.vue/ReservationBtns.vue";
import ReservationPayment from "@/components/MyPageReservationDetail.vue/ReservationPayment.vue";
import ReservationCancel from "@/components/MyPageReservationDetail.vue/ReservationCancel.vue";
import ReservationCancelSearch from "@/components/MyPageReservationDetail.vue/ReservationCancelSearch.vue";

export default {
  name: "MyPageReservationDetail",
  components: {
    ReservaionDetails,
    ReservationPayment,
    ReservationBtns,
    ReservationCancel,
    ReservationCancelSearch
  },
  data() {
    return {
      isCancelMode: false, // 취소 모드 상태 관리
      isCancelSearchMode: false // 취소 검색 모드 상태 관리
    };
  },
  methods: {
    activateCancel() {
      this.isCancelMode = true; // 취소 모드 활성화
    },
    deactivateCancel() {
      this.isCancelMode = false; // 취소 모드 비활성화
    },
    activateCancelSearch() {
      this.isCancelMode = false; // 취소 모드 비활성화
      this.isCancelSearchMode = true; // 취소 검색 모드 활성화
    },
    deactivateCancelSearch() {
      this.isCancelSearchMode = false; // 취소 검색 모드 비활성화
    },
  },
  beforeUnmount() {
    // 컴포넌트가 사라질 때 localStorage에서 ID 값을 삭제할 수 있습니다.
    localStorage.removeItem('reservationId');
  }
}
</script>


<style scoped>


</style>
<template>
  <div class="reservationList">
    <h1>예약 목록</h1>
    <v-app>
      <v-main>
        <v-container class="costom-container">
          <div v-for="(item, index) in reservations" :key="index" class="costom-box">
            <v-checkbox
                v-model="item.checked"
                :label="item.label"
            ></v-checkbox>
            <v-alert v-if="!item.valid" type="error" dismissible>
              {{ item.errorMessage }}
            </v-alert>
          </div>

        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "MyPageReservationList",
  components: {},
  data() {
    return {
      reservations: [
        { label: 'Checkbox 1', checked: false, valid: true, errorMessage: 'This is required' },
        { label: 'Checkbox 2', checked: false, valid: true, errorMessage: 'This is required' },
        // Add more items as needed
      ],
    };
  },
}
</script>


<style scoped>
.reservationList{
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 70px;
}

.reservationList .costom-container{
  max-width: 1280px;
  padding: 0;
}

.reservationList h1{
  text-align: left;
  margin-bottom: 20px;
  color: #00256c;
}

.profileEdit .profileList .costom-box{
  position: relative;
  text-align: left;
  padding: 40px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

</style>
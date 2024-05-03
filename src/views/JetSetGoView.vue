<template>
  <div class="home">
    <JetSetGoBody msg="JetSetGo에서 여행을 떠나보세요"/>
  </div>
</template>

<script>
// @ is an alias to /src
import JetSetGoBody from "@/components/JetSetGoBody";

export default {
  name: 'JetSetGoView',
  components: {
    JetSetGoBody
  }
}
</script>

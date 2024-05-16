<template>
<nav>
<router-link to="/signup">회원가입</router-link>
</nav>
<router-view/>
</template>

<script>
export default {
    name: 'LoginPage',
    components: {},
    data() {
        return {
            sampleData: ''
         };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>
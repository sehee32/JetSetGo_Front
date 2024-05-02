<template>
<nav>
<router-link to="/signup">SignUp</router-link>
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
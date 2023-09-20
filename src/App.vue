<!-- JAVASCRIPT & VUE.JS -->
<script>
import AppHeader from './components/AppHeader.vue';

export default {
    components: {
        AppHeader,
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <AppHeader />
    <router-view></router-view>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use './styles/generals.scss' as *;
</style>
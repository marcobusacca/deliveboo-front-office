<!-- JAVASCRIPT & VUE.JS -->
<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
    components: {
        AppHeader,
        AppFooter,
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <AppHeader />
    <main>
        <router-view></router-view>
    </main>
    <AppFooter />
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use './styles/generals.scss' as *;
</style>
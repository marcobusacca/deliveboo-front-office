<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from './store';

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppLoader from './components/AppLoader.vue';

export default {
    components: {
        AppHeader,
        AppFooter,
        AppLoader,
    },
    data() {
        return {
            store,
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <AppHeader />
    <main>
        <AppLoader v-if="store.loading" />
        <router-view></router-view>
    </main>
    <AppFooter />
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use './styles/generals.scss' as *;

main {
    padding-top: 80px;
}
</style>
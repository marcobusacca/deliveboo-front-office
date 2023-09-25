<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from './store';

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
    components: {
        AppHeader,
        AppFooter,
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
        <router-view></router-view>
    </main>
    <AppFooter />
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use './styles/generals.scss' as *;

@media screen and (min-width: 992px) {
    main {
        padding-top: 80px;
    }
}
</style>
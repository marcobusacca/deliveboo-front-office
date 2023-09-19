<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
import AppMain from '../components/AppMain.vue';
import AppFooter from '../components/AppFooter.vue'

export default {
    components: {
        AppMain,
        AppFooter
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
    <AppMain />
    <AppFooter />
</template>
  
  

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
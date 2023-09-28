<!-- JAVASCRIPT & VUE.JS -->
<script>
import CheckForm from '../components/CheckForm.vue';
import { store } from '../store';
export default {
    components: {
        CheckForm,
    },
    data() {
        return {
            store,
        }
    },
    mounted() {
        this.setLoadingFalse();
    },
    methods: {
        setLoadingFalse() {
            this.store.loading = false;
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div class="container mb-5">
        <div class="row">
            <CheckForm />
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
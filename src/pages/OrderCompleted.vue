<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
export default {
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
<template>
    <div class="container-fluid deliveboo-background">
        <div class="container error-container" v-if="!store.loading">
            <div class="row">
                <!-- NOT FOUND TITLE -->
                <div class="col-12 text-center py-5">
                    <h1 class="error-title text-orange fw-bold my-3">404</h1>
                    <h2 class="fs-4 fw-bold my-3">PAGE NOT FOUND</h2>
                    <p class="mt-5">
                        Questa non è la pagina che stai cercando!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

// IMPORTO FONT MONTSERRAT
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

// ERROR PAGE
.error-container {
    font-family: 'Montserrat', sans-serif;
    padding: 150px 0;

    .error-title {
        font-size: 70px;
    }
}

// END ERROR PAGE
</style>
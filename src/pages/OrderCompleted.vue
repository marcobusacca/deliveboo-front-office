<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
export default {
    data() {
        return {
            store,
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <div class="container-fluid deliveboo-background" v-if="!store.loading">
        <div class="container order-container">
            <div class="row">
                <!-- ORDER COMPLETED TITLE -->
                <div class="col-12">
                    <div class="card shadow text-center py-5">
                        <i class="order-icon text-orange fa-solid fa-circle-check py-3"></i>
                        <h1 class="order-title text-orange fw-bold p-4">Ordine effettuato con successo!</h1>
                        <h2 class="order-sub-title p-3">Grazie per aver effettuato un ordine con noi, stiamo arrivando!</h2>
                        <div class="pt-3">
                            <router-link :to="{ name: 'home' }"
                                class="btn btn-dark deliveboo-orange text-white border-0 mt-2">Torna alla
                                home</router-link>
                        </div>
                    </div>
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

// ORDER COMPLETED PAGE

.order-container {
    font-family: 'Montserrat', sans-serif;
    padding: 50px 0;

    .order-icon {
        font-size: 100px;
    }

    .order-title {
        font-size: 25px;
    }

    .order-sub-title {
        font-size: 20px;
    }
}

// END ORDER COMPLETED PAGE



/********** MEDIAQUERY **********/

//TABLET
@media screen and (min-width: 768px) {}

// DESKTOP
@media screen and (min-width: 992px) {

    // ORDER COMPLETED PAGE

    .order-container {

        .order-title {
            font-size: 50px;
        }

        .order-sub-title {
            font-size: 25px;
        }
    }

    // END ORDER COMPLETED PAGE
}
</style>
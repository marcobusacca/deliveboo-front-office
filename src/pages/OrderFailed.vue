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
                <!-- ORDER FAILED TITLE -->
                <div class="col-12">
                    <div class="card shadow text-center py-5">
                        <i class="order-icon text-danger fa-solid fa-circle-xmark py-3"></i>
                        <h1 class="order-title text-danger fw-bold p-4">Transazione negata</h1>
                        <p class="fs-5 p-2">
                            Ci dispiace, ma sembra che i dati di pagamento forniti siano stati rifiutati. Per favore,
                            controlla e correggi le informazioni di pagamento e riprova.
                        </p>
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

// ORDER FAILED PAGE

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

// END ORDER FAILED PAGE



/********** MEDIAQUERY **********/

//TABLET
@media screen and (min-width: 768px) {}

// DESKTOP
@media screen and (min-width: 992px) {

    // ORDER FAILED PAGE

    .order-container {

        .order-title {
            font-size: 50px;
        }

        .order-sub-title {
            font-size: 25px;
        }
    }

    // END ORDER FAILED PAGE
}
</style>
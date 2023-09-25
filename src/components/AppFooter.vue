<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            types: [], // Inizializza un array vuoto per contenere le tipologie
        }
    },
    mounted() {
        // Chiamata alla funzione per ottenere le tipologie dei ristoranti
        this.getRestaurantTypes();
    },
    methods: {
        getRestaurantTypes() {
            axios.get(`${store.baseUrl}/api/types`).then((response) => {
                this.types = response.data.results;
            })
        },
    }
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <footer>
        <!-- FOOTER FIRST CONTAINER -->
        <div class="container px-3 py-5">
            <div class="row">
                <!-- ABOUT US COLUMN -->
                <div class="col-12 col-md-4">
                    <div
                        class="content py-3 d-flex justify-content-center justify-content-md-center text-center text-md-start">
                        <ul class="list-unstyled mb-0">
                            <li style="letter-spacing: 2px; color: #FF8100;"><strong>About Us</strong></li>
                            <li class="mt-3">
                                <a href="/about-us" class="text-decoration-none" style="color: #4f4f4f;">Chi siamo</a>
                            </li>
                            <li class="">
                                <a href="/" class="text-decoration-none" style="color: #4f4f4f;">Visualizza tutti i
                                    risoranti</a>
                            </li>
                            <li class="">
                                <a href="http://127.0.0.1:8000" class="text-decoration-none" style="color: #4f4f4f;">Lavora
                                    con noi</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- RESTAURANTS TYPES COLUMN -->
                <div class="col-12 col-md-4">
                    <div
                        class="content py-3 d-flex justify-content-center justify-content-md-center text-center text-md-start">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-3" style="letter-spacing: 2px; color: #FF8100;"><strong>Ristoranti</strong></li>
                            <a class="text-decoration-none d-block mb-1" href="/" v-for="(type, index) in types"
                                :key="index" style="color: #4f4f4f">
                                {{ type.name }}
                            </a>
                        </ul>
                    </div>
                </div>
                <!-- CITIES COLUMN -->
                <div class="col-12 col-md-4">
                    <div
                        class="content py-3 d-flex justify-content-center justify-content-md-center text-center text-md-start">
                        <ul class="list-unstyled mb-0">
                            <li style="letter-spacing: 2px; color: #FF8100;"><strong>Città</strong></li>
                            <li class="mt-3 ">
                                <a href="/" class="text-decoration-none" style="color: #4f4f4f;">Milano</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- FOOTER SECOND CONTAINER -->
        <div class="container-fluid bg-white">
            <div class="container py-5">
                <div class="row justify-content-between">
                    <!-- DOWNLOAD APP LINK -->
                    <div class="col-12 col-md-6">
                        <div class="text-center text-md-start">
                            <span style="color: #FF8100;"><strong>Scarica le nostre app e seguici</strong></span>
                            <div class="container-google-apple d-flex justify-content-center justify-content-md-start">
                                <img src="../assets/goo-app.png" class="google-apple">
                            </div>
                        </div>
                    </div>
                    <!-- SOCIAL LINK -->
                    <div class="col-12 col-md-6">
                        <div class="container-seguici text-center text-md-end">
                            <span style="color: #FF8100;"><strong>Seguici</strong></span>
                            <div class="container-loghi-social d-flex justify-content-center justify-content-md-end">
                                <a href="/"><img src="../assets/loghi-social.png" class="img-fluid"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- FOOTER THIRD CONTAINER -->
        <div class="container-fluid bg-grey">
            <div class="container py-5">
                <div class="row justify-content-between">
                    <!-- COMPANY VAT CODE -->
                    <div class="col-12 col-md-6">
                        <div class="text-iva text-center text-md-start py-2">
                            <span>Just Eat Italy S.r.l. - P.IVA 02392740932</span>
                        </div>
                    </div>
                    <!-- COMPANY PAYMENT METHODS -->
                    <div class="col-12 col-md-6">
                        <div class="container-payments py-2">
                            <ul
                                class="list-group list-group-horizontal list-unstyled d-flex justify-content-center justify-content-md-end">
                                <li class="text-lg-end px-2 mb-2">
                                    <a href="/">
                                        <img src="../assets/paypal.png" class="py-2 paypal-logo">
                                    </a>
                                </li>
                                <li class="text-lg-end px-2 mb-2">
                                    <a href="/">
                                        <img src="../assets/visa.png" class="visa-logo">
                                    </a>
                                </li>
                                <li class="text-lg-end mb-2">
                                    <a href="/">
                                        <img src="../assets/mastercard.png" class="master-logo py-2">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

footer {
    background-color: rgb(200, 208, 216);
}

.google-apple {
    width: 150px;
}

.visa-logo {
    width: 40px;
}

.paypal-logo {
    width: 70px;
}

.master-logo {
    width: 70px;
}

@media (min-width: 992px) {
    .google-apple {
        padding-top: 8px;
        padding-left: 36px;
        transform: scale(2.0); // Aumenta la dimensione dell'immagine del 150%
        transition: transform 0.3s ease; // Aggiunge una transizione fluida
    }
}
</style>
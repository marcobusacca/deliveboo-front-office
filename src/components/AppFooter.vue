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
        <div class="container py-5">
            <div class="row">
                <div class="col-12 col-md-4">
                    <div class="content d-flex justify-content-center">
                        <ul class="list-unstyled mb-0">
                            <p class="mb-3" style="letter-spacing: 2px; color: #7f4722;">ABOUT US</p>
                            <li class="mb-1">
                                <a href="#!" class="text-decoration-none" style="color: #4f4f4f;">Chi siamo</a>
                            </li>
                            <li class="mb-1">
                                <a href="#!" class="text-decoration-none" style="color: #4f4f4f;">Visualizza tutti i risoranti</a>
                            </li>
                            <li class="mb-1">
                                <a href="#!" class="text-decoration-none" style="color: #4f4f4f;">Lavora con noi</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="content d-flex justify-content-center">
                        <ul class="list-unstyled mb-0">
                            <p class="mb-3" style="letter-spacing: 2px; color: #7f4722;">RISTORANTI</p>
                            <a class="text-decoration-none" href="#">
                                <li v-for="(type, index) in types" :key="index" class="mb-1" style="color: #4f4f4f">{{ type.name }}</li>
                            </a>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="content d-flex justify-content-center">
                        <ul class="list-unstyled mb-0">
                            <p class="mb-3" style="letter-spacing: 2px; color: #7f4722;">CITTA'</p>
                            <li class="mb-1">
                                <a href="#!" class="text-decoration-none" style="color: #4f4f4f;">Milano</a>
                            </li>
                        </ul>
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
footer{
    background-color: rgb(200, 208, 216);
}
</style>
<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            store,
            types: []
        }
    },
    created() {
        this.getRestaurantTypes();
    },
    methods: {
        getRestaurantTypes() {
            axios.get(`${store.baseUrl}/api/types`).then((response) => {
                this.types = response.data.results;
            })
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <main>
        <div class="container-fluid size-container">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 d-flex justify-content-center align-items-center mt-4">
                    <div class="search-bar rounded d-flex justify-content-center align-items-center">
                        <div class="search-image">
                            <img src="../assets/hamburger.png" alt="logo-hamburger">
                        </div>
                        <div class="input-group rounded-pill p-2">
                            <input type="text" class="form-control rounded-pill border-0"
                                placeholder="Cerca il tuo ristorante...">
                            <button class="btn search-button btn-success rounded-pill" type="submit">Vai</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-5">
                    <div class="title">
                        <h3 class="text-center fw-bold font-size-15">
                            Le cucine più richieste
                        </h3>
                    </div>
                </div>
                <div class="col-12 d-flex flex-row justify-content-center flex-wrap">
                    <div class="card border-0 mx-4 my-3 card-size" v-for="(type, index) in types" :key="index">
                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="card-img-top" alt="logo">
                        <div class="card-body bg-orange">
                            <h6 class="card-text text-center bg-white">{{ type.name }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.card-size {
    width: 12rem;
}

.size-container {
    height: 100vh;
    background-image: url('../assets/bg-homepage.jpg');
    background-size: cover;
}

.bg-orange {
    background-color: orange;

    .bg-white {
        background-color: white;
        border-radius: 10px;
    }
}

.search-bar {
    position: relative;
    background-color: green;
    height: 140px;
    width: 60%;
    padding-right: 250px;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.912);

    .search-image {
        position: absolute;
        left: 70%;
        bottom: 5%;

        img {
            width: 100%;
        }
    }
}

.input-group {
    margin-left: 50px;
    width: 500px;
    border: 15px solid white;
    background-color: white;
}

.input-group input {
    border: none;
}

.search-button {
    background-color: green;
    color: white;
    cursor: pointer;
    border: none;
}
</style>
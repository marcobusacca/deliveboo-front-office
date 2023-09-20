<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            currentSlideIndex: 0,
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
        },
        nextSlide() {
            if (this.currentSlideIndex < this.types.length - 1) {
                this.currentSlideIndex++;
            } else {
                this.currentSlideIndex = 0;
            }
        },
        prevSlide() {
            if (this.currentSlideIndex > 0) {
                this.currentSlideIndex--;
            } else {
                this.currentSlideIndex = this.types.length - 1;
            }
        }
    },
}
</script>

<!-- TEMPLATE HTML -->

<template>
    <main>
        <div class="container-fluid size-container">
            <div class="row justify-content-center align-items-center py-5 h-100">
                <div class="col-12 mt-5 d-flex justify-content-center align-items-center">
                    <div class="search-bar rounded d-flex justify-content-center align-items-center">
                        <div class="search-image">
                            <img src="../assets/hamburger.png" alt="logo-hamburger">
                        </div>
                        <div class="input-group rounded-pill p-2">
                            <input type="text" class="form-control rounded-pill border-0 p-2"
                                placeholder="Cerca il tuo ristorante...">
                            <button class="btn search-button btn-success rounded-pill" type="submit">Vai</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mt-5">
                    <div class="title">
                        <h3 class="text-center fw-bold font-size-15">
                            Le cucine più richieste
                        </h3>
                    </div>
                </div>
            </div>
            <!-- <div class="row justify-content-center">
                <div class="col-md-2 col-12 d-flex flex-column justify-content-center align-items-center"
                    v-for="(type, index) in types" :key="index">
                    <div class="card border-0 my-3 card-size">
                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="card-img-top" alt="logo">
                        <div class="card-body bg-orange">
                            <h6 class="card-text text-center bg-white">{{ type.name }}</h6>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="row justify-content-center">
                <div class="card w-75 px-0">
                    <div class="col-12 d-flex">
                        <div class="col-4 bg-left">

                        </div>

                        <div class="col-8 col-image">
                            <div class="buttons w-100">
                                <div class="button-next-prev d-flex justify-content-between">
                                    <button @click="prevSlide" class="btn">
                                        <i class="fa-solid fa-angle-left fa-xl"></i>
                                    </button>

                                    <button @click="nextSlide" class="btn">
                                        <i class="fa-solid fa-chevron-right fa-xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-for="(type, index) in types" :key="index">
                                <div class="col-12 d-flex flex-column justify-content-center align-items-center"
                                    v-if="index === currentSlideIndex">
                                    <div class="border-0">
                                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="img-fluid"
                                            alt="logo">
                                        <!-- <div class="card-body bg-orange">
                                            <h6 class="card-text text-center bg-white">{{ type.name }}</h6>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<!-- <div class="d-flex justify-content-end align-items-center">
    <button @click="prevSlide">
        
    </button>
</div>
<div class="d-flex justify-content-center align-items-center">
    <div v-for="(type, index) in types" :key="index">
        <div class="col-12 d-flex flex-column justify-content-center align-items-center"
            v-if="index === currentSlideIndex">
            <div class="card border-0 my-3 card-size">
                <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="card-img-top"
                    alt="logo">
                <div class="card-body bg-orange">
                    <h6 class="card-text text-center bg-white">{{ type.name }}</h6>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="d-flex justify-content-center align-items-center">
    <button @click="nextSlide">Next</button>
</div> -->

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.bg-left {
    width: 100%;
    height: 100%;
    background-color: orange;
}

.col-image {
    position: relative;

    .buttons {
        position: absolute;
        top: 50%;
    }
}

.card-size {
    width: 24rem;
}

.size-container {
    min-height: 100vh;
    background-image: url('../assets/bg-homepage.jpg');
    background-size: contain;
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
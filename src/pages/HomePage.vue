<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            types: [],
            selectedType: null,
            restaurants: [],
        }
    },
    mounted() {
        this.getRestaurantTypes();
    },
    methods: {
        getRestaurantTypes() {

            this.store.loading = true;

            axios.get(`${store.baseUrl}/api/types`).then((response) => {

                if (response.data.success) {

                    this.types = response.data.results;
                    this.store.loading = false;

                } else {
                    this.$router.push({ name: 'not-found' });
                }

            });
        },
        showRestaurants(typeId) {
            axios.get(`${store.baseUrl}/api/types/${typeId}`).then(response => {

                if (response.data.success) {

                    const restaurants = response.data.results.type.restaurants;
                    const uniqueRestaurants = Array.from(new Set(restaurants.map(r => r.id))).map(id => restaurants.find(r => r.id === id));

                    this.selectedType = response.data.results.type_id;
                    this.restaurants = uniqueRestaurants;

                } else {
                    this.$router.push({ name: 'not-found' });
                }
            })
        }

    }
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <div class="container-fluid size-container py-3" v-if="!store.loading">
        <div class=" container main-container py-3">
            <div class="row">
                <!-- HomePage Title -->
                <div class="col-12 bg-white shadow rounded-3 p-3 mb-2">
                    <h3>I nostri ristoranti</h3>
                    <p>
                        Stasera sushi, pizza o poke? Su Deliveboo trovi un'immensa selezione di cucine dal mondo.
                        Lasciati ispirare.
                    </p>
                </div>
                <!-- Restaurants Types Card Mobile -->
                <div class="col-12 restaurants-types-card-mobile">
                    <div class="card card-type rounded-5 my-3" v-for="( type ) in  types " :key="type.id"
                        @click="showRestaurants(type.id)">
                        <!-- Restaurants Types Card Img Top -->
                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="card-img-top" alt="types-image" />
                        <!-- Restaurants Types Card Body -->
                        <div class="card-body card-body-type deliveboo-orange rounded-5 rounded-top-0">
                            <h5 class="card-title text-white text-center">{{ type.name }}</h5>
                            <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                        </div>
                    </div>
                </div>
                <!-- Restaurants Types Card Desktop -->
                <div class="col-12 col-lg-2 restaurants-types-card-desktop my-3" v-for="( type ) in  types " :key="type.id"
                    @click="showRestaurants(type.id)">
                    <div class="card card-type rounded-5">
                        <!-- Restaurants Types Card Img Top -->
                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="card-img-top" alt="types-image" />
                        <!-- Restaurants Types Card Body -->
                        <div class="card-body card-body-type deliveboo-orange rounded-5 rounded-top-0">
                            <h5 class="card-title text-white text-center">{{ type.name }}</h5>
                            <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                        </div>
                    </div>
                </div>
                <!-- Selected Restaurants Card -->
                <div class="col-12 d-flex flex-row justify-content-center flex-wrap">
                    <router-link class="card my-3 mx-3" v-for="( restaurant, index ) in  restaurants " :key="index"
                        :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }">
                        <!-- Restaurants Card Image -->
                        <img :src="`${store.baseUrl}/storage/${restaurant.cover_image}`" :alt="`${restaurant.slug}-image`"
                            class="card-img-top" v-if="restaurant.cover_image" />
                        <!-- Restaurants Card Body -->
                        <div class="card-body">
                            <h5 class="card-title">{{ restaurant.name }}</h5>
                            <h6>{{ restaurant.address }}</h6>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
@use '../styles/generals.scss' as *;

.size-container {
    background-image: url('../assets/bg-home/final-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
}

// Restaurants Types Card

.restaurants-types-card-desktop {
    display: none;
}

.restaurants-types-card-mobile {
    width: 100%;
    overflow-x: auto;
    /* Impedisce il wrap delle card su più righe */
    white-space: nowrap;

    .card {
        display: inline-block;
        /* Larghezza di ciascuna card */
        width: 150px;
        /* Spazio tra le card */
        margin-right: 10px;
    }

    .card img {
        max-width: 100%;
    }
}

.card-type {
    transition: transform 0.1s ease;
    /* Aggiungi una transizione per la trasformazione (ingrandimento) */
}

.card-type:hover {
    transform: scale(1.05);
    /* Aumenta la scala dell'intera card al passaggio del mouse */
}

.card-body-type {
    /* Imposta il colore di sfondo iniziale */
    transition: background-color 0.5s ease;
    /* Aggiungi una transizione */

}

.card-type:hover .card-body-type {
    background-color: #90BB3F;
    /* O il colore che desideri */

}

// End Restaurants Types Card


/********** MEDIAQUERY **********/

// DESKTOP
@media screen and (min-width: 992px) {
    .restaurants-types-card-mobile {
        display: none;
    }

    .restaurants-types-card-desktop {
        display: block;
    }
}
</style>      
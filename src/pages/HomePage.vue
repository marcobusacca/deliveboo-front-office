<script>
import { store } from '../store';
import axios from 'axios';
import AppLoader from '../components/AppLoader.vue';

export default {
    components: {
        AppLoader
    },
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

                this.types = response.data.results;
                this.store.loading = false;

            }).catch((error) => {
                console.error('Errore nella chiamata API:', error);

            });
        },
        showRestaurants(typeId) {
            axios.get(`${store.baseUrl}/api/types/${typeId}`).then(response => {

                const restaurants = response.data.results.type.restaurants;
                const uniqueRestaurants = Array.from(new Set(restaurants.map(r => r.id))).map(id => restaurants.find(r => r.id === id));

                this.selectedType = response.data.results.type_id;
                this.restaurants = uniqueRestaurants;
            })
        }

    }
}
</script>

    
<template>
    <AppLoader v-if="store.loading" />
    <div class="container-fluid size-container py-5" v-if="!store.loading">
        <div class="container main-container py-5 pb-5">
            <div class="row">
                <div class="col-12 shadow">
                    <div class="shadow p-3 bg-white shadow mb-2 carousel rounded-3">
                        <h3>I nostri ristoranti</h3>
                        <p>
                            Stasera sushi, pizza o poke? Su Deliveboo trovi un'immensa selezione di cucine dal mondo.
                            Lasciati ispirare.
                        </p>
                    </div>
                </div>
                <div class="col-12 shadow">
                    <div class="row justify-content-center">
                        <!-- Restaurants Types Card -->
                        <div class="col-12 col-md-6 col-lg-2 d-flex" v-for="(type) in types" :key="type.id"
                            @click="showRestaurants(type.id)">
                            <div class="card card-type border-0 my-3">
                                <img :src="`${store.baseUrl}/storage/${type.cover_image}`" alt="Immagine del ristorante" />
                                <div class="card-body card-body-type deliveboo-orange rounded-5 rounded-top-0">
                                    <h5 class="card-title text-white text-center">{{ type.name }}</h5>
                                    <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                                </div>
                            </div>
                        </div>
                        <!-- Selected Restaurants Card -->
                        <div class="col-12 d-flex flex-row justify-content-center flex-wrap">
                            <router-link class="card my-3 card-size mx-3 text-decoration-none"
                                v-for="(restaurant, index) in restaurants" :key="index"
                                :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }">
                                <!-- Restaurants Card Image -->
                                <img :src="`${store.baseUrl}/storage/${restaurant.cover_image}`"
                                    :alt="`${restaurant.slug}-image`" class="card-img-top" v-if="restaurant.cover_image" />
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
        </div>
    </div>
</template>


    
<style lang="scss">
@use '../styles/generals.scss' as *;

.card-size {
    width: 20rem;
}

.carousel {
    background-color: rgba(255, 255, 255, 0.075);

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
    background-color: transparent;
    /* Imposta il colore di sfondo iniziale */
    transition: background-color 0.5s ease;
    /* Aggiungi una transizione */

}

.card-type:hover .card-body-type {
    background-color: #90BB3F;
    /* O il colore che desideri */

}

.text-main {
    border: 1px solid rgb(95, 95, 95);
    border-radius: 40px;
    background-color: #FF8100;
}


.col-image {
    position: relative;

    .buttons {
        position: absolute;
        top: 50%;
    }
}

.size-container {
    background-image: url('../assets/bg-home/final-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
}

.bg-orange {
    background-color: orange;

    .bg-white {
        background-color: white;
        border-radius: 10px;
    }
}
</style>      
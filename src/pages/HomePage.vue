<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            types: [],
            restaurants: [],
        }
    },
    mounted() {
        this.getRestaurantTypes();
        this.getRestaurantsByTypeId([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    },
    methods: {
        getRestaurantTypes() {
            axios.get(`${store.baseUrl}/api/types`).then((response) => {
                this.types = response.data.results;
            }).catch((error) => {
                console.error('Errore nella chiamata API:', error);
            });
        },
        getRestaurantsByTypeId(typeId) {
            const promises = typeId.map(type_id => {
                return axios.get(`${store.baseUrl}/api/types/${type_id}`)
                    .then(response => response.data.results)
                    .catch(error => {
                        console.error(`Errore nella chiamata API per type_id ${type_id}:`, error);
                        return [];
                    });
            });

            Promise.all(promises)
                .then(results => {
                    const allRestaurants = results.flat();
                    const uniqueRestaurants = {};

                    allRestaurants.forEach(restaurant => {
                        uniqueRestaurants[restaurant.id] = restaurant;
                    });

                    this.restaurants = Object.values(uniqueRestaurants);
                });
        }
    }
}
</script>
    
<template>
    <div class="container-fluid size-container py-5">
        <div class="container main-container py-5 pb-5">
            <div class="row">
                <div class="col-12 shadow">
                    <div class="shadow p-3 bg-white shadow mb-2 carousel rounded-3">
                        <h3>I nostri ristoranti</h3>
                        <p>Stasera sushi, pizza o poke? Su Deliveboo trovi un'immensa selezione di cucine dal mondo. Lasciati ispirare.</p>
                    </div>
                </div>
                <div class="col-12 shadow">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-lg-2 d-flex " v-for="(type, index) in types" :key="index">
                            <div class="card big-card my-3 rounded-5 rounded-top-0">
                                <img :src="`${store.baseUrl}/storage/${type.cover_image}`" alt="Immagine del ristorante" />
                                <div class="card-body deliveboo-orange rounded-5 rounded-top-0">
                                    <h5 class="card-title text-white text-center">{{ type.name }}</h5>
                                    <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 d-flex flex-row justify-content-center flex-wrap">
                <div class="card my-3 card-size mx-3" v-for="(item, index) in restaurants" :key="index">
                    <img :src="`${store.baseUrl}/storage/${item.cover_image}`" alt="Immagine del ristorante"
                        class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <h6>{{ item.address }}</h6>
                        <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style lang="scss">
@use '../styles/generals.scss' as *;

.carousel{
    background-color: rgba(255, 255, 255, 0.075);

}


.card {
    transition: transform 0.1s ease; /* Aggiungi una transizione per la trasformazione (ingrandimento) */
}

.card:hover {
    transform: scale(1.05); /* Aumenta la scala dell'intera card al passaggio del mouse */
}

.card-body {
  background-color: transparent; /* Imposta il colore di sfondo iniziale */
  transition: background-color 0.5s ease; /* Aggiungi una transizione */
  
}

.card:hover .card-body {
  background-color: #90BB3F; /* O il colore che desideri */
  
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
}

.bg-orange {
    background-color: orange;

    .bg-white {
        background-color: white;
        border-radius: 10px;
    }
}
</style>
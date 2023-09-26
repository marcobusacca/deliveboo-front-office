<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            types: [],
            selectedTypes: [],
            restaurants: [],
        }
    },
    mounted() {
        this.getRestaurantsTypes();
    },
    methods: {
        getRestaurantsTypes() {

            this.store.loading = true;

            axios.get(`${store.baseUrl}/api/types`).then((response) => {

                if (response.data.success) {

                    const results = response.data.results;

                    results.forEach(type => {

                        const object = {
                            selected: false,
                            data: type,
                        }

                        this.types.push(object);
                    });

                    this.store.loading = false;

                } else {
                    this.$router.push({ name: 'not-found' });
                }
            });
        },
        selectTypes(index) {

            // RECUPERO L'ELEMENTO CLICCATO DALL'ARRAY DI OGGETTI "TYPES", TRAMITE L'INDEX CHE MI è STATO PASSATO
            const clickedType = this.types[index];

            // IMPOSTO LA VARIABILE "SELECTED" DELL'ELEMENTO CLICCATO SU TRUE|FALSE
            clickedType.selected = !clickedType.selected;

            // SVUOTO L'ARRAY "SELECTED_TYPES"
            this.selectedTypes = [];

            // FILTRO GLI ELEMENTI SELEZIONATI DALL'ARRAY DI OGGETTI "TYPES" E LI INSERISCO NELL'ARRAY "SELECTED_TYPES"
            const selectedTypes = this.types.filter(type => type.selected);

            // SALVO NELL'ARRAY "SELECTED_TYPES" GLI ID DELLE TIPOLOGIE SELEZIONATE
            selectedTypes.forEach(type => {
                const selectedTypeId = type.data.id;
                this.selectedTypes.push(selectedTypeId);
            });

            console.log(this.selectedTypes);
        },
    },
    computed: {
        showRestaurants() {

            // axios.get(`${store.baseUrl}/api/types/${type_id}`).then(response => {

            //     if (response.data.success) {

            //         const restaurants = response.data.results.type.restaurants;
            //         const uniqueRestaurants = Array.from(new Set(restaurants.map(r => r.id))).map(id => restaurants.find(r => r.id === id));

            //         this.selectedType = response.data.results.type_id;
            //         this.restaurants = uniqueRestaurants;

            //     } else {
            //         this.$router.push({ name: 'not-found' });
            //     }
            // })
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <div class="container-fluid deliveboo-background py-3" v-if="!store.loading">
        <div class=" container main-container py-3">
            <div class="row">
                <!-- HomePage Title -->
                <div class="col-12 bg-white shadow rounded-3 p-3 mb-2">
                    <div class="row">
                        <div class="col-12 col-lg-8">
                            <h3>I nostri ristoranti</h3>
                            <p>Stasera sushi, pizza o poke? Su Deliveboo trovi un'immensa selezione di cucine dal mondo.
                                <br> Lasciati ispirare.
                            </p>
                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="d-flex justify-content-center justify-content-lg-start">
                                <img src="../assets/eat.png" class="title-image" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Restaurants Types Card Mobile -->
                <div class="col-12 restaurants-types-card-mobile">
                    <div class="card card-type rounded-5 my-3"
                        :class="type.selected ? 'restaurants-types-card-selected' : ''" v-for="(type, index) in types"
                        :key="type.data.id" @click="showRestaurants(type.data.id), selectTypes(index)">
                        <!-- Restaurants Types Card Img Top -->
                        <img :src="`${store.baseUrl}/storage/${type.data.cover_image}`" class="card-img-top"
                            alt="types-image" />
                        <!-- Restaurants Types Card Body -->
                        <div class="card-body card-body-type deliveboo-orange rounded-5 rounded-top-0">
                            <h5 class="card-title text-white text-center">{{ type.data.name }}</h5>
                            <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                        </div>
                        <!-- Restaurants Types Card Selected Icon -->
                        <i class="fa-solid fa-circle-check text-green border border-white bg-white check-selected"
                            v-if="type.selected"></i>
                    </div>
                </div>
                <!-- Restaurants Types Card Desktop -->
                <div class="col-12 col-lg-2 restaurants-types-card-desktop my-3" v-for="(type, index) in  types"
                    :key="type.data.id" @click="showRestaurants(type.data.id), selectTypes(index)">
                    <div class="card card-type rounded-5" :class="type.selected ? 'restaurants-types-card-selected' : ''">
                        <!-- Restaurants Types Card Img Top -->
                        <img :src="`${store.baseUrl}/storage/${type.data.cover_image}`" class="card-img-top"
                            alt="types-image" />
                        <!-- Restaurants Types Card Body -->
                        <div class="card-body card-body-type deliveboo-orange rounded-5 rounded-top-0">
                            <h5 class="card-title text-white text-center">{{ type.data.name }}</h5>
                            <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                        </div>
                        <!-- Restaurants Types Card Selected Icon -->
                        <i class="fa-solid fa-circle-check text-green border rounded-5 border-white bg-white check-selected"
                            v-if="type.selected"></i>
                    </div>
                </div>
                <!-- Selected Restaurants Card -->
                <div class="col-12 d-flex flex-row justify-content-center flex-wrap">
                    <router-link class="card my-3 mx-3" v-for="( restaurant, index ) in  restaurants " :key="index"
                        :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }">
                        <!-- Restaurants Card Image -->
                        <img :src="`${store.baseUrl}/storage/${restaurant.cover_image}`" :alt="`${restaurant.slug}-image`"
                            class="card-img-top" v-if="restaurant.cover_image" />

                        <!-- Placeholder Image -->
                        <img src="../assets/placeholder-image.jpg" alt="placeholder-image" class="card-img-top" v-else />
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

// Restaurants Types Card

.restaurants-types-card-selected {
    transform: scale(1.05);

    .card-body-type {
        background-color: #90BB3F;
    }

    .check-selected {
        position: absolute;
        top: -10px;
        right: -5px;
        font-size: 30px;
    }
}

.restaurants-types-card-desktop {
    display: none;
}

.restaurants-types-card-mobile {
    width: 100%;
    overflow-x: auto;
    /* Impedisce il wrap delle card su più righe */
    white-space: nowrap;
    cursor: pointer;

    .card {
        display: inline-block;
        width: 150px;
        margin-right: 10px;
    }

    .card img {
        max-width: 100%;
    }
}

.card-type {
    transition: transform 0.1s ease;
}

.card-type:hover {
    transform: scale(1.05);
}

.card-body-type {
    transition: background-color 0.5s ease;
}

.card-type:hover .card-body-type {
    background-color: #90BB3F;
}

.title-image {
    width: 40vw;
}

// End Restaurants Types Card


/********** MEDIAQUERY **********/

//TABLET

@media screen and (min-width: 768px) {
    .title-image {
        width: 20vw;
    }
}

// DESKTOP

@media screen and (min-width: 992px) {
    .restaurants-types-card-mobile {
        display: none;
    }

    .title-image {
        width: 10vw;
    }

    .restaurants-types-card-desktop {
        display: block;
        cursor: pointer;
    }
}
</style>      
<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
import AppLoaderRestaurants from '../components/AppLoaderRestaurants.vue'

export default {
    components: {
        AppLoaderRestaurants,
    },
    data() {
        return {
            store,

            types: [],
            selectedTypes: [],

            restaurants: [],

            currentPage: 1,
            lastPage: null,
            pageList: [],
        }
    },
    mounted() {
        this.getRestaurantsTypes();
        this.getRestaurants(1);
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
        getRestaurants(num_page) {

            this.store.loadingRestaurants = true;

            axios.get(`${store.baseUrl}/api/restaurants`, { params: { page: num_page } }).then((response) => {

                if (response.data.success) {

                    this.restaurants = response.data.results.data;

                    this.currentPage = response.data.results.current_page;
                    this.lastPage = response.data.results.last_page;

                    this.store.loadingRestaurants = false;

                    this.getPageList(this.lastPage);

                } else {

                    this.$router.push({ name: 'not-found' });
                }
            });
        },
        selectTypes(index) {

            const clickedType = this.types[index];

            clickedType.selected = !clickedType.selected;

            this.selectedTypes = this.types.filter(type => type.selected).map(type => type.data.id);

            this.getFilteredRestaurants(1);
        },
        getFilteredRestaurants(num_page) {

            this.store.loadingRestaurants = true;

            const typeIds = this.selectedTypes.join(',');

            if (typeIds.length != 0) {

                axios.get(`${store.baseUrl}/api/restaurants/${typeIds}`, { params: { page: num_page } }).then((response) => {

                    if (response.data.success) {

                        this.restaurants = response.data.results.data;

                        this.currentPage = response.data.results.current_page;
                        this.lastPage = response.data.results.last_page;

                        this.store.loadingRestaurants = false;

                        this.getPageList(this.lastPage);

                    } else {

                        this.$router.push({ name: 'not-found' });
                    }
                });

            } else {

                this.getRestaurants(num_page);
            }
        },
        getPageList(last_page) {

            var currentPage = 1;
            var lastPage = last_page;

            this.pageList = [];

            while (currentPage <= lastPage) {
                this.pageList.push(currentPage);
                currentPage++;
            }
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
                        :key="type.data.id" @click="selectTypes(index)">
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
                <!-- Restaurants Types Card Desktop -->
                <div class="col-12">
                    <div class="row">
                        <div class="col-12 col-lg-2 restaurants-types-card-desktop my-3" v-for="(type, index) in  types"
                            :key="type.data.id" @click="selectTypes(index)">
                            <div class="card card-type rounded-5"
                                :class="type.selected ? 'restaurants-types-card-selected' : ''">
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
                    </div>
                </div>
                <!-- Selected Restaurants Card -->
                <div class="col-12 restaurants-container bg-white shadow rounded-5 my-3">
                    <div class="row">
                        <!-- AppLoaderRestaurants -->
                        <div class="col-12 text-center py-5" v-if="store.loadingRestaurants">
                            <AppLoaderRestaurants />
                        </div>
                    </div>
                    <div class="row restaurants-row justify-content-center">
                        <!-- Restaurants Error Message -->
                        <div class="col-12 text-center py-5" v-if="!store.loadingRestaurants && restaurants.length == 0">
                            <h2>Nessun ristorante disponibile</h2>
                        </div>
                        <!-- Restaurants List -->
                        <router-link class="col-12 restaurants-list" v-for="( restaurant, index ) in  restaurants"
                            :key="index" :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }"
                            v-if="!store.loadingRestaurants && restaurants.length != 0"
                            @click="getRestaurants(restaurant.id)">
                            <div class="row">
                                <!-- Restaurants Cover Image -->
                                <div class="col-12 col-lg-6 restaurants-col-image">
                                    <!-- Placeholder Image -->
                                    <div class="restaurants-image shadow rounded-3"
                                        style="background-image: url(src/assets/placeholder-image.png);"
                                        v-if="!restaurant.cover_image">
                                    </div>
                                    <!-- Restaurants Image -->
                                    <div class="restaurants-image shadow rounded-3"
                                        :style="`background-image: url(${store.baseUrl}/storage/${restaurant.cover_image});`"
                                        v-else>
                                    </div>
                                </div>
                                <!-- Restaurant Details -->
                                <div class="col-12 col-lg-6 text-black restaurants-col-details">
                                    <div class="row">
                                        <div class="col-12 col-lg-8">
                                            <!-- Restaurant Name -->
                                            <h5>{{ restaurant.name }}</h5>
                                            <!-- Restaurant Address -->
                                            <h6>{{ restaurant.address }}</h6>
                                            <!-- Restaurant Types List -->
                                            <div>
                                                <ul class="list-unstyled">
                                                    <li v-for="(type, index) in restaurant.types" :key="index"
                                                        class="d-inline-block">
                                                        <span>{{ type.name }}</span>
                                                        <span v-if="index < restaurant.types.length - 1"
                                                            class="mx-1">•</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- Restaurant Other Info -->
                                        <div class="col-12 col-lg-4 d-none d-lg-block">
                                            <div class="restaurants-second-details">
                                                <p class="d-inline-block">
                                                    <i class="fa-solid fa-money-bill-wave mx-1"></i>
                                                    Consegna da: GRATIS <br> Ordine Minimo: 5 €
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <!-- PULSANTI GESTIONE PAGINAZIONE -->
                    <div class="row" v-if="restaurants.length != 0 && lastPage != 1">
                        <div class="col-12 text-center my-5">
                            <div class="row">
                                <div class="col-12 d-flex d-lg-none justify-content-center mt-3">
                                    <ul class="pagination d-flex align-items-center">
                                        <li class="mx-3">
                                            <button class="btn btn-sm border-0 p-0 mx-1" :disabled="currentPage === 1">
                                                <span @click="getFilteredRestaurants(currentPage - 1)">
                                                    <i class="fa-solid fa-circle-arrow-left fa-2xl"></i>
                                                </span>
                                            </button>
                                        </li>
                                        <li class="mx-3">
                                            <span class="fs-1">{{ currentPage }}</span>
                                        </li>
                                        <li class="mx-3">
                                            <button class="btn btn-sm border-0 p-0 mx-1"
                                                :disabled="currentPage === lastPage">
                                                <span @click="getFilteredRestaurants(currentPage + 1)">
                                                    <i class="fa-solid fa-circle-arrow-right fa-2xl"></i>
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-12 d-none d-lg-block mt-3">
                                    <ul class="list-unstyled">
                                        <li class="d-inline-block mx-2" v-for="page in pageList"
                                            @click="getFilteredRestaurants(page)">
                                            <span class="pagination-item"
                                                :class="page === currentPage ? 'pagination-item-selected' : ''">
                                                {{ page }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
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

// Selected Restaurants Card

.restaurants-container {
    .restaurants-row {
        .restaurants-list {
            margin: 20px 0;

            .restaurants-col-image {
                .restaurants-image {
                    width: 100%;
                    min-height: 100px;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            }

            .restaurants-col-details {
                margin: 20px 0;
            }
        }
    }
}


// PAGINATION LIST

.pagination-item {
    width: 35px;
    height: 35px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 50%;
    border: 1px solid black;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #FF8100;
        color: white;
    }
}

.pagination-item-selected {
    border: 1px solid black;
    background-color: #FF8100;
    color: white;
}

// End Selected Restaurants Card




/********** MEDIAQUERY **********/

//TABLET
@media screen and (min-width: 768px) {
    .title-image {
        width: 20vw;
    }
}

// DESKTOP
@media screen and (min-width: 992px) {

    // Restaurants Types Card

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

    // End Restaurants Types Card


    // Selected Restaurants Card

    .restaurants-container {
        .restaurants-row {
            padding: 30px;

            .restaurants-list {
                margin: 40px 0;

                .restaurants-col-image {
                    .restaurants-image {
                        min-height: 110%;
                    }
                }

                .restaurants-second-details {
                    text-align: end;
                    font-size: 13px;
                }
            }
        }

    }

    // End Selected Restaurants Card
}
</style>      
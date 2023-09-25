<script>
import { store } from '../store';
import axios from 'axios';
export default {
    props: ['slug'],
    data() {
        return {
            store,
            products: [],
            restaurant: []
        }
    },
    mounted() {
        this.getProducts(this.slug);
        this.store.showCart = true;
    },
    methods: {
        getProducts(slug) {
            axios.get(`${store.baseUrl}/api/restaurants/${slug}`).then((response) => {
                this.restaurant = response.data.results;
                this.products = response.data.results.products;
            })
        }
    },
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col-12">
                <!-- Restaurant Image Full Page -->
                <div class="image-restaurant">
                </div>
            </div>
        </div>
    </div>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-8 shadow">
                <div class="text-center p-3 my-3">
                    <img :src="`${store.baseUrl}/storage/${restaurant.cover_image}`" class="img-fluid logo-ristorante"
                        :alt="`${restaurant.slug}-logo`">
                    <h1>{{ restaurant.name }}</h1>
                    <p>{{ restaurant.address }}</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4 col-lg-4 bg-alert p-3" v-for="product in products" :key="product.id">
                        <div class="card border-0">
                            <img :src="`${store.baseUrl}/storage/${product.cover_image}`"
                                class="card-img-top border border-black rounded-top-5" alt="product-image"
                                v-if="product.cover_image">
                            <div class="card-body border border-black p-3">
                                <p>{{ product.name }}</p>
                                <p>{{ product.description }}</p>
                                <p>{{ product.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 d-none d-lg-block">
                <div class="text-center text-white p-3 py-5">
                    <div class="card">
                        <h1>Il tuo carrello</h1>
                        <p>ordine 1</p>
                        <p>ordine 2</p>
                        <button class="btn btn-primary p-3">Vai al pagamento</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.image-restaurant {
    height: 65vh;
    width: 100%;
    background-color: green;
    background-image: url(../assets/bacon.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}

.logo-ristorante {
    width: 80px;
}

.menù {
    background-color: yellow;
}
</style>
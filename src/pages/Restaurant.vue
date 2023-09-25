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
        this.getProducts(this.slug)
    },
    methods: {
        getProducts(slug) {
            axios.get(`${store.baseUrl}/api/restaurants/${slug}`).then((response) => {
                this.restaurant = response.data.results
                this.products = response.data.results.products
            })
        }
    },
}
</script>

<template>
    <div class="container-fluid">
        <div class="container-restaurant position-relative">
            <div class="image-restaurant">

            </div>
        </div>
        <div class="container container-menù shadow mb-5">
            <div class="row">
                <div class="col-12 col-md-9">
                    <div class="p-3 text-center mt-3 mb-3">
                        <div class="d-flex justify-content-center">
                            <img :src="`${store.baseUrl}/storage/${restaurant.cover_image}`"
                                class="img-fluid logo-ristorante" alt="">
                        </div>
                        <h1>{{ restaurant.name }}</h1>
                        <p>{{ restaurant.address }}</p>
                    </div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12 col-md-4 col-lg-3 mx-2 my-2 card p-3 bg-alert">
                                <div class="card border-0" v-for="product in products" :key="product.id">
                                    <div class="card-header p-0 border-0">
                                        <img :src="`${store.baseUrl}/storage/${product.cover_image}`"
                                            class="img-fluid rounded-top-1" alt="">
                                    </div>
                                    <div class="card-body p-3 rounded-bottom-1 border-0">
                                        <p>{{ product.name }}</p>
                                        <p>{{ product.description }}</p>
                                        <p>{{ product.price }}</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <div class="carrello p-3 py-5 text-center text-white">
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

.carrello {
    height: 1000px;
    background-color: rgb(0, 38, 255);
}
</style>
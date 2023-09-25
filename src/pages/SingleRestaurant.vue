<script>
import { store } from '../store';
import axios from 'axios';

export default {
    props: ['slug'],
    data() {
        return {
            store,
            products: [],
            restaurant: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
        }
    },
    watch: {
        // Osserva il carrello e salvalo nel local storage quando cambia
        cart: {
            handler() {
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            deep: true,
        },
    },
    computed: {
        totalAmount() {
            return this.cart.reduce((total, item) => total + (parseFloat(item.product.price) * item.quantity), 0).toFixed(2);
        },

        cartWithQuantity() {
            const cartMap = new Map();
            this.cart.forEach(item => {
                if (cartMap.has(item.product.id)) {
                    cartMap.get(item.product.id).quantity += 1;
                } else {
                    cartMap.set(item.product.id, { product: item.product, quantity: 1 });
                }
            });
            return Array.from(cartMap.values());
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
        },
        addToCart(product) {
            this.cart.push({ product, quantity: 1 });
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        clearCart() {
            // Pulisci il carrello e rimuovilo dal local storage
            this.cart = [];
            localStorage.removeItem('cart');
        },
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
                    <div class="col-12 col-md-4 col-lg-4 bg-alert p-3" v-for="product in products" :key="product.id"
                        @click="addToCart(product)">
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
                        <div v-if="cart.length > 0">
                            <h1>Il tuo carrello</h1>
                            <div class="card-body d-flex justify-content-around align-items-center">
                                <h5 v-for="(item, index) in cartWithQuantity" :key="index">
                                    {{ item.product.name }} x{{ item.quantity }}
                                </h5>
                                <button @click="removeFromCart(index)" class="btn">
                                    <i class="fa-solid fa-trash" style="color: #f00a0a;"></i>
                                </button>
                            </div>
                            <h4>Totale: {{ totalAmount }} €</h4>
                            <button class="btn btn-success my-2">Vai al checkout</button>
                            <button @click="clearCart()">Pulisci il carrello</button>
                        </div>
                        <div class="p-5" v-else>
                            <h3>Il carrello è vuoto</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Carrello versione mobile -->
    <div class="container sticky-bottom bg-white d-block d-lg-none p-3">
        <div class="row">
            <div class="col-12 card p-3">
                <div class="cartel-mobile mb-2">
                    <div class="badge bg-primary rounded-pill px-2">
                        <i class="fa-solid fa-basket-shopping px-2"></i>
                        <span>14</span>
                    </div>
                    <span class="px-2">Hai ordinato tot prezzo</span>
                </div>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom">Visualizza carrello</button>
            </div>
        </div>
    </div>
    <!-- Carrello off canvas -->
    <div class="offcanvas offcanvas-bottom h-100 d-block d-lg-none overflow-y-auto" tabindex="-1" id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Il tuo carrello</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="container">
                <div class="row justify-content-center">
                    <div v-if="cart.length > 0">
                        <h1>Il tuo carrello</h1>
                        <div class="card-body d-flex justify-content-around align-items-center">
                            <h5 v-for="(item, index) in cartWithQuantity" :key="index">
                                {{ item.product.name }} x{{ item.quantity }}
                            </h5>
                            <button @click="removeFromCart(index)" class="btn">
                                <i class="fa-solid fa-trash" style="color: #f00a0a;"></i>
                            </button>
                        </div>
                        <h4>Totale: {{ totalAmount }} €</h4>
                        <button class="btn btn-success my-2">Vai al checkout</button>
                    </div>
                    <div class="p-5" v-else>
                        <h3>Il carrello è vuoto</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-primary p-3 w-100 mt-3">
                            Effettua pagamento
                        </button>
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
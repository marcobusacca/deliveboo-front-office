<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    props: ['slug'],
    data() {
        return {
            store,
            restaurant: {},
            products: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            maxQuantity: 10,
        };
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
    mounted() {
        this.getRestaurantProducts(this.slug);
    },
    methods: {
        getRestaurantProducts(restaurant_slug) {

            this.store.loading = true;

            axios.get(`${store.baseUrl}/api/restaurants/${restaurant_slug}/products`).then(response => {

                if (response.data.success) {

                    this.restaurant = response.data.results;

                    this.products = response.data.results.products;

                    this.store.loading = false;

                } else {
                    this.$router.push({ name: 'not-found' });
                }
            });
        },
        addToCart(product) {

            if (!product) {
                console.error('Prodotto non valido');
                return;
            }

            const existingItem = this.cart.find(item => item.id === product.id);

            if (existingItem) {

                if (existingItem.quantity < this.maxQuantity) {

                    existingItem.quantity++;

                } else {
                    alert(`Hai raggiunto la quantità massima per ${product.name}`);
                }

            } else {

                if (this.cart.length < this.maxQuantity) {

                    this.cart.push({
                        ...product,
                        quantity: 1,
                        id: product.id,
                        restaurantId: this.restaurant.id,
                    });

                } else {
                    alert(`Hai raggiunto la quantità massima per ${product.name}`);
                }
            }

            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(id) {
            const item = this.cart.find(item => item.id === id);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    const index = this.cart.indexOf(item);
                    this.cart.splice(index, 1);
                }
            }
        },
        clearCart() {
            // Pulisci il carrello e rimuovilo dal local storage
            this.cart = [];
            localStorage.removeItem('cart');
        },
    },
    computed: {
        totalAmount() {
            return this.cart.reduce(
                (total, item) =>
                    total + parseFloat(item.price) * item.quantity,
                0
            ).toFixed(2);
        },

        cartWithQuantity() {
            const cartMap = new Map();
            this.cart.forEach(item => {
                if (cartMap.has(item.id)) {
                    cartMap.get(item.id).quantity += item.quantity;
                } else {
                    cartMap.set(item.id, { ...item });
                }
            });
            return Array.from(cartMap.values());
        },
    },
};
</script>

<!-- TEMPLATE HTML -->
<template>
    <div class="container-fluid p-0" v-if="!store.loading">
        <!-- Restaurants PlaceHolder Image -->
        <div class="image-restaurant"
            style="background-image: url(https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
            v-if="!restaurant.cover_image"></div>
        <!-- Restaurants Image -->
        <div class="image-restaurant" :style="`background-image: url(${store.baseUrl}/storage/${restaurant.cover_image});`"
            v-else>
        </div>
        <div class="container py-5">
            <div class="row justify-content-center">
                <!-- Restaurant And Products -->
                <div class="col-12 col-lg-8 card shadow">
                    <div class="row">
                        <!-- Restaurant Details -->
                        <div class="col-12 text-center pt-4">
                            <!-- Restaurant Name -->
                            <h1 class="my-3">{{ restaurant.name }}</h1>
                            <!-- Restaurant Types List -->
                            <div>
                                <ul class="list-unstyled">
                                    <li v-for="(type, index) in restaurant.types" :key="index" class="d-inline-block">
                                        <span>{{ type.name }}</span>
                                        <span v-if="index < restaurant.types.length - 1" class="mx-1">•</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- Restaurant Address -->
                            <span>{{ restaurant.address }}</span>
                        </div>
                        <!-- Products Details -->
                        <div class="col-12 products-details-container">
                            <div class="row">
                                <!-- Products Error Message -->
                                <div class="col-12" v-if="products && products.length === 0">
                                    <h3>Non ci sono prodotti disponibili per questo ristorante</h3>
                                </div>
                                <!-- Product Card -->
                                <div class="col-12 products-card card shadow rounded-3 p-0 my-2" v-for="product in products"
                                    :key="product.id" v-else>
                                    <!-- Product Card Body -->
                                    <div class="card-body d-flex">
                                        <!-- Product Details -->
                                        <div class="col-12 col-lg-8">
                                            <!-- Product Name -->
                                            <h3>{{ product.name }}</h3>
                                            <!-- Product Ingredients -->
                                            <span class="d-block my-3">{{ product.ingredients }}</span>
                                            <!-- Product Price -->
                                            <span class="d-block fw-bold my-3">{{ product.price }}€</span>
                                        </div>
                                        <!-- Product Image -->
                                        <div
                                            class="col-12 col-lg-4 d-none d-lg-flex justify-content-center align-items-center">
                                            <img :src="`${store.baseUrl}/storage/${product.cover_image}`"
                                                class="img-fluid rounded-3 w-75" alt="product-image"
                                                v-if="product.cover_image">
                                        </div>
                                    </div>
                                    <!-- Product Card Footer -->
                                    <div class="card-footer bg-white text-center">
                                        <button class="btn btn-success" @click="addToCart(product)">Aggiungi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Carrello Desktop -->
                <div class="col-12 col-lg-4 d-none d-lg-block">
                    <div class="card shadow p-3">
                        <div v-if="cart.length > 0">
                            <h1>Il tuo ordine</h1>
                            <div v-for="(item, index) in cartWithQuantity" :key="index">
                                <h5 class="d-inline-block">
                                    {{ item.name }} x{{ item.quantity }}
                                </h5>
                                <button @click="removeFromCart(item.id)" class="btn" style="color: #f00a0a;">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                            <div class="text-center">
                                <h4>Totale: {{ totalAmount }}€</h4>
                                <router-link class="btn btn-success my-2" :to="{ name: 'payment' }">Vai al
                                    checkout</router-link>
                                <button @click="clearCart()">Pulisci il carrello</button>
                            </div>
                        </div>
                        <div class="text-center p-5" v-else>
                            <h3>Il carrello è vuoto</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Carrello Mobile -->
    <div class="container-fluid sticky-bottom bg-white d-block d-lg-none p-3">
        <div class="row">
            <div class="col-12 card p-3">
                <div class="cartel-mobile mb-2" v-if="cart.length > 0">
                    <div class="badge bg-primary rounded-pill px-2">
                        <i class="fa-solid fa-basket-shopping px-2"></i>
                    </div>
                    <span class="px-2">Totale:</span>
                    <span class="fw-bold">{{ totalAmount }}€</span>
                </div>
                <!-- Button Empty Cart -->
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom" disabled v-if="cart.length === 0">Carrello vuoto</button>
                <!-- Button Not Empty Cart -->
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom" v-else>Visualizza carrello</button>
            </div>
        </div>
    </div>
    <!-- Carrello Mobile Off Canvas -->
    <div class="offcanvas offcanvas-bottom h-100 d-block d-lg-none overflow-y-auto" tabindex="-1" id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header products-cart-offcanvas-header-mobile">
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Il tuo carrello</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body products-cart-offcanvas-body-mobile p-0">
            <div class="container h-100">
                <div class="row products-cart-offcanvas-body-row-mobile h-100">
                    <div class="col-12 products-cart-offcanvas-list-mobile card shadow w-100 h-75" v-if="cart.length > 0">
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li class="text-center my-5" v-for="(item, index) in cartWithQuantity" :key="index">
                                    <h5 class="d-inline-block">{{ item.name }} x{{ item.quantity }}</h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 my-5 py-5" v-else>
                        <h3 class="text-center">Il tuo carrello è vuoto</h3>
                    </div>
                    <div class="col-12 text-center w-100 h-25">
                        <h4 class="mt-4" v-if="cart.length > 0">Totale: {{ totalAmount }} €</h4>
                        <button @click="clearCart()" class="btn btn-danger my-2 w-50" v-if="cart.length > 0">Pulisci
                            il
                            carrello</button>
                        <button class="btn btn-success p-3 w-100" v-if="cart.length > 0">Effettua pagamento</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
.image-restaurant {
    height: 60vh;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}

.products-details-container {
    padding: 50px 0;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;

    .products-card {
        cursor: pointer;
        border: 2px solid transparent;

        &:hover {
            border: 2px solid #0D6EFD;
        }
    }
}


// CARRELLO MOBILE
.products-cart-offcanvas-header-mobile {
    height: 65px;
}

.products-cart-offcanvas-body-mobile {
    height: calc(100% - 65px);

    .products-cart-offcanvas-body-row-mobile {
        padding: 0 20px;

        .products-cart-offcanvas-list-mobile {
            overflow-y: scroll;
        }
    }
}

// END CARRELLO MOBILE

/********** MEDIAQUERY **********/

//TABLET
@media screen and (min-width: 768px) {

    .products-cart-offcanvas-body-mobile {

        .products-cart-offcanvas-body-row-mobile {
            padding: 0;
        }
    }
}

// DESKTOP
@media screen and (min-width: 992px) {

    .products-details-container {
        padding: 50px 0;
        padding-right: 3rem !important;
        padding-left: 3rem !important;
    }
}
</style>
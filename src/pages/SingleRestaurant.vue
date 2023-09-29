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

            // Utilizza lo slug del ristorante come chiave per il carrello
            cartKey: `cart_${this.slug}`,

            // Il carrello specifico del ristorante verrà aggiornato e salvato nel localStorage usando la "cartKey"
            cart: JSON.parse(localStorage.getItem(`cart_${this.slug}`)) || [],

            maxQuantity: 99,
        };
    },
    watch: {
        // Osserva il carrello e salvalo nel localStorage quando cambia
        cart: {
            handler() {
                // Utilizza la chiave specifica "cartKey" del ristorante per memorizzare il carrello
                localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
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
        increaseCartQuantity(product) {

            if (!product) {
                console.error('Prodotto non valido');
                return;
            }

            const existingItem = this.cart.find(item => item.id === product.id);

            if (existingItem) {

                if (existingItem.quantity < this.maxQuantity) {

                    existingItem.quantity++;
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

            localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
        },
        decreaseCartQuantity(id) {

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
        deleteCartProduct(id) {

            const item = this.cart.find(item => item.id === id);

            if (item) {

                const index = this.cart.indexOf(item);
                this.cart.splice(index, 1);
            }
        },
        clearCart() {

            // Rimuovo il carrello specifico del ristorante corrente
            localStorage.removeItem(this.cartKey);

            this.cart = []; // Svuota il carrello nella componente
        },
        subTotal(productPrice, productQuantity) {
            return (parseFloat(productPrice) * productQuantity).toFixed(2);
        }
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
                                <div class="col-12 text-center" v-if="products && products.length === 0">
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
                                        <button class="btn btn-success"
                                            @click="increaseCartQuantity(product)">Aggiungi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Carrello Desktop -->
                <div class="col-12 col-lg-4 d-none d-lg-block">
                    <!-- Cart Card -->
                    <div class="card shadow single-restaurant-products-cart p-3" v-if="cart.length > 0">
                        <!-- Cart Card Header -->
                        <div class="card-header bg-white">
                            <!-- Card Header Title -->
                            <h2>Il tuo ordine</h2>
                        </div>
                        <!-- Cart Card Body -->
                        <div class="card-body">
                            <!-- Card Body Products List -->
                            <div v-for="(product, index) in cartWithQuantity" :key="index"
                                class="row justify-content-between border-bottom py-3">
                                <!-- Product Name -->
                                <div class="col-8 pe-5">
                                    <span class="d-inline-block">{{ product.name }}</span>
                                </div>
                                <!-- Product Quantity Counter and Quantity Button -->
                                <div class="col-4 d-flex justify-content-end align-items-center p-0">
                                    <!-- Decrease Quantity Button -->
                                    <button class="btn btn-sm border-0 p-0 mx-1" @click="decreaseCartQuantity(product.id)">
                                        <i class="fa-solid fa-circle-minus fa-lg"></i>
                                    </button>
                                    <!-- Quantity Counter -->
                                    <span class="fs-5 mx-2">{{ product.quantity }}</span>
                                    <!-- Increase Quantity Button -->
                                    <button class="btn btn-sm border-0 p-0 mx-1" @click="increaseCartQuantity(product)"
                                        :disabled="product.quantity >= maxQuantity">
                                        <i class="fa-solid fa-circle-plus fa-lg"></i>
                                    </button>
                                    <!-- Delete Product Button -->
                                    <button class="btn btn-sm btn-danger ms-3" @click="deleteCartProduct(product.id)">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                                <!-- Product Sub Total Price -->
                                <div class="col-12 text-end pt-4">
                                    <span class="fs-6 fw-bold">{{ subTotal(product.price, product.quantity) }}€</span>
                                </div>
                            </div>
                        </div>
                        <!-- Cart Card Footer -->
                        <div class="card-footer bg-white border-0 text-center pt-2">
                            <!-- Card Footer Total Amount -->
                            <div>
                                <span class="fs-5">Totale: </span>
                                <span class="fw-bold fs-5"> {{ totalAmount }}€</span>
                            </div>
                            <!-- Card Footer Go to CheckOut Button -->
                            <router-link class="d-block btn btn-success py-2 my-2"
                                :to="{ name: 'check-out', params: { slug: restaurant.slug } }">Vai al
                                checkout</router-link>
                            <!-- Card Footer Clear Cart Button -->
                            <button class="btn btn-danger" @click="clearCart()">Svuota carrello</button>
                        </div>
                    </div>
                    <!-- Empty Cart Card -->
                    <div class="card shadow text-center single-restaurant-products-cart p-5" v-else>
                        <h3>Il carrello è vuoto</h3>
                    </div>
                </div>
            </div>
        </div>
        <!-- Carrello Mobile -->
        <div class="container-fluid sticky-bottom bg-white d-block d-lg-none p-3">
            <div class="row">
                <div class="col-12 card p-3">
                    <div class="cartel-mobile mb-2" v-if="cart.length > 0">
                        <!-- Carrello Mobile Shopping Icoa -->
                        <div class="badge bg-primary rounded-pill px-2">
                            <i class="fa-solid fa-basket-shopping px-2"></i>
                        </div>
                        <!-- Carrello Mobile Totale Spesa -->
                        <span class="px-2">Totale:</span>
                        <span class="fw-bold">{{ totalAmount }}€</span>
                    </div>
                    <!-- Button Empty Cart -->
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" disabled
                        v-if="cart.length === 0">Carrello vuoto</button>
                    <!-- Button Not Empty Cart -->
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" v-else>Visualizza
                        carrello</button>
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
                        <div class="col-12 products-cart-offcanvas-list-mobile card shadow w-100 h-75"
                            v-if="cart.length > 0">
                            <!-- Cart Card Body -->
                            <div class="card-body">
                                <!-- Card Body Products List -->
                                <div v-for="(product, index) in cartWithQuantity" :key="index"
                                    class="row justify-content-between border-bottom py-3">
                                    <!-- Product Name -->
                                    <div class="col-8 pe-5">
                                        <span class="d-inline-block">{{ product.name }}</span>
                                    </div>
                                    <!-- Product Quantity Counter and Quantity Button -->
                                    <div class="col-4 d-flex justify-content-end align-items-center p-0">
                                        <!-- Decrease Quantity Button -->
                                        <button class="btn btn-sm border-0 p-0 mx-1"
                                            @click="decreaseCartQuantity(product.id)">
                                            <i class="fa-solid fa-circle-minus fa-lg"></i>
                                        </button>
                                        <!-- Quantity Counter -->
                                        <span class="fs-5 mx-2">{{ product.quantity }}</span>
                                        <!-- Increase Quantity Button -->
                                        <button class="btn btn-sm border-0 p-0 mx-1" @click="increaseCartQuantity(product)"
                                            :disabled="product.quantity >= maxQuantity">
                                            <i class="fa-solid fa-circle-plus fa-lg"></i>
                                        </button>
                                        <!-- Delete Product Button -->
                                        <button class="btn btn-sm btn-danger ms-3" @click="deleteCartProduct(product.id)">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                    <!-- Product Sub Total Price -->
                                    <div class="col-12 text-end pt-4">
                                        <span class="fs-6 fw-bold">{{ subTotal(product.price, product.quantity) }}€</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cart Col -->
                        <div class="col-12 text-center w-100 h-25" v-if="cart.length > 0">
                            <!-- Total Amount -->
                            <div class="pt-3">
                                <span class="fs-5">Totale: </span>
                                <span class="fw-bold fs-5"> {{ totalAmount }}€</span>
                            </div>
                            <!-- Check Out Button -->
                            <router-link class="d-block btn btn-success py-2 my-2"
                                :to="{ name: 'check-out', params: { slug: restaurant.slug } }">Vai al
                                checkout</router-link>
                            <!-- Clear Cart Button -->
                            <button class="btn btn-danger" @click="clearCart()">Svuota carrello</button>
                        </div>
                        <!-- Empty Cart Col -->
                        <div class="col-12 my-5 py-5" v-else>
                            <h3 class="text-center">Il tuo carrello è vuoto</h3>
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

// LAYOUT MAIN

.single-restaurant-products-cart {
    position: sticky !important;
    top: 100px;
    z-index: 1;
}

// END LAYOUT MAIN


// RESTAURANT DETAILS

.image-restaurant {
    height: 60vh;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}

// END RESTAURANT DETAILS


// PRODUCTS DETAILS

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

// END PRODUCTS DETAILS


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
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
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            maxQuantity: 100,
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
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col-12">
                    <!-- Restaurant Image Full Page -->
                    <div class="image-restaurant"></div>
                </div>
            </div>
        </div>
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8 shadow">
                    <div class="text-center p-3 my-3">
                        <!-- Placeholder Image -->
                        <img src="../assets/placeholder-image.png" alt="placeholder-image" class="img-fluid logo-ristorante"
                            v-if="!restaurant.cover_image" />
                        <!-- Restaurant Image -->
                        <img :src="`${store.baseUrl}/storage/${restaurant.cover_image}`" class="img-fluid logo-ristorante"
                            :alt="`${restaurant.slug}-logo`" v-else>
                        <h1>{{ restaurant.name }}</h1>
                        <p>{{ restaurant.address }}</p>
                    </div>
                    <div class="row">
                        <div class="d-flex justify-content-center m-4"
                            v-if="restaurant.products && restaurant.products.length === 0">
                            <h3>Non ci sono prodotti disponibili per questo ristorante</h3>
                        </div>
                        <div class="d-flex justify-content-center" v-else>
                            <div class="col-12 col-md-4 col-lg-4 bg-alert p-3" v-for="product in restaurant.products"
                                :key="product.id" @click="addToCart(product)">
                                <div class="card border-0">
                                    <!-- Placeholder Image -->
                                    <img src="../assets/placeholder-image.png" alt="placeholder-image"
                                        class="card-img-top border border-black rounded-top-5"
                                        v-if="!product.cover_image" />
                                    <!-- Product Image -->
                                    <img :src="`${store.baseUrl}/storage/${product.cover_image}`"
                                        class="card-img-top border border-black rounded-top-5" alt="product-image" v-else>
                                    <div class="card-body border border-black p-3">
                                        <p>{{ product.name }}</p>
                                        <p>{{ product.description }}</p>
                                        <p>{{ product.price }}€</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Carrello versione desktop -->
                <div class="col-4 d-none d-lg-block">
                    <div class="text-center text-white p-3 py-5">
                        <div class="card">
                            <div v-if="cart.length > 0">
                                <h1>Il tuo carrello</h1>
                                <div class="card-body">
                                    <div class="text-center my-5" v-for="(item, index) in cartWithQuantity" :key="index">
                                        <h5 class="d-inline-block">
                                            {{ item.name }} x{{ item.quantity }}
                                        </h5>
                                        <button @click="removeFromCart(item.id)" class="btn" style="color: #f00a0a;">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <h4>Totale: {{ totalAmount }} €</h4>
                                <router-link class="btn btn-success my-2" :to="{ name: 'payment' }">Vai al
                                    checkout</router-link>
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
                            <!-- <span>14</span> -->
                        </div>
                        <span class="px-2">Hai ordinato tot prezzo</span>
                    </div>
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Visualizza carrello</button>
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
                        <div class="card-body">
                            <div v-if="cart.length > 0">
                                <div class="text-center my-5" v-for="(item, index) in cartWithQuantity" :key="index">
                                    <h5 class="d-inline-block">{{ item.name }} x{{ item.quantity }}</h5>
                                    <!-- <button @click="removeFromCart(index)" class="btn">
                                        <i class="fa-solid fa-trash" style="color: #f00a0a;"></i>
                                    </button> -->
                                </div>
                            </div>
                            <div class="text-center p-5" v-else>
                                <h3>Il carrello è vuoto</h3>
                            </div>
                            <h4 class="text-center mt-5" v-if="cart.length > 0">Totale: {{ totalAmount }} €</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center my-3">
                            <button @click="clearCart()" class="btn btn-danger my-2 w-50" v-if="cart.length > 0">Pulisci il
                                carrello</button>
                            <button class="btn btn-success p-3 w-100" v-if="cart.length > 0">Effettua pagamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
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
    width: 200px;
}

.menù {
    background-color: yellow;
}
</style>
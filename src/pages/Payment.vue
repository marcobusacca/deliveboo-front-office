<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            store,
            cart: []
        }
    },
    mounted() {
        this.getCart()
    },
    methods: {
        getCart() {
            this.store.loading = true;
            const cart = JSON.parse(localStorage.getItem('cart'));

            if (cart) {
                this.cart = cart
                this.store.loading = false;
            }
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

}
</script>

<template>
    <div class="container-fluid" v-if="!store.loading">
        <div class="row">
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
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;
</style>
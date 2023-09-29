<!-- JAVASCRIPT & VUE.JS -->
<script>
import CheckForm from '../components/CheckForm.vue';
import { store } from '../store';
export default {
    props: ['slug'],
    components: {
        CheckForm,
    },
    data() {
        return {
            store,
            cartKey: `cart_${this.slug}`,
            cart: [],
        }
    },
    mounted() {
        this.setLoadingFalse();
        this.getCartData()
    },
    methods: {
        setLoadingFalse() {
            this.store.loading = false;
        },
        getCartData() {
            const cartData = localStorage.getItem(this.cartKey);
            if (cartData) {
                this.cart = JSON.parse(cartData);
            }
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div class="container my-5">
        <div class="row justify-content-center">
            <CheckForm :cart = "cart"/>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
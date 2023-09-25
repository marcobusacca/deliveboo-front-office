<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
           
            store,
            restaurants: []
        }
    },
    mounted() {
        const typeId = this.$route.params.type_id;
        this.getRestaurantsByTypeId(typeId);
    },
    methods: {
        getRestaurantsByTypeId(typeId) {
            axios.get(`${store.baseUrl}/api/types/${typeId}`)
                .then(response => {
                    this.type = response.data.results;
                    this.restaurants = response.data.results.restaurants;
                })
                .catch(error => {
                    console.error('Errore nella chiamata API:', error);
                });
        }
    }
}

</script>

<template>

    <div class="container">
        <div class="row d-flex flex-column align-items-center">
            <div class="col-12 d-flex flex-row justify-content-center flex-wrap" v-if="restaurants.length > 0">
                <div class="card card-size my-3 mx-3" v-for="(item, index) in restaurants" :key="index">
                    <img :src="`${store.baseUrl}/storage/${item.cover_image}`" alt="Immagine del ristorante"
                        class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <h6>{{ item.address }}</h6>
                        <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                    </div>
                </div>
            </div>
            <div class="col-12 my-5" v-else>
                <h2>Nessun ristorante trovato</h2>
            </div>
            <div class="d-flex">
                <router-link class="btn btn-sm btn-primary" :to="{ name: 'home' }">Torna Indietro</router-link>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.card-size {
    width: 18rem;
}
</style>
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            store,
            restaurants: [],
            types_restaurants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }
    },
    mounted() {
    },
    methods: {
        getRestaurantsByTypeId(typeId) {
            const promises = typeId.map(type_id => {
                return axios.get(`${store.baseUrl}/api/types/${type_id}`)
                    .then(response => response.data.results)
                    .catch(error => {
                        console.error(`Errore nella chiamata API per type_id ${type_id}:`, error);
                        return [];
                    });
            });

            Promise.all(promises)
                .then(results => {
                    const allRestaurants = results.flat();
                    const uniqueRestaurants = {};

                    allRestaurants.forEach(restaurant => {
                        uniqueRestaurants[restaurant.id] = restaurant;
                    });

                    this.restaurants = Object.values(uniqueRestaurants);
                });
        }
    },
}
</script>

<template>
    <div class="col-12 d-flex flex-row justify-content-center flex-wrap">
        <div class="card my-3 card-size mx-3" v-for="(item, index) in restaurants" :key="index">
            <img :src="`${store.baseUrl}/storage/${item.cover_image}`" alt="Immagine del ristorante" class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <h6>{{ item.address }}</h6>
                <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
<script>
    import { store } from '../store';
    import axios from 'axios'; // Importa axios se non l'hai già fatto
    
    export default {
        data() {
            return {
                store,
                types: [] // Inizializza un array vuoto per le tipologie
            }
        },
        mounted() {
            // Chiamata alla funzione per ottenere le tipologie dei ristoranti
            this.getRestaurantTypes();
        },
        methods: {
            getRestaurantTypes() {
                axios.get(`${store.baseUrl}/api/types`).then((response) => {
                    this.types = response.data.results;
                }).catch((error) => {
                    console.error('Errore nella chiamata API:', error);
                });
            },
        }
    }
</script>
    
<template>
        <main>
            <div class="container-fluid size-container">
                <div class="container mt-5 pb-5">
                    <div class="row">
                        <div class="col-12">
                            <div class="container-text-main p-3 bg-white shadow mb-2">
                                <div class="text-main px-4 py-2 shadow mb-2 text-white w-75">
                                    <h3>Scegli la tipologia di ristorante che vuoi ordinare</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 col-md-2" v-for="(type, index) in types" :key="index">
                                    <div class="card my-3">
                                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" alt="Immagine del ristorante"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{{ type.name }}</h5>
                                            <!-- Altre informazioni sulla tipologia di ristorante, se necessario -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
</template>
    
<style lang="scss">
    @use '../styles/generals.scss' as *;
    
    .container-text-main{
        border-radius: 40px;
    }
    
    .text-main{
        border: 1px solid rgb(95, 95, 95);
        border-radius: 40px;
        background-color: #FF8100;
    }
    
    .type-title {
        font-size: 1.5em;
        font-weight: bold;
        color: #333;
    }
    
    .type-description {
        font-size: 1em;
        line-height: 1.6;
        color: #555;
    }
    
    
    .col-image {
        position: relative;
    
        .buttons {
            position: absolute;
            top: 50%;
        }
    }
    
    
    .size-container {
        padding-top: 150px;
        background-image: url('../assets/bg-home/4.png');
        background-size: cover;
        background-repeat: no-repeat;
    }
    
    .bg-orange {
        background-color: orange;
    
        .bg-white {
            background-color: white;
            border-radius: 10px;
        }
    }
    
    
</style>
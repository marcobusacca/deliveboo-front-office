<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            currentSlideIndex: 0,
            store,
            types: [],
            types_info: [
                {
                    title: 'Trattoria',
                    description: 'Una trattoria è un\'accogliente osteria italiana che serve piatti casalinghi preparati con ingredienti freschi e di alta qualità. Qui puoi gustare autentiche specialità regionali, come pasta fatta in casa, risotti e arrosti tradizionali.'
                },
                {
                    title: 'Messicano',
                    description: 'Un ristorante messicano ti porta in un viaggio culinario attraverso i sapori audaci e speziati del Messico. Dai tacos agli enchiladas, ogni piatto è una festa di colori e sapori autentici, spesso accompagnati da guacamole e salse fatte in casa.'
                },
                {
                    title: 'Pizzeria',
                    description: 'Una pizzeria tradizionale è il luogo perfetto per gli amanti della pizza autentica italiana. Le pizze sono cotte in forni a legna, garantendo una crosta croccante e un sapore irresistibile. Scegli tra una vasta selezione di gusti e ingredienti freschi.'
                },
                {
                    title: 'Steakhouse',
                    description: 'Una steakhouse di alta qualità è il paradiso per gli appassionati di carne. Qui puoi gustare succulente bistecche preparate con cura, selezionate tra i tagli migliori e accompagnate da contorni deliziosi e salse esclusive.'
                },
                {
                    title: 'Cinese',
                    description: 'Un ristorante cinese autentico ti offre un\'esperienza culinaria che abbraccia la diversità della cucina cinese. Dalle delicate dim sum ai piatti principali come l\'anatra alla pechinese, ogni portata è un viaggio attraverso le tradizioni gustative della Cina.'
                },
                {
                    title: 'Sushi',
                    description: 'Il nostro sushi bar raffinato offre un\'ampia selezione di prelibatezze giapponesi. Ogni pezzo di sushi e sashimi è preparato con maestria, utilizzando solo i migliori ingredienti freschi e serviti con arte e precisione.'
                },
                {
                    title: 'Fast Food',
                    description: 'Il nostro fast food gourmet offre una versione raffinata dei tuoi piatti preferiti. Qui puoi gustare hamburger artigianali, patatine fritte croccanti e altri deliziosi comfort food, preparati con ingredienti di alta qualità.'
                },
                {
                    title: 'Gelateria',
                    description: 'La nostra gelateria artigianale è il posto ideale per gli amanti del gelato. Ogni gusto è preparato con cura utilizzando ingredienti freschi e genuini. Scegli tra una varietà di gusti irresistibili e goditi il vero sapore dell\'Italia.'
                },
                {
                    title: 'Kebab',
                    description: ' Il nostro ristorante kebab fusion offre un\'interpretazione creativa dei piatti tradizionali del Medio Oriente. Le pietanze sono preparate con ingredienti freschi e spezie aromatiche, creando sapori unici e appaganti.'
                },
                {
                    title: 'Pasticceria',
                    description: 'La nostra pasticceria artigianale ti delizia con una selezione di dolci prelibati e prodotti da forno freschi di giornata. Da torte decorate a pasticcini deliziosi, ogni dolce è un capolavoro di gusto e creatività.'
                },
                {
                    title: 'Piadineria',
                    description: 'La nostra piadineria contemporanea offre un\'interpretazione moderna di un classico italiano. Le piadine sono preparate al momento con ingredienti freschi e riempite con una varietà di gustosi condimenti, creando un\'esperienza culinaria unica.'
                }
            ]
        }
    },
    created() {
        this.getRestaurantTypes();
    },
    methods: {
        getRestaurantTypes() {
            axios.get(`${store.baseUrl}/api/types`).then((response) => {
                this.types = response.data.results;

            })
            console.log(this.types)
        },
        nextSlide() {
            if (this.currentSlideIndex < this.types.length - 1) {
                this.currentSlideIndex++;
            } else {
                this.currentSlideIndex = 0;
            }

            if (this.currentSlideIndex < this.types_info.length - 1) {
                this.currentSlideIndex++;
            } else {
                this.currentSlideIndex = 0;
            }
        },
        prevSlide() {
            if (this.currentSlideIndex > 0) {
                this.currentSlideIndex--;
            } else {
                this.currentSlideIndex = this.types.length - 1;
            }

            if (this.currentSlideIndex > 0) {
                this.currentSlideIndex--;
            } else {
                this.currentSlideIndex = this.types_info.length - 1;
            }
        }
    },
}
</script>

<!-- TEMPLATE HTML -->

<template>
    <main>
        <div class="container-fluid size-container">
            <div class="row justify-content-center align-items-center py-5 h-100">
                <div class="col-12 mt-5 d-flex justify-content-center align-items-center">
                    <div class="search-bar rounded d-flex justify-content-center align-items-center">
                        <div class="search-image">
                            <img src="../assets/hamburger.png" alt="logo-hamburger">
                        </div>
                        <div class="input-group rounded-pill p-2">
                            <input type="text" class="form-control rounded-pill border-0 p-2"
                                placeholder="Cerca il tuo ristorante...">
                            <button class="btn search-button btn-success rounded-pill" type="submit">Vai</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mt-5">
                    <div class="title">
                        <h3 class="text-center fw-bold font-size-15">
                            Le cucine più richieste
                        </h3>
                    </div>
                </div>
            </div>
            <!-- <div class="row justify-content-center">
                <div class="col-md-2 col-12 d-flex flex-column justify-content-center align-items-center"
                    v-for="(type, index) in types" :key="index">
                    <div class="card border-0 my-3 card-size">
                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="card-img-top" alt="logo">
                        <div class="card-body bg-orange">
                            <h6 class="card-text text-center bg-white">{{ type.name }}</h6>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="row justify-content-center">
                <div class="card w-50 px-0">
                    <div class="col-12 d-flex">
                        <div class="col-4 bg-left">
                            <div v-for="(item, index) in types_info" :key="index" class="type-info">
                                <div v-if="index === currentSlideIndex">
                                    <h3 class="type-title">{{ item.title }}</h3>
                                    <p class="type-description">{{ item.description }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-8 col-image">
                            <div class="buttons w-100">
                                <div class="button-next-prev d-flex justify-content-between">
                                    <button @click="prevSlide" class="btn">
                                        <i class="fa-solid fa-angle-left fa-xl"></i>
                                    </button>

                                    <button @click="nextSlide" class="btn">
                                        <i class="fa-solid fa-chevron-right fa-xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-for="(type, index) in types" :key="index">
                                <div class="col-12 d-flex flex-column justify-content-center align-items-center"
                                    v-if="index === currentSlideIndex">
                                    <div class="border-0">
                                        <img :src="`${store.baseUrl}/storage/${type.cover_image}`" class="img-fluid"
                                            alt="logo">
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

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.bg-left {
    background-color: orange;
    text-align: center;
    padding: 15px;
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

.card-size {
    width: 24rem;
}

.size-container {
    min-height: 100vh;
    background-image: url('../assets/bg-homepage.jpg');
    background-size: contain;
}

.bg-orange {
    background-color: orange;

    .bg-white {
        background-color: white;
        border-radius: 10px;
    }
}

.search-bar {
    position: relative;
    background-color: green;
    height: 140px;
    width: 60%;
    padding-right: 250px;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.912);

    .search-image {
        position: absolute;
        left: 70%;
        bottom: 5%;

        img {
            width: 100%;
        }
    }
}

.input-group {
    margin-left: 50px;
    width: 500px;
    border: 15px solid white;
    background-color: white;
}

.input-group input {
    border: none;
}

.search-button {
    background-color: green;
    color: white;
    cursor: pointer;
    border: none;
}
</style>
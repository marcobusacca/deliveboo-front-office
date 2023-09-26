<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            currentIndex: 0,
            numVisibleSlides: 4,
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
            if (this.currentIndex < this.types.length - this.numVisibleSlides) {
                this.currentIndex++;
            }
        },
        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
    }
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <div class="mt-4">
        <div class="row">
            <div class="col-12 body-carousel">
                <div class="carousel d-flex justify-content-center" ref="carousel">
                    <div class="wrapper d-flex">
                        <img v-for="(type, index) in types" :key="index"
                            :src="`${store.baseUrl}/storage/${type.cover_image}`" alt="slide"
                            class="carousel-image rounded-5 mx-4"
                            v-show="index >= currentIndex && index < currentIndex + numVisibleSlides" />
                        <div class="buttons d-flex justify-content-between">
                            <button class="btn-custom-left" @click="prevSlide" :disabled="currentIndex === 0">
                                <i class="fa-solid fa-chevron-left fa-xl"></i>
                            </button>
                            <button class="btn-custom-right" @click="nextSlide"
                                :disabled="currentIndex >= types.length - numVisibleSlides">
                                <i class="fa-solid fa-chevron-right fa-xl"></i>
                            </button>
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

.carousel {
    overflow: hidden;
    position: relative;
    width: 100%;
}


.wrapper {
    max-width: 100%;
}

.carousel-image {
    width: 100%;
    max-width: 240px;
    height: auto;
    object-fit: cover;
}



.buttons {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-custom-left,
    .btn-custom-right {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ffffff;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-custom-left:hover,
    .btn-custom-right:hover {
        background-color: #f0f0f0;
    }

    .fa-chevron-left,
    .fa-chevron-right {
        font-size: 24px;
        color: #333333;
    }
}
</style>
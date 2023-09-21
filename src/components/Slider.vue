<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            isDragging: false,
            startPosition: null,
            currentTranslate: 0,
            prevTranslate: 0,
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

<template>
    <div>
        <div class="row">
            <div class="col-12 body-carousel">
                <div class="carousel d-flex justify-content-center" ref="carousel">
                    <div class="wrapper">
                        <div class="">
                            <img v-for="(type, index) in types" :key="index"
                                :src="`${store.baseUrl}/storage/${type.cover_image}`" alt="slide"
                                class="carousel-image rounded-5 mx-4"
                                v-show="index >= currentIndex && index < currentIndex + numVisibleSlides" />
                        </div>
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

<style lang="scss">
@use '../styles/generals.scss' as *;

.carousel {
    font-size: 0;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
}

.wrapper {
    max-width: 1200px;
    transition: transform 0.3s ease-in-out;
    position: relative;
}


.carousel-image {
    width: 240px;
    height: 160px;
    object-fit: cover;
}

.buttons {
    position: relative;
    /* Al centro verticalmente rispetto alle immagini */
    width: 100%;
    text-align: center;

    .btn-custom-left {
        position: absolute;
        left: -4%;
        bottom: 100%;
        transform: translate(25%, -100%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .btn-custom-right {
        position: absolute;
        right: -5%;
        bottom: 100%;
        transform: translate(-15%, -100%);
        width: 40px;
        height: 40px;
        border-radius: 50%;

    }
}
</style>
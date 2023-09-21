<!-- JAVASCRIPT & VUE.JS -->
<script>
import Slider from './Slider.vue';
import { store } from '../store';
export default {
    components: {
        Slider
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <main>
        <div class="container-fluid size-container">
            <div class="container">
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
                <Slider />
            </div>
        </div>
    </main>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;




// .body-carousel {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     padding: 0 10px;
// }

// .wrapper .carousel {
//     font-size: 0px;
//     overflow: hidden;
//     white-space: nowrap;
//     cursor: pointer;
// }

// .wrapper {
//     max-width: 1200px;
// }

// .carousel img {
//     height: 340px;
//     object-fit: cover;
//     margin-left: 14px;
//     width: calc(100% / 3);
// }

// .carousel-image.active-slide {
//     border: 2px solid #007bff;
// }

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
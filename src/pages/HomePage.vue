<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';

import axios from 'axios';

export default {
    data() {
        return {
            store,
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <div class="container-fluid size">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 d-flex justify-content-center align-items-center">
                <div class="search-bar rounded-pill d-flex justify-content-center align-items-center">
                    <div class="search-image">
                        <img src="../assets/hamburger.png" alt="logo-hamburger">
                    </div>
                    <div class="input-group rounded-pill p-2">
                        <input type="text" class="form-control rounded-pill border-0"
                            placeholder="Cerca il tuo ristorante...">
                        <button class="btn search-button btn-success rounded-pill" type="submit">Vai</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.size {
    height: 100vh;
    background-image: url('../assets/bg-homepage.jpg');
}

// PER DARE OPACITA' ALLO SFONDO
// .size::before {
//     content: "";
//     background-image: url('../assets/bg-homepage.jpg');
//     background-size: contain;
//     opacity: 0.7;
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: -1;
// }

.search-bar {
    position: relative;
    background-color: green;
    height: 140px;
    width: 55%;
    padding-right: 250px;

    .search-image {
        position: absolute;
        left: 65%;
        bottom: 5%;

        img {
            width: 100%;
        }
    }
}

.input-group {
    width: 550px;
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
import { createRouter, createWebHistory } from 'vue-router';

// IMPORTARE TUTTE LE PAGINE DALLA CARTELLA "PAGES"
import HomePage from './pages/HomePage.vue';
import SearchRestaurant from './pages/SearchRestaurant.vue';

// CREIAMO IL ROUTER CON LE SUE ROTTE
const router = createRouter({

    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },

        {
            path: '/search-restaurant',
            name: 'search-restaurant',
            component: SearchRestaurant,
        },
    ]

})

// ESPORTIAMO IL ROUTER
export { router }
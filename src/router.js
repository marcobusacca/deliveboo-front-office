import { createRouter, createWebHistory } from 'vue-router';

// IMPORTARE TUTTE LE PAGINE DALLA CARTELLA "PAGES"
import HomePage from './pages/HomePage.vue';
import SearchRestaurant from './pages/SearchRestaurant.vue';
import AboutUs from './pages/AboutUs.vue';

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
        {
            path: '/about-us',
            name: 'about-us',
            component: AboutUs,
        },
    
    ]

})

// ESPORTIAMO IL ROUTER
export { router }
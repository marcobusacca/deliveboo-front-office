import { createRouter, createWebHistory } from 'vue-router';

// IMPORTARE TUTTE LE PAGINE DALLA CARTELLA "PAGES"
import HomePage from './pages/HomePage.vue';
import AboutUs from './pages/AboutUs.vue';
import SearchRestaurant from './pages/SearchRestaurant.vue';
import Restaurant from './pages/Restaurant.vue';


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
            path: '/about-us',
            name: 'about-us',
            component: AboutUs,
        },
        {
            path: '/restaurants/:type_id',
            name: 'search-restaurant',
            component: SearchRestaurant,
            props: true
        },
        {
            path: '/restaurant',
            name: 'restaurant',
            component: Restaurant,
        },
    ]

})

// ESPORTIAMO IL ROUTER
export { router }
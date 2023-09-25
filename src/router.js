import { createRouter, createWebHistory } from 'vue-router';

// IMPORTARE TUTTE LE PAGINE DALLA CARTELLA "PAGES"
import HomePage from './pages/HomePage.vue';
import AboutUs from './pages/AboutUs.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';


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
            path: '/restaurants/:slug',
            name: 'single-restaurant',
            component: SingleRestaurant,
            props: true
        },
    ]

})

// ESPORTIAMO IL ROUTER
export { router }
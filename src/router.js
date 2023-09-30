import { createRouter, createWebHistory } from 'vue-router';

// IMPORTARE TUTTE LE PAGINE DALLA CARTELLA "PAGES"
import HomePage from './pages/HomePage.vue';

import AboutUs from './pages/AboutUs.vue';

import SingleRestaurant from './pages/SingleRestaurant.vue';

import CheckOut from './pages/CheckOut.vue';

import OrderCompleted from './pages/OrderCompleted.vue';

import OrderFailed from './pages/OrderFailed.vue';

import NotFound from './pages/NotFound.vue';


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
        {
            path: '/restaurants/:slug/check-out',
            name: 'check-out',
            component: CheckOut,
            props: true
        },
        {
            path: '/order-completed',
            name: 'order-completed',
            component: OrderCompleted,
        },
        {
            path: '/order-failed',
            name: 'order-failed',
            component: OrderFailed,
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/pagina-non-trovata',
        },
        {
            path: '/pagina-non-trovata',
            name: 'not-found',
            component: NotFound,
        },
    ]

})

// ESPORTIAMO IL ROUTER
export { router }
import { createStore } from "vuex";

const store = createStore({
    state: {
        cart: [],
    },
    mutations: {
        addToCart(state, product) {
            state.cart.push(product);
        },
        removeFromCart(state, index) {
            state.cart.splice(index, 1);
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit('addToCart', product);
        },
        removeFromCart({ commit }, index) {
            commit('removeFromCart', index);
        },
    },
});

export default store;
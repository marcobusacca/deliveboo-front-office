<!-- JAVASCRIPT & VUE.JS -->
<script>
export default {
    data() {
        return {
            menuItems: [
                {
                    label: 'Home',
                    routeName: 'home',
                },
            ]
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <header>
        <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
            <router-link :to="{ name: item.routeName }" v-text="item.label" class="nav-link"></router-link>
        </li>
    </header>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
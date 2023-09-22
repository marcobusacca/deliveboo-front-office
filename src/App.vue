<!-- JAVASCRIPT & VUE.JS -->
<script>

export default {
    components: {
        AppHeader,
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <router-view></router-view>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use './styles/generals.scss' as *;
</style>
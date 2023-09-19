<!-- JAVASCRIPT & VUE.JS -->

<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template>
    <header>
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col-12">
                    <nav class="navbar navbar-expand-lg color px-5 d-flex justify-content-between">
                        <div class="container-fluid mx-5 my-3">
                            <router-link class="navbar-brand logo" :to="{ name: 'home' }">
                                <img src="../assets/deliveboo-2.png" alt="logo" class="d-inline-block align-text-top">
                            </router-link>
                            <div class="d-flex">
                                <a class="link-underline text-white link-underline-opacity-0 px-5" href="#">
                                    Accedi
                                </a>
                                <a class="link-underline text-white link-underline-opacity-0 px-5" href="#">
                                    Aiuto
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.color {
    background-color: #FF8100;
}

.logo {
    img {
        width: 150px;
    }
}
</style>
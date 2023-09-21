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
    <!-- Header Navbar -->
    <header>
        <nav class="top-bar navbar navbar-expand-md navbar-light shadow">
            <div class="container-fluid px-5">
                <div class="row w-100">
                    <div class="col-6">
                        <!-- Navbar Logo -->
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/">
                                    <img class="logo-deliveboo" src="../assets/deliveboo-1.png" alt="deliveboo-logo">
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <!-- Navbar Hamburger -->
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <!-- Navbar Item -->
                        <div class="collapse navbar-collapse d-flex justify-content-end align-items-center h-100 w-100" id="navbarSupportedContent">
                            <!-- Authentication Links -->
                            <ul class="navbar-nav ml-auto">
                                <!-- Login Link -->
                                <li class="nav-item">
                                    <a class="nav-link text-white" href="http://127.0.0.1:8000">Lavora con noi</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

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
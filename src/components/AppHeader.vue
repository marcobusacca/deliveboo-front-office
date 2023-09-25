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
        <!-- Header Navbar -->
        <nav class="navbar navbar-expand-lg shadow p-0 h-100">
            <div class="container-fluid navbar-container-fluid h-100">
                <!-- Navbar Logo -->
                <a class="navbar-brand" href="">
                    <img class="logo-deliveboo" src="../assets/deliveboo-1.png" alt="deliveboo-logo">
                </a>
                <!-- Navbar Hamburger -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Navbar Item -->
                <div class="collapse navbar-collapse navbar-item text-center" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- Login Link -->
                        <li class="nav-item">
                            <a class="nav-link text-white" href="http://127.0.0.1:8000">Lavora con noi</a>
                        </li>
                    </ul>
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
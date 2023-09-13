<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';

import axios from 'axios';

export default {
    data() {
        return {
            store,
        }
    },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div class="container mb-5">
        <div class="row">
            <div class="col-12">
                <h1>Homepage</h1>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
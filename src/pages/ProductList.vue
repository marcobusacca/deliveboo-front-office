<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            store
        }
    },
    mounted() {

    },
    methods: {
        getProducts() {
            axios.get(`${store.baseUrl}/api/types/${type_id}`)
        }
    },
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">

            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;
</style>
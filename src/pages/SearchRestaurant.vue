<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';
import axios from 'axios';
import AppMain from '../components/AppMain.vue';
import AppFooter from '../components/AppFooter.vue'

export default {
    components: {
        AppMain,
        AppFooter
    },
    data() {
        return {
            store,
        }
    },
}
</script>

    <!-- TEMPLATE HTML -->
    <template>
        <h1>ciao</h1>
    </template>
  
  

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';

import axios from 'axios';

export default {
    components: {

    },
    data() {
        return {
            store,

            loading: false,

            name: '',
            email: '',
            content: '',

            errors: {},
        }
    },
     methods: {
         sendForm() {

             this.loading = true;

              //SALVO I DATI DI INPUT DELL'UTENTE
             const form_data = {

                 name: this.name,
                 surname: this.surname,
                 email: this.email,
                 content: this.content,

             };

              //SVUOTO L'OGGETTO CONTENTE I MESSAGGI DI ERRORE
             this.errors = {};

              //EFFETTUIAMO LA CHIAMATA AXIOS IN POST
             axios.post(`${this.store.baseUrl}/api/contacts`, form_data).then((response) => {

                 if (response.data.success) {

                    //RIPULISCO I DATI DI INPUT
                     this.name = '';
                     this.email = '';
                     this.content = '';

                     this.loading = false;

                     this.$router.push({ name: 'thank-you' });

                 } else {

                    //SALVO I MESSAGGI DI ERRORE NELL'OGGETTO ERRORS
                     this.errors = response.data.errors;

                     this.loading = false;
                 }
             });
         }
     },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <!-- CONTACT FORM CARD -->
    <div class="col-12 my-5">
        <div class="row p-5">
            <!-- CONTACT FORM TITLE -->
            <div class="col-12">
                <h2 class="text-center">Contattaci</h2>
            </div>
            <!-- CONTACT FORM LAYOUT -->
            <div class="col-12">
                <form @submit.prevent="sendForm()" class="row">
                    <!-- NAME FORM GROUP -->
                    <div class="col-12 col-md-6 my-3">
                        <!-- NAME LABEL -->
                        <label class="control-label">Nome</label>
                        <!-- NAME INPUT -->
                        <input type="text" name="name" id="name" placeholder="Inserisci nome" v-model="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" required>
                        <!-- NAME ERRORS -->
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- SURNAME FORM GROUP -->
                    <div class="col-12 col-md-6 my-3">
                        <!-- SURNAME LABEL -->
                        <label class="control-label">Cognome</label>
                        <!-- SURNAME INPUT -->
                        <input type="text" name="surname" id="surname" placeholder="Inserisci cognome" v-model="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" required>
                        <!-- SURNAME ERRORS -->
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- EMAIL FORM GROUP -->
                    <div class="col-12 col-md-6 my-3">
                        <!-- EMAIL LABEL -->
                        <label class="control-label">Email</label>
                        <!-- EMAIL INPUT -->
                        <input type="email" name="email" id="email" placeholder="Inserisci email" v-model="email" class="form-control" :class="errors.email ? 'is-invalid' : ''" required>
                        <!-- EMAIL ERRORS -->
                        <span v-for="(error, index) in errors.email" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- CONTENT FORM GROUP -->
                    <div class="col-12 my-3">
                        <!-- CONTENT LABEL -->
                        <label class="control-label">Contenuto</label>
                        <!-- CONTENT TEXT AREA -->
                        <textarea name="content" id="content" placeholder="Inserisci il messaggio" v-model="content" class="form-control" :class="errors.content ? 'is-invalid' : ''" cols="30" rows="10" required></textarea>
                        <!-- CONTENT ERRORS -->
                        <span v-for="(error, index) in errors.content" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- FORM SUBMIT -->
                    <div class="col-12 text-center my-3">
                        <!-- SUBMIT BUTTON -->
                        <button type="submit" class="btn btn-info btn-bool-pet-care text-white" :disabled="loading">{{ loading ? 'Invio in corso' : 'Invia' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
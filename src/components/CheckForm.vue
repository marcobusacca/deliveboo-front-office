<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';

import axios from 'axios';

export default {
    props: ['cart'],
    components: {

    },
    data() {
        return {
            store,
            loading: false,

            name: '',
            surname: '',
            phone: '',
            email: '',
            address: '',
            intercom: '',
            note: '',

            errors: {},
        }
    },
    mounted() {
        this.getCart()
    },
    methods: {
        sendForm() {

            this.loading = true;

            //SALVO I DATI DI INPUT DELL'UTENTE
            const form_data = {

                name: this.name,
                surname: this.surname,
                phone: this.phone,
                email: this.email,
                address: this.address,
                intercom: this.intercom,
                note: this.note,

            };

            //SVUOTO L'OGGETTO CONTENTE I MESSAGGI DI ERRORE
            this.errors = {};

            //EFFETTUIAMO LA CHIAMATA AXIOS IN POST
            axios.post(`${this.store.baseUrl}/api/`, form_data).then((response) => {

                if (response.data.success) {

                    //RIPULISCO I DATI DI INPUT
                    this.name = '';
                    this.surname = '';
                    this.phone = '';
                    this.email = '';
                    this.address = '';
                    this.intercom = '';
                    this.note = '';

                    this.loading = false;

                    this.$router.push({ name: 'thank-you' });

                } else {

                    //SALVO I MESSAGGI DI ERRORE NELL'OGGETTO ERRORS
                    this.errors = response.data.errors;

                    this.loading = false;
                }
            });
        },
        getCart() {
            this.store.loading = true;
            const cart = JSON.parse(localStorage.getItem(this.cart));

            if (cart) {
                this.cart = cart
                this.store.loading = false;
            }
        },
        subTotal(productPrice, productQuantity) {
            return (parseFloat(productPrice) * productQuantity).toFixed(2);
        }
    },
    computed: {
        totalAmount() {
            return this.cart.reduce(
                (total, item) =>
                    total + parseFloat(item.price) * item.quantity,
                0
            ).toFixed(2);
        },

        cartWithQuantity() {
            const cartMap = new Map();
            this.cart.forEach(item => {
                if (cartMap.has(item.id)) {
                    cartMap.get(item.id).quantity += item.quantity;
                } else {
                    cartMap.set(item.id, { ...item });
                }
            });
            return Array.from(cartMap.values());
        },
    },
}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div class="col-12 col-lg-4 card shadow mx-2 p-3 mb-3">
        <h3>Dettagli del tuo ordine</h3>
        <div class="container">
            <div class="row">
                <div class="col d-flex flex-column align-items-start justify-content-center" v-if="cart.length > 0">
                    <div class="d-flex my-3" v-for="(item, index) in cartWithQuantity" :key="index">
                        <div class="text-center my-5">
                            <h5 class="d-inline-block">
                                {{ item.name }}
                            </h5>
                            <h6 class="d-flex">
                                Quantità: {{ item.quantity }}
                            </h6>
                            <h6 class="d-flex">
                                Subtotale: {{ subTotal(item.price, item.quantity)}}€
                            </h6>
                        </div>
                        <hr>
                    </div>
                    <h4>Totale: {{ totalAmount }} €</h4>
                    <!-- <router-link class="btn btn-success my-2" :to="{ name: 'payment' }">Vai al
                        checkout</router-link> -->
                </div>
                <div class="col p-5" v-else>
                    <h3>Il carrello è vuoto</h3>
                </div>  
            </div>
            <div class="row">
                 <!-- NOTE FORM GROUP -->
                 <div class="col-12 my-2">
                    <!-- NOTE LABEL -->
                    <label class="control-label fw-bold py-2">Note</label>
                    <!-- NOTE TEXT AREA -->
                    <textarea name="content" id="content" placeholder="Note per il ristorante e/o per il rider" v-model="content" class="form-control" :class="errors.content ? 'is-invalid' : ''" cols="30" rows="10" required></textarea>
                    <!-- NOTE ERRORS -->
                    <span v-for="(error, index) in errors.content" :key="index" class="text-danger">{{ error }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-6 card shadow p-3 mb-3">
        <h3>Inserisci i tuoi dati</h3>
        <div class="container">
            <div class="row">
                <!-- CONTACT FORM CARD -->
                <div class="col-12 my-5">
                    <!-- CONTACT FORM LAYOUT -->
                    <form @submit.prevent="sendForm()" class="row">
                        <!-- NAME FORM GROUP -->
                        <div class="col-12 col-lg-6 my-2">
                            <!-- NAME LABEL -->
                            <label class="control-label fw-bold py-2">Nome*</label>
                            <!-- NAME INPUT -->
                            <input type="text" name="name" id="name" placeholder="Inserisci nome" v-model="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" required>
                            <!-- NAME ERRORS -->
                            <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- SURNAME FORM GROUP -->
                        <div class="col-12 col-lg-6 my-2">
                            <!-- SURNAME LABEL -->
                            <label class="control-label fw-bold py-2">Cognome*</label>
                            <!-- SURNAME INPUT -->
                            <input type="text" name="surname" id="surname" placeholder="Inserisci cognome" v-model="surname" class="form-control" :class="errors.surname ? 'is-invalid' : ''" required>
                            <!-- SURNAME ERRORS -->
                            <span v-for="(error, index) in errors.surname" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- PHONE FORM GROUP -->
                        <div class="col-12 col-lg-6 my-2">
                            <!-- PHONE LABEL -->
                            <label class="control-label fw-bold py-2">Telefono*</label>
                            <!-- PHONE INPUT -->
                            <input type="tel" name="telefono" id="telefono" placeholder="Inserisci numero di telefono" v-model="phone" class="form-control" :class="errors.phone ? 'is-invalid' : ''" required>
                            <!-- PHONE ERRORS -->
                            <span v-for="(error, index) in errors.phone" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- EMAIL FORM GROUP -->
                        <div class="col-12 col-lg-6 my-2">
                            <!-- EMAIL LABEL -->
                            <label class="control-label fw-bold py-2">Email*</label>
                            <!-- EMAIL INPUT -->
                            <input type="email" name="email" id="email" placeholder="Inserisci email" v-model="email" class="form-control" :class="errors.email ? 'is-invalid' : ''" required>
                            <!-- EMAIL ERRORS -->
                            <span v-for="(error, index) in errors.email" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- ADDRESS FORM GROUP -->
                        <div class="col-12 col-lg-6 my-2">
                            <!-- ADDRESS LABEL -->
                            <label class="control-label fw-bold py-2">Indirizzo*</label>
                            <!-- ADDRESS INPUT -->
                            <input type="email" name="address" id="address" placeholder="Indirizzo" v-model="address" class="form-control" :class="errors.address ? 'is-invalid' : ''" required>
                            <!-- ADDRESS ERRORS -->
                            <span v-for="(error, index) in errors.address" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- INTERCOM FORM GROUP -->
                        <div class="col-12 col-lg-6 my-2">
                            <!-- INTERCOM LABEL -->
                            <label class="control-label fw-bold py-2">Citofono*</label>
                            <!-- INTERCOM INPUT -->
                            <input type="email" name="intercom" id="intercom" placeholder="Citofono" v-model="intercom" class="form-control" :class="errors.intercom ? 'is-invalid' : ''" required>
                            <!-- INTERCOM ERRORS -->
                            <span v-for="(error, index) in errors.intercom" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- NOTE FORM GROUP -->
                        <div class="col-12 my-2">
                            <!-- NOTE LABEL -->
                            <label class="control-label fw-bold py-2">Note*</label>
                            <!-- NOTE TEXT AREA -->
                            <input type="text" name="note" id="note" placeholder="Note per il ristorante e/o per il rider" v-model="note" class="form-control" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10" required>
                            <!-- NOTE ERRORS -->
                            <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <!-- PAYMENTS DATA, DA CAMBIARE LA DESCRIZIONE DEI CAMPI DI INPUT -->
                        <div class="col-12 my-2">
                            <!-- CREDIT CARD LABEL -->
                            <label class="control-label fw-bold py-2">Numero carta*</label>
                            <!-- CREDIT CARD TEXT AREA -->
                            <input type="text" name="note" id="note" placeholder="Inserisci il numero della carta" v-model="note" class="form-control py-3" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10" required>
                            <!-- CREDIT CARD ERRORS -->
                            <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <div class="col-4 my-2">
                            <!-- EXPIRATION DATE LABEL -->
                            <label class="control-label fw-bold py-2">Scadenza*</label>
                            <!-- EXPIRATION DATE TEXT AREA -->
                            <input type="text" name="note" id="note" placeholder="01/23" v-model="note" class="form-control py-3" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10" required>
                            <!-- EXPIRATION DATE ERRORS -->
                            <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                        </div>
                        <div class="col-4 my-2">
                            <!-- CVV LABEL -->
                            <label class="control-label fw-bold py-2">CVV*</label>
                            <!-- CVV TEXT AREA -->
                            <input type="text" name="note" id="note" placeholder="111" v-model="note" class="form-control py-3" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10" required>
                            <!-- CVV ERRORS -->
                            <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                        </div>

                        <!-- FORM SUBMIT -->
                        <div class="col-12 text-center my-2">
                            <!-- SUBMIT BUTTON -->
                            <button type="submit" class="btn btn-success deliveboo-green text-white" :disabled="loading">{{ loading ? 'Al pagamento' : 'Continua' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;
</style>
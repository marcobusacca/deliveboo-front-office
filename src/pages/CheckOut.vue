<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';

export default {
    props: ['slug'],
    data() {
        return {
            store,

            cartKey: `cart_${this.slug}`,

            cart: JSON.parse(localStorage.getItem(`cart_${this.slug}`)) || [],

            loading: false,

            amount: null,

            name: '',
            surname: '',
            // phone_number: '',
            email: '',
            // address: '',
            // notes: '',

            errors: {},
        }
    },
    methods: {
        subTotal(productPrice, productQuantity) {
            return (parseFloat(productPrice) * productQuantity).toFixed(2);
        },
        sendForm() {

            this.loading = true;

            //SALVO I DATI DI INPUT DELL'UTENTE
            const form_data = {
                name: this.name,
                surname: this.surname,
                email: this.email,
            };

            //SVUOTO L'OGGETTO CONTENTE I MESSAGGI DI ERRORE
            this.errors = {};

            //EFFETTUIAMO LA CHIAMATA AXIOS IN POST
            axios.post(`${this.store.baseUrl}/api/contacts`, form_data).then((response) => {

                if (response.data.success) {

                    //RIPULISCO I DATI DI INPUT
                    this.name = '';
                    this.surname = '';
                    this.email = '';

                    this.loading = false;

                    this.$router.push({ name: 'not-found' });

                } else {

                    //SALVO I MESSAGGI DI ERRORE NELL'OGGETTO ERRORS
                    this.errors = response.data.errors;

                    this.loading = false;
                }
            });
        },
    },
    computed: {
        totalAmount() {

            this.amount = this.cart.reduce(

                (total, item) =>
                    total + parseFloat(item.price) * item.quantity,
                0

            ).toFixed(2);

            return this.amount
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
    <div class="container my-5" v-if="!store.loading">
        <div class="row justify-content-center">
            <!-- Order Check-Out Cart Summary -->
            <div class="col-12 col-lg-4" v-if="cart.length > 0">
                <div class="check-form-products-cart card shadow p-3">
                    <div class="card-header bg-white text-center">
                        <h3>Riepilogo del tuo ordine</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-between align-items-center py-3" v-for="(item, index) in cartWithQuantity" :key="index">
                                <span class="mx-2">{{ item.name }} x{{ item.quantity }}</span>
                                <span class="fw-bold mx-2">{{ subTotal(item.price, item.quantity)}}€</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-white text-center pt-4">
                        <span class="fs-5">Totale: </span>
                        <span class="fs-5 fw-bold">{{ totalAmount }}€</span>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center py-5" v-else>
                <h3>Il carrello è vuoto</h3>
            </div>
            <!-- Order Check-Out Form -->
            <div class="col-12 col-lg-8" v-if="cart.length > 0">
                <div class="card shadow p-3">
                    <div class="card-header bg-white text-center">
                        <h3>Inserisci i tuoi dati</h3>
                    </div>
                    <div class="card-body">
                        <!-- CONTACT FORM LAYOUT -->
                        <form @submit.prevent="sendForm()" class="row">
                            <!-- NAME FORM GROUP -->
                            <div class="col-12 col-lg-6 my-2">
                                <!-- NAME LABEL -->
                                <label class="control-label fw-bold py-2">Nome *</label>
                                <!-- NAME INPUT -->
                                <input type="text" name="name" id="name" placeholder="Inserisci nome" v-model="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" required>
                                <!-- NAME ERRORS -->
                                <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                            <!-- SURNAME FORM GROUP -->
                            <div class="col-12 col-lg-6 my-2">
                                <!-- SURNAME LABEL -->
                                <label class="control-label fw-bold py-2">Cognome *</label>
                                <!-- SURNAME INPUT -->
                                <input type="text" name="surname" id="surname" placeholder="Inserisci cognome" v-model="surname" class="form-control" :class="errors.surname ? 'is-invalid' : ''" required>
                                <!-- SURNAME ERRORS -->
                                <span v-for="(error, index) in errors.surname" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                            <!-- PHONE FORM GROUP -->
                            <div class="col-12 col-lg-6 my-2">
                                <!-- PHONE LABEL -->
                                <label class="control-label fw-bold py-2">Telefono *</label>
                                <!-- PHONE INPUT -->
                                <input type="tel" name="phone_number" id="phone_number" placeholder="Inserisci numero di telefono" v-model="phone_number" class="form-control" :class="errors.phone ? 'is-invalid' : ''">
                                <!-- PHONE ERRORS -->
                                <span v-for="(error, index) in errors.phone" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                            <!-- EMAIL FORM GROUP -->
                            <div class="col-12 col-lg-6 my-2">
                                <!-- EMAIL LABEL -->
                                <label class="control-label fw-bold py-2">Email *</label>
                                <!-- EMAIL INPUT -->
                                <input type="email" name="email" id="email" placeholder="Inserisci email" v-model="email" class="form-control" :class="errors.email ? 'is-invalid' : ''" required>
                                <!-- EMAIL ERRORS -->
                                <span v-for="(error, index) in errors.email" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                            <!-- ADDRESS FORM GROUP -->
                            <div class="col-12 my-2">
                                <!-- ADDRESS LABEL -->
                                <label class="control-label fw-bold py-2">Indirizzo *</label>
                                <!-- ADDRESS INPUT -->
                                <input type="text" name="address" id="address" placeholder="Indirizzo" v-model="address" class="form-control" :class="errors.address ? 'is-invalid' : ''">
                                <!-- ADDRESS ERRORS -->
                                <span v-for="(error, index) in errors.address" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                            <!-- NOTE FORM GROUP -->
                            <div class="col-12 my-2">
                                <!-- NOTE LABEL -->
                                <label class="control-label fw-bold py-2">Note</label>
                                <!-- NOTE TEXT AREA -->
                                <textarea name="notes" id="notes" placeholder="Note per il ristorante e/o per il rider" v-model="notes" class="form-control" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10"></textarea>
                                <!-- NOTE ERRORS -->
                                <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                            <!-- PAYMENTS DATA FORM GROUP -->
                            <div class="col-12 py-4">
                                <div class="row justify-content-center">
                                    <!-- CREDIT CARD FORM GROUP -->
                                    <div class="col-12 my-2">
                                        <!-- CREDIT CARD LABEL -->
                                        <label class="control-label fw-bold py-2">Numero carta *</label>
                                        <!-- CREDIT CARD TEXT AREA -->
                                        <input type="text" name="card_number" id="card_number" placeholder="Inserisci il numero della carta" v-model="card_number" class="form-control py-3" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10">
                                        <!-- CREDIT CARD ERRORS -->
                                        <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                                    </div>
                                    <!-- EXPIRATION DATE FORM GROUP -->
                                    <div class="col-4 my-2">
                                        <!-- EXPIRATION DATE LABEL -->
                                        <label class="control-label fw-bold py-2">Scadenza *</label>
                                        <!-- EXPIRATION DATE TEXT AREA -->
                                        <input type="text" name="expiry_date" id="expiry_date" placeholder="01/23" v-model="expiry_date" class="form-control py-3" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10">
                                        <!-- EXPIRATION DATE ERRORS -->
                                        <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                                    </div>
                                    <!-- CVV FORM GROUP -->
                                    <div class="col-4 my-2">
                                        <!-- CVV LABEL -->
                                        <label class="control-label fw-bold py-2">CVV *</label>
                                        <!-- CVV TEXT AREA -->
                                        <input type="text" name="cvv" id="cvv" placeholder="000" v-model="cvv" class="form-control py-3" :class="errors.note ? 'is-invalid' : ''" cols="30" rows="10">
                                        <!-- CVV ERRORS -->
                                        <span v-for="(error, index) in errors.note" :key="index" class="text-danger">{{ error }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- FORM SUBMIT -->
                            <div class="col-12 text-center mt-3">
                                <!-- SUBMIT BUTTON -->
                                <button type="submit" class="btn btn-success deliveboo-green text-white" :disabled="loading">{{ loading ? 'Pagamento in corso' : 'Effettua pagamento' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
// IMPORTO GENERALS.SCSS
@use '../styles/generals.scss' as *;

.check-form-products-cart {
    margin-bottom: 20px;
}



/********** MEDIAQUERY **********/

//TABLET
@media screen and (min-width: 768px) {}

// DESKTOP
@media screen and (min-width: 992px) {

    .check-form-products-cart {
        position: sticky !important;
        top: 0;
        z-index: 1;
        margin-bottom: 20px;
    }
}
</style>
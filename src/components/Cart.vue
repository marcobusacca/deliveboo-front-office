<script>
export default {

}
</script>

<template>
    <!-- Carrello versione mobile -->
    <div class="container sticky-bottom bg-white d-block d-lg-none p-3">
        <div class="row">
            <div class="col-12 card p-3">
                <div class="cartel-mobile mb-2">
                    <div class="badge bg-primary rounded-pill px-2">
                        <i class="fa-solid fa-basket-shopping px-2"></i>
                        <span>14</span>
                    </div>
                    <span class="px-2">Hai ordinato tot prezzo</span>
                </div>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom">Visualizza carrello</button>
            </div>
        </div>
    </div>
    <!-- Carrello off canvas -->
    <div class="offcanvas offcanvas-bottom h-100 d-block d-lg-none overflow-y-auto" tabindex="-1" id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Il tuo carrello</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4 col-lg-3 mx-2 my-2 card p-3 bg-alert">
                        <div class="card border-0">
                            <div class="card-header p-0 border-0">
                                <img src="../assets/bacon.jpg" class="img-fluid rounded-top-1" alt="">
                            </div>
                            <div class="card-body p-3 rounded-bottom-1 border-0">
                                <p>Titolo piatto</p>
                                <p>Descrizione piatto</p>
                                <p>Prezzo</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-3 mx-2 my-2 card p-3 bg-alert">
                        <div class="card border-0">
                            <div class="card-header p-0 border-0">
                                <img src="../assets/bacon.jpg" class="img-fluid rounded-top-1" alt="">
                            </div>
                            <div class="card-body p-3 rounded-bottom-1 border-0">
                                <p>Titolo piatto</p>
                                <p>Descrizione piatto</p>
                                <p>Prezzo</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-3 mx-2 my-2 card p-3 bg-alert">
                        <div class="card border-0">
                            <div class="card-header p-0 border-0">
                                <img src="../assets/bacon.jpg" class="img-fluid rounded-top-1" alt="">
                            </div>
                            <div class="card-body p-3 rounded-bottom-1 border-0">
                                <p>Titolo piatto</p>
                                <p>Descrizione piatto</p>
                                <p>Prezzo</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-3 mx-2 my-2 card p-3 bg-alert">
                        <div class="card border-0">
                            <div class="card-header p-0 border-0">
                                <img src="../assets/bacon.jpg" class="img-fluid rounded-top-1" alt="">
                            </div>
                            <div class="card-body p-3 rounded-bottom-1 border-0">
                                <p>Titolo piatto</p>
                                <p>Descrizione piatto</p>
                                <p>Prezzo</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-primary p-3 w-100 mt-3">
                            Effettua pagamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/generals.scss' as *;
</style>
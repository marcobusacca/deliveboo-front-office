<script>
export default {
}
</script>

<template lang="">
    <section id="about">
        <div class="about-1">
            <h1>CHI SIAMO</h1>
            <p>
                In Deliveroo i nostri valori sono al centro di tutto ciò che facciamo. Sono la nostra cultura, la nostra mentalità e l’espressione di ciò che siamo come persone e come azienda quando diamo il meglio di noi. Considerateli come i nostri principi guida. Stabiliscono gli standard su come facciamo le cose, dal modo in cui ci parliamo, alle decisioni che prendiamo e persino alle persone che introduciamo nel team. In parole povere, sono la nostra tabella di marcia per ciò che è possibile.
            </p>
        </div>
        <div id="about-2">
            <div class="content-box-lg">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="about-item text-center">
                                <i class="fa-solid fa-timeline"></i>
                                <h3>LA NOSTRA STORIA</h3>
                                <p>Quando il fondatore e CEO di Deliveroo, Will Shu, si è trasferito a Londra nel 2013, ha scoperto una città piena di ottimi ristoranti, ma è rimasto stupito dal fatto che così pochi di loro consegnassero cibo. La sua missione personale è stata quella di portare i migliori ristoranti locali direttamente alle porte delle persone.

                                Oggi, Deliveroo gestisce un mercato iperlocale trilaterale, che collega consumatori locali, ristoranti, negozi di alimentari e ciclisti per realizzare un acquisto emotivo e mission-critical in meno di 30 minuti. Offrendo consegne rapide e affidabili che i consumatori possono monitorare online, Deliveroo è cresciuto rapidamente. Deliveroo ora opera in 10 mercati in tutto il mondo, collaborando con migliaia di ristoranti e negozi di alimentari, migliaia di passeggeri e servendo milioni di consumatori.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="about-item text-center">
                                <i class="fa-solid fa-users"></i>
                                <h3>CONSUMATORI</h3>
                                <p>La consegna del cibo è un business iperlocale. Pensiamo alla nostra offerta ai consumatori quartiere per quartiere.

                                    Abbiamo trascorso anni lavorando per capire cosa vogliono i consumatori e per stabilire una proposta che possa essere adattata per attrarre ogni quartiere e consumatore: dagli studenti, ai professionisti o alle famiglie, e dai centri città alle periferie, alle cinture dei pendolari e alle piccole città. Tutti mangiano e Deliveroo ha un'offerta che riflette ciò che vogliono le persone in ogni quartiere.

                                    La nostra proposta ai consumatori mira a fornire sempre la migliore disponibilità, selezione, esperienza e valore, costruendo allo stesso tempo una connessione emotiva con il nostro marchio.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="about-item text-center">
                                <i class="fa-solid fa-person-biking"></i>
                                <h3>RIDER</h3>
                                <p>Costruiamo la nostra proposta per i ciclisti in base alle cose che ci dicono di apprezzare di più.

                                    Questa comprensione di ciò che sta più a cuore ai ciclisti ci ha aiutato a sviluppare un’offerta che dà priorità alle cose a cui tengono: lavoro flessibile, buoni guadagni e sicurezza. Deliveroo è stata tra le prime piattaforme di consegna di cibo a fornire un'assicurazione gratuita contro gli infortuni personali e la responsabilità civile a tutti i passeggeri autonomi a livello globale. Questa copertura è fornita gratuitamente e protegge i passeggeri fin dal loro primo ordine con Deliveroo.

                                    Il nostro fondatore e CEO, Will, è stato il primo corriere e ha lavorato a tempo pieno nelle consegne per il primo anno di gestione dell'attività. Insieme ai membri del team di Deliveroo, continua ancora oggi a completare le consegne regolarmente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

    
<style lang="scss">
#about {
    background: url(../assets/about-us-img/about-us.png);

}

.about-1 {
    padding: 15px;

    h1 {
        text-align: center;
        color: black;
        font-weight: bold;
    }

    p {
        text-align: center;
        padding: 3px;

    }
}

.about-item {
    min-height: 600px;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: #fff;
    padding-top: 50px;
    padding-bottom: 30px;
    box-shadow: 0 0 9px rgb(9, 100, 13);

    i {
        font-size: 50px;
        margin: 0;
        margin-bottom: 20px;
    }

    h3 {
        font-size: 25px;
        margin-bottom: 20px;
    }

    hr {
        width: 46px;
        height: 3px;
        background-color: rgb(9, 100, 13);
        margin: 0 auto;
        border: none;
    }

    p {
        margin-top: 20px;
    }

}

.about-item:hover {
    background-color: rgb(9, 100, 13);
}

.about-item:hover i,
.about-item:hover h3,
.about-item:hover p {
    color: #fff;
}

.about-item:hover hr {
    background-color: white;
}
</style>
<script>
import AppFooter from '../components/AppFooter.vue'
export default {
    name: 'about-us'
}
</script>
<template lang="">
    <section id="about">
        <div class="about-1">
            <h1>CHI SIAMO</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta laborum, animi excepturi quam alias dolorum in, rem cupiditate corrupti atque porro, laboriosam praesentium suscipit illo voluptates beatae recusandae magnam aliquam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus doloremque animi atque praesentium sunt, numquam excepturi mollitia deserunt modi. Pariatur rem ratione libero. Magni recusandae nam minima dolorum magnam quibusdam!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, quo optio ad deserunt error provident ipsa ut voluptatum iste maxime, quisquam consectetur, dolorem similique molestias corrupti perferendis minus nulla illo.
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
                                <hr>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos debitis inventore recusandae numquam sequi officiis nesciunt culpa soluta pariatur! Quos quam dignissimos quo. Fugiat, ratione placeat dicta nemo sapiente quasi?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id doloremque, nostrum at ex assumenda doloribus quisquam numquam nam molestias rem perspiciatis delectus ducimus sint eius est recusandae facilis laboriosam. Possimus!
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="about-item text-center">
                                <i class="fa-solid fa-users"></i>
                                <h3>CONSUMATORI</h3>
                                <hr>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos debitis inventore recusandae numquam sequi officiis nesciunt culpa soluta pariatur! Quos quam dignissimos quo. Fugiat, ratione placeat dicta nemo sapiente quasi?
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, atque exercitationem commodi fugiat ratione porro. Nulla adipisci beatae, aut cum dolorum rerum consequatur accusamus. Nostrum debitis tenetur nulla quos facilis.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="about-item text-center">
                                <i class="fa-solid fa-person-biking"></i>
                                <h3>RIDER</h3>
                                <hr>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos debitis inventore recusandae numquam sequi officiis nesciunt culpa soluta pariatur! Quos quam dignissimos quo. Fugiat, ratione placeat dicta nemo sapiente quasi? 
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, accusantium? Itaque vitae modi delectus odio! Atque beatae aut amet natus esse accusamus nisi deleniti sed dolorum quia! Accusamus, fugit voluptas loren max for.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <AppFooter/>
    </footer>
</template>

    
<style lang="scss">
.sfondo {
    background-image: url('../assets/about-us/about-us.png');

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
<script>
    export default {
          name:'AppLoader'  
    }
</script>
<template >
        <div class="center">
                <div class="ring">
                    
                </div>
                <span>loading...</span>
        </div>
</template>
<style lang="scss">
.center{
    background-image: url('../assets/bg-home/final-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    // background-color: rgb(66, 218, 66);
}
.ring{
    position: absolute;
    width: 200px;
    height: 200px;
    // border: 1px solid black;
    border-radius: 50%;
    animation: ring 2s linear infinite;
    
}
@keyframes ring{
    0%{
        transform:rotate(0deg);
        box-shadow: 1px 5px 2px #e65c00;
    }
    50%{
        transform:rotate(180deg);
        box-shadow: 1px 5px 2px #18b201;
    }
    100%{
        transform:rotate(360deg);
        box-shadow: 1px 5px 2px #0456c8;
    }
}
.ring:before{
    position: absolute;
    content:'';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgb(255,255,255,.3);
}
span{
    color: orangered;
    font-size:20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 200px;
    

}
</style>
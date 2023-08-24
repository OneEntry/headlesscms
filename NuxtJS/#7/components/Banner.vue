<template>
    <div class="banner">
        <img src="~/assets/images/banner.png" alt="">
        <div class="main-text">
<!--            <h1>{{attr.header}}</h1>-->
            <h1>Shop</h1>
            <div class="border">Some descriptions about shop</div>
<!--            <div class="border" v-html="attr.value"></div>-->
            <div class="tags">
                <p>Home</p>
                <p>-</p>
                <p>Blog</p>
                <p>-</p>
                <p>Details</p>
            </div>
        </div>
    </div>

</template>

<script setup>

import {useGetAttrByName} from "../composables/states";

// const attr = await useGetAttrByName('maintext')



</script>

<style lang="scss">
.banner{
    width: 100%;
    position: relative;
    overflow: hidden;
    .main-text{
        position: absolute;
        top: 83px;
        left: 76px;
        color: #FFFFFF;
        max-width: 516px;
        font-family: Lato;
        h1{
            font-weight: 400;
            font-size: 89px;
            line-height: 82px;
            margin-bottom: 15px;

        }
        p{
            font-weight: 700;
            font-size: 21px;
            line-height: 31px;
            margin-bottom: 0;
        }
        .border{
            border-bottom: 2px solid #FFFFFF;;
            padding-bottom: 26px;
        }
        .tags{
            display: flex;
            gap: 21px;
            p{
                font-size:16px;
            }
        }
    }
    .socials{
        position: absolute;
        left: 83px;
        bottom: 35px;
        display: flex;
        align-items: center;
        gap: 32px;
    }

}
</style>
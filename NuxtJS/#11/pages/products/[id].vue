<template>
    <div class="shop-container">
        <div class="container">
            <div class="products">
                <div class="selectedProduct">
                    <h2>{{ product.localizeInfos.en_US.title }}</h2>
                    <div class="flex2">
                        <div class="slider">
                            <div class="main-image">
                                <img :src="mainPicture" alt="">
                            </div>
                            <div class="slider1">
                                <img
                                    v-for="pic in useGetAttrByName(product, 'more_pic')"
                                    :key="pic"
                                    :src="pic.downloadLink"
                                    @click="changePicture(pic)"
                                    alt="">
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <div class="price">
                                {{ useGetAttrByName(product, 'price') }} $
                            </div>
                            <button :class="status.identifier === 'isover' ? 'disabled':'active'" :disabled="status.identifier === 'isover'">Add to Cart</button>
                        </div>
                    </div>
                    <div class="description">
                        <h3>Description:</h3>
                        <div  v-html="useGetAttrByName(product, 'description')[0].value"></div>
                    </div>
                </div>
                <div v-if="relatedProducts.length">
                    <h4 class="related-products">Similar product</h4>
                    <div
                        v-for="product in relatedProducts" :key="product.id"
                        class="related-product"
                    >
                        <NuxtLink :to="`/products/${product.id}`" class="img-container">
                            <img :src="useGetAttrByName(product, 'pic')[0].downloadLink" alt="">
                        </NuxtLink>
                        <div class="flex">
                            <div class="title">
                                <p>{{product.localizeInfos.en_US.title}}</p>
                                <p>{{useGetAttrByName(product, 'price')}} $</p>
                            </div>
                            <div>
                                <div class="flex">
                                    <button >Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import {useGetProductById, useGetStatusById} from "../../composables/states";
import {useGetAttrByName} from "../../composables/products";
import {navigateTo} from "nuxt/app";

definePageMeta({
    middleware: 'product'
})

const route = useRoute()
const productId = route.params.id

const product = await useGetProductById(productId)

const mainPicture = ref(useGetAttrByName(product, 'pic')[0].downloadLink)

function changePicture(pic) {
    mainPicture.value = pic.downloadLink
}

const status = await useGetStatusById(product.id)
console.log(status)

const relatedProducts = ref(await searchProduct())
async function searchProduct() {
    if (product.relatedIds.length) {
        const productsList = []
        await Promise.all(
            product.relatedIds.map(async (id) => {
                await useGetProductById(id).then((result) => {
                    productsList.push(result)
                })
            })
        )
        return productsList
    } else {
        return []
    }
}

</script>

<style lang="scss">

.slider{
    display: flex;
    flex-direction: column;

    img {
        padding: 10px 30px;
        background-color: #F8F8F8;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 20px;
    }

    .main-image {
       img  {
           width: 300px;
           height: 300px;
       }
    }

    .slider1 {
        img {
            width: 100px;
            height: 100px;
        }
    }
.dots .slick-track{
    display: flex;
    flex-direction: column;
}
}
.shop-container{
    display: flex;
    justify-content: center;
    h2{
        color: #4C4D56;
        font-size: 36px;
        margin-bottom: 12px;
    }
    .articul {margin: 0};
    .rate {
        .rating{
            margin-right: 12px;
        }
        p {margin: 0;}
    }
    .about, .description{
        h3{
            color: #4C4D56;
            font-size: 36px;
        }
        p{
            color: #9198A8;
            font-weight: 300;
        }
    }
    .description{
        margin-bottom: 120px;
    }
    // .slider2 .slick-slide {
    //     .item{
    //         background-color: #F8F8F8;
    //     }
    // }
}

.related-products {
    color: #4C4D56;
    font-size: 36px;
    margin-bottom: 20px;
}

.add-to-cart{
    border-radius: 30px;
    background: #F8F8F8;
    width: 333px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    height:200px;
    .disabled {
        color: gray;
        border: #464545
    }
    .active:hover {
        cursor: pointer;
    }

    .price{
        color: #4C4D56;
        font-size: 36px;
    }
    button{
        border: 2px solid #EC722B;
        padding: 2px 50px 6px;
        color: #EC722B;
        border-radius: 50px;
        font-size: 26px;
        background: none;
    }
}

.selectedProduct {
    width: 100%;

    .flex {
        display: flex;
        align-items: center;
        gap: 36px;

        p {
            font-size: 26px;
            color: #4C4D56;
        }

        .rate {
            display: flex;
            align-items: center;
        }
    }

    .flex2 {
        margin-top: 1rem;
        display: flex;
        gap: 36px;
        justify-content: space-between;
    }
}
.products{
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    gap: 63px;
    align-items: space-between;

    .products-container{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        align-items: stretch;
    }
    .panel{
        width: 25%;
    }
    .related-product {
        width: fit-content;
        height: 22.35vw;
        margin-bottom: 60px;
        transition: .25s;
        .title{
            color: #4C4D56;
            font-size: 24px;
            p{
                margin-top:0;
                margin-bottom: 10px;
            }
        }
        .flex{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
            .flex{
                flex-direction: column;
                align-items: end;
                margin-top: 0;
            }
        }
        button{
            background: none;
            border: none;
            color: #FF9108;
            font-size: 21px;
            font-weight: 500;
            line-height: 30px;
            cursor: pointer;
        }
        .img-container{
            height: 80%;
            border-radius: 30px;
            background: #F8F8F8;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .25s;
            cursor: pointer;

            img{
                width: fit-content !important;
                max-width: 60% !important;
                height: fit-content !important;
                position: inherit !important;
            }
            &:hover{
                transform: scale(.9);
                transition: .25s;
            }
            &:active{
                transform: scale(.8);
                transition: .25s;
            }


        }
    }
    .product{
        width: 100%;
        height: 22.35vw;
        margin-bottom: 60px;
        transition: .25s;
        .title{
            color: #4C4D56;
            font-size: 24px;
            p{
                margin-top:0;
                margin-bottom: 10px;
            }
        }
        .flex{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
            .flex{
                flex-direction: column;
                align-items: end;
                margin-top: 0;
            }
        }
        button{
            background: none;
            border: none;
            color: #FF9108;
            font-size: 21px;
            font-weight: 500;
            line-height: 30px;
            cursor: pointer;
        }
        .img-container{
            height: 80%;
            border-radius: 30px;
            background: #F8F8F8;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .25s;
            cursor: pointer;

            img{
                width: fit-content !important;
                max-width: 60% !important;
                height: fit-content !important;
                position: inherit !important;
            }
            &:hover{
                transform: scale(.9);
                transition: .25s;
            }
            &:active{
                transform: scale(.8);
                transition: .25s;
            }
        }

    }
}

.slick-slider, .slick-list, .slick-track, .slick-active div{
    height: 100%;
}
.slider1{
    img:hover {
        cursor: pointer;
    }

    .slick-list{
        width: 410px;
        height: 26vw;
        border-radius: 30px;
        background-color: #F8F8F8;
        margin-left: 110px !important;
    }
}
.slider2{
    .slick-list{
        margin-top: 1rem;
        width: 410px;
        height: 100px;
        border-radius: 30px;
        margin-left: 110px !important;
        display: flex !important;
        flex-direction: column;
        .slick-track{
            display: flex;
            gap: 1rem;
        }
        .slick-slide .item{
            background-color: #F8F8F8;
            border-radius: 1rem;
        }
    }
}

.slick-slide{
    .item{
        position: relative;
        display: flex !important;
        justify-content: center;
        align-items: center;
        img{
            width: 60% !important;
            height: fit-content !important;
            position: inherit !important;
        }
    }
}

</style>
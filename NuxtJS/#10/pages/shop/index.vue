<template>
    <div class="shop-container">
        <div class="container">
            <div class="shop-settings">
                <div v-if="pageProducts.length">
                    <div v-for="row in pageProducts" :key="row" class="products">
                        <div
                            v-for="product in row" :key="product.id"
                            class="product"
                        >
                            <NuxtLink :to="`/products/${product.id}`" class="img-container">
                                <img :src="getAttrByName(product, 'pic')[0].downloadLink" alt="">
                            </NuxtLink>
                            <div class="flex">
                                <div class="title">
                                    <p>{{product.localizeInfos.en_US.title}}</p>
                                    <p>{{getAttrByName(product, 'price')}} $</p>
                                </div>
                                <div>
                                    <div class="flex">
                                        <button>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="not-found">Product not found</div>
                <div class="settings">
                    <div class="search">
                        <input
                            v-model="searchStr"
                            @blur="searchProduct"
                            type="text"
                            placeholder="Search text"
                            class="search-input"
                        >
                        <div class="range">
                            Filter by price
                            <input
                                @mouseup="filterProduct"
                                v-model="rangeProduct"
                                type="range"
                                min="0"
                                max="300"
                                step="50"
                                class="range-input"
                            >
                            <div class="range-info">
                                {{rangeProduct}} $
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <vue-awesome-paginate
                v-if="totalPages > 1 && pageProducts.length"
                :total-items="totalPages"
                :items-per-page="1"
                :max-pages-shown="5"
                v-model="currentPage"
                @click="changePage"
            />

        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import {useGetProductById, useGetProductConfig, useGetProductPages, useSearchProduct, useFilterProduct} from "../../composables/states";

const currentPage = ref(1)

const products = await useGetProductPages()
const config = await useGetProductConfig()

const totalPages = computed(() => Math.ceil(products.total / limit.value))
const limit = computed(() => config.productsPerRow * config.rowsPerPage)
const pageProducts = ref([])


function getAttrByName(product, name) {
    return product.attributeValues.find(attr => attr.hasOwnProperty(name))[name]
}

async function getProductsByPage(page) {
    const response = await fetch(`https://for-testing.oneentry.cloud/api/content/products/page/url/shop?limit=${limit.value}&offset=${(page-1)*limit.value}&sortOrder=DESC&sortKey=id`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const productsByPage = await response.json()

    const result = []
    while (productsByPage.items.length) {
        if (productsByPage.items.length >= config.productsPerRow) {
            result.push(productsByPage.items.splice(0, config.productsPerRow))
        } else {
            result.push(productsByPage.items.splice(0))
        }
    }
    return result
}

async function changePage(page) {
    pageProducts.value = await getProductsByPage(page)
}
await changePage(currentPage.value)



const searchStr = ref('')
const rangeProduct = ref(300)

async function searchProduct() {
    if (searchStr.value.length) {
        const findProducts = await useSearchProduct(searchStr.value)
        if (findProducts.length) {
            const productsList = []
            await Promise.all(
                findProducts.map(async (product) => {
                    await useGetProductById(product.id).then((result) => {
                        productsList.push(result)
                    })
                })
            )
            pageProducts.value = [productsList]
        } else {
            pageProducts.value = []
        }
    } else {
        await changePage(currentPage.value)
    }
}
async function filterProduct() {
    const data = [
        {
            attributeMarker: "price",
            conditionMarker: "lth",
            conditionValue: rangeProduct.value,
        }
    ]
    const filteredProducts = await useFilterProduct(data)
    pageProducts.value = [filteredProducts.items]
}



</script>


<style lang="scss">
.products {
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
    gap: 63px;
    justify-content: space-between;

    .products-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        align-items: stretch;
    }

    .panel {
        width: 25%;
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
.product{
    width: 100%;
    max-width: 286px;
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

.pagination-container {
    display: flex;
    column-gap: 10px;
}
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}

.shop-settings {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .settings {
        margin: 100px 20px;
        padding: 20px 40px;
        background-color: #f8f8f8;
        border-radius: 15px;
    }

    .search {
        display: flex;
        flex-direction: column;

        .search-input {
            padding: 5px 10px;
            border-radius: 20px;
            border: 1px solid #484b52;
        }
        .range-input {
            width: 100%;
        }
        .range {
            width: 100%;
            margin-top: 30px;

        }
    }
}

.not-found {
    color: #4C4D56;
    margin-top: 100px;
    font-size: 21px;
    font-weight: 500;
    line-height: 30px;
}

</style>
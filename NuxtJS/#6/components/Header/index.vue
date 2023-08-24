<template>
    <header id="header">
        <div class="container header-container">
            <div class="logo">
                <a href="/">
                    <img src="~/assets/images/logo.png">
                </a>
            </div>
            <div class="menu">
                <MenuItem v-for="item in sortMenu" :key="item.id" :items="item.childrens">
                    <a :href="item.pageUrl" class="menu-item">{{item.localizeInfos.en_US.title}}</a>
                </MenuItem>
            </div>
        </div>
    </header>
</template>

<script setup>
import {computed} from 'vue'
import {useGetMenu} from "../../composables/states";
import MenuItem from "./MenuItem";

const menu = await useGetMenu()

const sortMenu = computed(() => {
    const sortMenu = menu.pages.filter(page => page.parentId === null)

    menu.pages.filter(page => page.parentId).map(child => {

        const parent = sortMenu.find(menu => menu.id === child.parentId)
        if (!parent.hasOwnProperty('childrens')) {
            parent.childrens = []
        }
        parent.childrens.push(child)
    })
    return sortMenu
})
</script>


<style lang="scss">
#header {
    background-color: #4C4D56;
    padding: 0 10px;

    .logo {
        padding: 10px 0;
        width: auto;
        margin-right: 30px;

        img {
            height: 74px;
        }
    }

    .menu {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0 10px;

        .menu-item {
            height: 100%;
            font-family: "Lato";
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 38px;
            color: #FFFFFF;
            text-align: center;
            display: flex;
            align-items: center;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

}


.header-container {
    display: flex;
}


</style>
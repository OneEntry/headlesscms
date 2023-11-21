<template>
    <header id="header">
        <div class="container header-container">
            <div class="logo">
                <a href="/">
                    <img src="~/assets/images/logo.png">
                </a>
            </div>
            <div class="menu">
                <HeaderMenuItem v-for="page in sortMenu" :key="page.id" :items="page.childrens">
                    <a class="menu-item" :href="page.pageUrl">{{ page.localizeInfos.en_US.title }}</a>
                </HeaderMenuItem>
            </div>
            <div>
                <select  
                    v-model="langState.lang"
                    @change="changeLanguauge"
                    class="switch-lang" 
                    name="switch-lang" 
                    id="switch-lang"
                >
                    <option value="en_US">English</option>
                    <option value="it_IT">Italian</option>
                </select>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import {useGetPages, useGetMenus} from "../../composables/states"
import {useLangState} from "../../stores/lang"

const langState = useLangState()

const pagesData = await useGetPages()
const menu = await useGetMenus()

const sortMenu = computed(() => {
    const sortMenuArray = menu.pages.filter(page => {
        return page.parentId === null
    })

    menu.pages.filter(page => page.parentId).map(child => {
        const parent = sortMenuArray.find(parent => parent.id === child.parentId)
        if (!parent.hasOwnProperty('childrens')) {
            parent.childrens = []
        }
        parent.childrens.push(child)
    })
    return sortMenuArray
})

function changeLanguauge(e) {
    langState.changeLang(e.target.value)
}
</script>

<style lang="scss">
.switch-lang {
    padding: 5px;
    color: #FFFFFF;
    background-color: #4C4D56;
}

#header {
    background-color: #4C4D56;
    padding: 0 10px;

    .logo {
        width: auto;
        margin-right: 30px;
        padding: 10px 0;

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
    align-items: center;
}

</style>
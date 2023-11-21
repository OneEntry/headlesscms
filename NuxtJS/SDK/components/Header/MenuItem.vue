<template>
    <div class="parent-menu">
        <slot />
        <div v-if="props.items !== null" class="child-menus">
            <div v-for="item in props.items" :key="item.id">
                <a class="menu-item" :href="item.pageUrl">{{ item.localizeInfos.en_US.title }}</a>
            </div>
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array || null,
        default: null
    }
})

</script>
<style scoped lang="scss">
.parent-menu {
    position: relative;
    height: 100%;
    &:hover .child-menus {
        display: block;
    }
}
.child-menus {
    display: none;
    position: absolute;
    top: 66px;
    min-width: 150px;
    z-index: 9999;
    padding: 10px 25px;
    background-color: rgba(194, 74, 14, 0.5);
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 38px;
    color: #FFFFFF;
    a {
        margin-bottom: 10px;
    }
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>
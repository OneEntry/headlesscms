<template>
    <div class="not-found-page">
        <div v-html="content.value"></div>
    </div>
</template>

<script setup>

import {useGetAttrByName} from "../composables/states";

const content = await useGetAttrByName('title')
</script>

<style lang="scss">

.not-found-page {
    h2 {
        font-size: 128px;
    }
    p {
        font-size: 36px;
    }
}

</style>
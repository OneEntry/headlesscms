<template>
    <Home />
</template>

<script setup>
import {useGetActualPage} from "../composables/states";

const page = await useGetActualPage()
</script>

<style scoped>

</style>
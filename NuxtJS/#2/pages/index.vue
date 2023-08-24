<template>
    <Home />
</template>

<script setup>
console.log('!!!')
import useData from "../composables/states";

const test = await useData()
console.log(test)
</script>

<style scoped>

</style>
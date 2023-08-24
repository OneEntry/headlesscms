<template>
    <component :is="route.params.url" />
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style scoped>

</style>
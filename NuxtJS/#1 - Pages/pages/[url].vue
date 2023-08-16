<template>
    <div>
        url: {{ route.params.url }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style scoped>

</style>
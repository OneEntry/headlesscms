<template>
    <h1>Hello world</h1>
<!--    <div v-for="page in result" :key="page.id">-->
<!--        <a :href="page.pageUrl">{{ page.localizeInfos.en_US.title }}</a>-->
<!--    </div>-->
</template>

<script setup>

const response = await fetch('https://nuxt-project.oneentry.cloud/api/content/pages', {
    method: 'get',
    headers: {
        'Authorization': 'Bearer <AUTH_TOKEN>',
        'Content-Type': 'application/json'
    }
})
//
const result = await response.json()
console.log(result)
</script>

<style scoped>

</style>
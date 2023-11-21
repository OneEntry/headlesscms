export default defineNuxtRouteMiddleware(async (to, from) => {

    const request = await useGetProductById(to.params.id)

    if (request.statusCode === 404) {
        return navigateTo('/404')
    }
})
export default async function useData() {
    const response = await fetch('https://nuxt-project.oneentry.cloud/api/content/pages', {
        method: 'get',
        headers: {
            'Authorization': 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json()
    return result
}
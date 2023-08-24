import {useRoute} from "vue-router";

export const useGetAllPages =  async () => {
    const response = await fetch('https://for-testing.oneentry.cloud/api/content/pages', {
        method: 'get',
        headers: {
            'Authorization': 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json()
    return result
}

export const useGetActualPage = async () => {
    const route = useRoute()
    const pageUrl = route.path === '/' ? 'home' : route.path

    const pagesList = await useGetAllPages()
    const actualPage = pagesList.find(page => page.pageUrl === pageUrl)
    return actualPage
}

export const useGetAttrByName = async (name) => {
    const actualPage = await useGetActualPage()
    const attrList = actualPage.attributeValues.find(attr => attr.hasOwnProperty(name))
    if (attrList[name].length === 1) {
        return attrList[name][0]
    } else {
        return attrList[name]
    }
}

export const useGetMenu = async () => {
    const response = await fetch('https://for-testing.oneentry.cloud/api/content/menus/marker/header', {
        method: 'get',
        headers: {
            'Authorization': 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json()
    return result
}
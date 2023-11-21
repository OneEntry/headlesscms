import { useRoute } from "vue-router"

export const useGetPages = async (lang = 'en_US') => {
    const response = await fetch(`https://nuxt-projects.oneentry.ru/api/content/pages?langCode=${lang}`, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}

export const useGetActualPage = async (lang = 'en_US') => {
    const route = useRoute()
    const pageUrl = route.path === '/' ? 'home' : route.path.slice(1) 

    const pagesList = await useGetPages(lang)
    const actualPage = pagesList.find(page => page.pageUrl === pageUrl)
    return actualPage
}

export const useGetAttrByName = async (name, lang = 'en_US') => {
    const actualPage = await useGetActualPage(lang)
    return actualPage.attributeValues[lang][name]

    // const attrList = actualPage.attributeValues.en_US.find(attr => attr.hasOwnProperty(name))
    // if (attrList[name].length === 1) {
    //     return attrList[name][0]
    // } else {
    //     return attrList[name]
    // }

}

export const useGetMenus = async () => {
    const response = await fetch('https://nuxt-projects.oneentry.ru/api/content/menus/marker/header', {
        method: 'get',
        headers: {
            'Authorization': 'Bearer <AUTH_TOKEN>',
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}

export const useGetProductPages = async () => {
    const response = await fetch('https://nuxt-projects.oneentry.ru/api/content/products/page/url/shop?limit=30&offset=0&langCode=en_US&sortOrder=DESC&sortKey=id', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json()
      return result
}

export const useGetProductsConfig = async () => {
    const response = await fetch('https://nuxt-projects.oneentry.ru/api/content/pages/shop/config', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json()
      return result
}

export const useGetProductById = async (id) => {
    const response = await fetch(`https://nuxt-projects.oneentry.ru/api/content/products/${id}?langCode=en_US`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json()

      return result
}

export const useFilterProducts = async (data) => {
    const response = await fetch('https://nuxt-projects.oneentry.ru/api/content/products/conditions-filter?offset=0&limit=30&langCode=en_US&sortOrder=DESC&sortKey=id', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      return result
}

export const useSearchProducts = async (name) => {
    const response = await fetch(`/api/content/products/quick/search?lang=en_US&name=${name}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}

export const useGetStatusById = async (id) => {
    const response = await fetch(`https://nuxt-projects.oneentry.ru/api/content/product-statuses/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json()
      return result
}

export const useFindPageByUrl = (pageList, url) => {
    const pageUrl = url === '/' ? 'home' : url.slice(1)
    const actualPage = pageList.find(page => page.pageUrl === pageUrl)
    return actualPage
}

import {defineOneEntry} from "oneentry";
export const OE = defineOneEntry('https://nuxt-projects.oneentry.ru')
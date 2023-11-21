import { defineStore } from 'pinia'
import {ref, onBeforeMount} from 'vue'


export const useLangState = defineStore('lang', () => {
    const lang = ref('')

    onBeforeMount(() => {
        lang.value = localStorage.getItem('lang')
    })

    function changeLang(newLang) {
        localStorage.setItem('lang', newLang)
        lang.value = newLang
    }

    return {
        lang,
        changeLang
    }
})
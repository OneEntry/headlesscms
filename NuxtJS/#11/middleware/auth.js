import {navigateTo} from "nuxt/app";
import {useGetProductById} from "~/composables/states";

export default async function () {
    console.log('hi')
    const test = await useGetProductById(4)
    if (test.id == 4) {
        navigateTo(`/shop`)
    } else {
        console.log('mkljbljbjb')
    }
    console.log(test)
}
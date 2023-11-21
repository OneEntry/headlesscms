export const useGetAttrByName = (product, name) => {
    return product.attributeValues['en_US'][name]
}

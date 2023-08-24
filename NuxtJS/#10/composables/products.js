export const useGetAttrByName = (product, name) => {
    return product.attributeValues.find(attr => attr.hasOwnProperty(name))[name]
}

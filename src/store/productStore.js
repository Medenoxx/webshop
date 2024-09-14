import {defineStore} from 'pinia'
import axios from 'axios'
import {API_URL} from '@/api'
import {ref} from "vue";

export const useProductStore = defineStore('product', () => {

    const products = ref([])

    //hier data weil wir etwas abschicken
    async function createProduct(product) {
        const productResponse = await axios.post(API_URL + "products", product)
        products.value.push(productResponse.data)
    }

    async function loadSingleProduct(productId) {
        const productIndex = products.value.findIndex(product => product._id === productId)
        const productResponse = await axios.get(API_URL + "products/" + productId)
        if (productIndex >= 0) {
            products.value.splice(productIndex, 1, productResponse.data)
        } else {
            products.value.push(productResponse.data)
        }
    }

    //hier kein +data, weil wir eine Response bekommen
    async function loadProducts() {
        const productsResponse = await axios.get(API_URL + "products")
        products.value = productsResponse.data
    }

    async function updateProduct(productId, updatedProduct) {
        const requestPayload = {...updatedProduct}
        if ('_id' in requestPayload) {
            delete requestPayload._id
        }
        const productResponse = await axios.put(API_URL + "products/" + productId, requestPayload)
    }

    async function deleteProduct(productId) {
        await axios.delete(API_URL + "products/" + productId)
        const productIndex = products.value.findIndex(product => product._id === productId)
        if (productIndex >= 0) {
            products.value.splice(productIndex, 1)
        }
    }

    return {
        products,
        createProduct,
        loadSingleProduct,
        loadProducts,
        updateProduct,
        deleteProduct,
    }
})

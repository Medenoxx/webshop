import {defineStore} from 'pinia'
import axios from 'axios'
import {API_URL} from '@/api'
import {ref} from "vue";

export const useBasketStore = defineStore('basket', () => {

    //den Store kann man mit Controllern in Java vergleichen, hier haben wir die Funktionen für CRUD Operationen geschrieben

    const baskets = ref([])

    //PUT Basket - hinzufügen
    //hier data weil wir etwas abschicken
    async function createBasket(basket) {
        const basketResponse = await axios.post(API_URL + "baskets", {basket})
        baskets.value.push(basketResponse.data)
    }

    async function loadSingleBasket(basketId) {
        const basketIndex = baskets.value.findIndex(product => basket._id === basketId)
        const basketResponse = await axios.get(API_URL + "baskets/" + basketId)
        if (basketIndex >= 0) {
            baskets.value.splice(basketIndex, 1, basketResponse.data)
        } else {
            baskets.value.push(basketResponse.data)
        }
    }

    //hier kein +data, weil wir eine Response bekommen
    // GET BASKET - ANZEIGEN
    async function loadBasket() {
        const basketResponse = await axios.get(API_URL + "baskets")
        baskets.value = basketResponse.data
    }


    async function updateBasket(basketId, updatedBasket) {
        const requestPayload = {...updatedBasket}
        if ('_id' in requestPayload) {
            delete requestPayload._id
        }
        const basketResponse = await axios.put(API_URL + '/baskets/' + basketId, requestPayload)
    }

    async function deleteSingleProductFromBasket(productId) {
        await axios.delete(API_URL + '/baskets/item/' + productId)
        const basketIndex = baskets.value.findIndex(product => product._id === productId)
        if (basketIndex >= 0) {
            baskets.value.splice(basketIndex, 1)
        }
    }

    // Hier wird der komplette Warenkorb geleert
    // somit schicken wir nur ein DELETE okan das Backend und setzten baskets.value auf ein leeres Array []ok
    async function deleteBasket() {
        await axios.delete(API_URL + '/baskets/')
        baskets.value=[];
    }

    return {
        baskets,
        createBasket,
        loadSingleBasket,
        loadBasket,
        updateBasket,
        deleteSingleProductFromBasket,
        deleteBasket,
    }
})

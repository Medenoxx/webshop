<template>
    <h1>Produkt erstellen</h1>
    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <ProductForm @createProduct="createProduct"/>

</template>
<script setup>
import {useRouter} from "vue-router";
import {isAxiosError} from "axios";
import {useProductStore} from "@/store/productStore";
import ProductForm from "@/components/ProductForm.vue";
import {ref} from "vue";

const productStore = useProductStore()
const router = useRouter()

const errorMsg = ref('')

async function createProduct(product) {
    try {
        await productStore.createProduct(product)
        await router.push('/')
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 400) {
            console.error("Bad Request " + err)
        } else if (isAxiosError(err) && err.response?.status === 403) {
            console.error("This action is for admins only. Check your user role." + err)
        }
        console.error(err)
    }
}
</script>

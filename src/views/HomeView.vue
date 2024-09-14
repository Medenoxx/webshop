<style>
.product__list{
    margin-top: 3rem;
    display:flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
</style>
<template>
    <h1>Home</h1>
    <main>
<!--        wenn ein Produkt da ist, nimmt er dieses Template und gibt es aus-->
        <template v-if="productStore.products.length > 0">
            <div class="product__list">
<!--                productcard erstellt für jedes produkt in products eine product card-->
                <ProductCard
                    v-for="product in products"
                    :product="product"
                />
            </div>
        </template>
<!--        wenn nicht, gibt er dieses template aus.-->
        <template v-else>
            <div class="d-flex justify-content-center mt-3">Keine Produkte vorhanden!</div>
        </template>
    </main>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import {computed, onBeforeMount} from "vue";
import {useProductStore} from "@/store/productStore";

const productStore = useProductStore()
const products = computed(() => productStore.products)

onBeforeMount(async () => {
    await productStore.loadProducts()
})

</script>


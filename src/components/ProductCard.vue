<style>
.product-card__container {
    margin-top: 1.5rem;
    width: 20rem;
}
</style>

<template>
    <div class="product-card__container">
        <img :src="product.imageUrl" @error="imageLoadError" :alt="product.title" width="320" height="320">
        <v-card :title="product.title" :subtitle="product.price+'€'" :text="product.description" style="height:8.75rem"></v-card>
        <!--    hier haben wir die Buttons lt Angabe für das Ändern und Löschen der Buttons eingefügt
                nur wenn der eingeloggte Benutzer ein Admin ist, darf er die Produkte bearbeiten, deswegen das v-if is Admin-->
        <RouterLink :to="`products/${product.productId}`" class="btn btn-secondary m-2">
            <v-btn class=" mb-2 outlined-btn" type="button" block>Produkt ansehen</v-btn>
        </RouterLink>

        <CustomDialog
            :product="product"
            :is-dialog-open="isDialogOpen"
            :errorMsg="errorMsg"
            @update:model-value="toggleDialogOpen"
        >
            <ProductForm
                :product="product"
                :submitButton="'Änderung bestätigen'"
                @createProduct="updateProduct"
            />
        </CustomDialog>
    </div>
</template>

<script setup>

import {useAuthStore} from "@/store/authStore";
import {ref} from "vue";
import {useProductStore} from "@/store/productStore";
import router from "@/router";
import CustomDialog from "@/components/CustomDialog.vue";
import ProductForm from "@/components/ProductForm.vue";
//authstore, product store und ref importiert
const authStore = useAuthStore()
const productStore = useProductStore()
const errorMsg = ref('')

const props = defineProps({
    product: {
        required: true,
        type: Object
    }
})

const isDialogOpen = ref(false)

function toggleDialogOpen() {
    isDialogOpen.value = !isDialogOpen.value;
}

async function updateProduct(product) {
    try {
        await productStore.updateProduct(id.value, product)
        isDialogOpen.value = false
        await router.push('/')
    } catch (error) {
        console.error(error)
        if (error.response.status === 401 || error.response.status === 403) errorMsg.value = "Keine Berechtigung vorhanden."
    }
}
function imageLoadError (event) {
    event.target.src="src/assets/ProductImageNotFound.jpg";
}

</script>

<style scoped>
.custom-orange {
    border-color: #FFA500; /* Border für outlined */
}

.custom-red {
    border-color: #FF0000; /* Border für outlined */
}

.outlined-btn {
    border-width: 2px;
}
</style>

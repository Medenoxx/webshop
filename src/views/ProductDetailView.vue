<script setup>
import {useRoute} from "vue-router";
import {computed, onBeforeMount, ref} from "vue";
import CustomDialog from "@/components/CustomDialog.vue";
import ProductForm from "@/components/ProductForm.vue";
import {useProductStore} from "@/store/productStore";
import {useAuthStore} from "@/store/authStore";
import router from "@/router";

const productStore = useProductStore()
const authStore = useAuthStore()

const isDialogOpen = ref(false)
const showDeleteConfirmation = ref(false); // Kontrolliert die Sichtbarkeit des Bestätigungsdialogs

const id = computed(() => parseInt(useRoute().params.productId));
const product = ref({});

onBeforeMount(async () => {
    try {
        await productStore.loadSingleProduct(id.value);
        // Fülle die `product` ref mit den Daten des geladenen Produkts
        product.value = productStore.products.find(p => p.productId === id.value) ?? {};
    } catch (error) {
        console.error("Fehler beim Laden des Produkts:", error);
    }
})

function toggleDialogOpen() {
    isDialogOpen.value = !isDialogOpen.value;
}

const errorMsg = ref('')

async function updateProduct(product) {
    try {
        await productStore.updateProduct(id.value, product)
        isDialogOpen.value = false
        await router.push('/')
    } catch (error) {
        console.error(error)
        if (error.response.status === 401 || error.response.status === 403) errorMsg.value = "Keine Berechtigung vorhanden"
    }
}

function imageLoadError(event) {
    event.target.src = "../src/assets/ProductImageNotFound.jpg";
}

async function deleteProduct() {
    try {
        await productStore.deleteProduct(id.value);
        showDeleteConfirmation.value = false;
        await router.push('/');
    } catch (error) {
        console.error('Fehler beim Löschen des Produkts:', error);
    }
}

</script>

<template>
    <div class="product-detail__container">
        <img class="product-detail__image" :src="product.imageUrl" @error="imageLoadError" :alt="product.title"
             width="400">
        <table class="w-50 text-left">
            <h1>Produktdetails</h1>
            <tr>
                <th>ID</th>
                <td>{{ product.productId }}</td>
            </tr>
            <tr>
                <th>Produkttitel</th>
                <td>{{ product.title }}</td>
            </tr>
            <tr>
                <th>Produktbeschreibung</th>
                <td>{{ product.description }}</td>
            </tr>
            <tr>
                <th>Preis</th>
                <td>{{ product.price }}</td>
            </tr>
            <tr>
                <th>Produktbild</th>
            </tr>
        </table>
    </div>
    <div class="mt-5 product-detail__buttons">
        <!--    hier haben wir die Buttons lt Angabe für das Ändern und Löschen der Buttons eingefügt
                nur wenn der eingeloggte Benutzer ein Admin ist, darf er die Produkte bearbeiten, deswegen das v-if is Admin-->
        <v-btn v-if="authStore.isAdmin" class="custom-orange mb-2 outlined-btn" type="button" color="warning"
               @click="isDialogOpen = true">Produkt ändern
        </v-btn>
        <v-btn v-if="authStore.isAdmin" class="custom-red mb-2 outlined-btn" type="button" color="error"
               @click="showDeleteConfirmation = true">Produkt löschen
        </v-btn>
    </div>

    <!-- Bestätigungsdialog für das Löschen -->
    <v-dialog v-model="showDeleteConfirmation" max-width="500">
        <v-card>
            <v-card-title class="text-h5">Wollen Sie dieses Produkt wirklich löschen?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="deleteProduct">Ja</v-btn>
                <v-btn color="grey" text @click="showDeleteConfirmation = false">Nein</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

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
</template>

<style>
.product-detail__container {
    display: flex;
    justify-content: center;
}

.product-detail__image {
    margin-right: 2rem;
}

.product-detail__buttons{
    display:flex;
    justify-content: space-evenly;
}

th, td {
    vertical-align: top;
}
</style>

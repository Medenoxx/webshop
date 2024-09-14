<template>
    <form @submit.prevent="createProduct" class="m-5" novalidate>
        <div :class="{error: v$.title.$errors.length}">
            <v-text-field label="Title" v-model="v$.title.$model"
                          :class="v$.title.$errors.length ? 'is-invalid' : ''" type="text" class="form-control"/>
            <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
                <div class="text-danger error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div :class="{error: v$.price.$errors.length}">
            <v-text-field label="Price" v-model.number="v$.price.$model"
                          :class="v$.price.$errors.length ? 'is-invalid' : ''" type="number" class="form-control"/>
            <div class="input-errors" v-for="error of v$.price.$errors" :key="error.$uid">
                <div class="text-danger error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div :class="{error: v$.description.$errors.length}">
            <v-textarea label="Description" v-model="v$.description.$model"
                          :class="v$.description.$errors.length ? 'is-invalid' : ''" class="form-control"/>
            <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                <div class="text-danger error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div :class="{error: v$.imageUrl.$errors.length}">
            <v-text-field label="Image Url" v-model="v$.imageUrl.$model" :class="v$.imageUrl.$errors.length ? 'is-invalid' : ''" type="text"
                       class="form-control"/>
            <div class="input-errors" v-for="error of v$.imageUrl.$errors" :key="error.$uid">
                <div class="text-danger error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <v-btn type="submit" color="primary" block class="mb-2">{{ submitButton }}</v-btn>
    </form>
</template>

<script setup>
import {ref, watch} from "vue";
import {integer, maxLength, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import "@/validations/validations";

const props = defineProps({
    product: {
        type: Object
    },
    submitButton: {
        type: String,
        default: 'Produkt anlegen'
    }
})

const emit = defineEmits(['createProduct'])

const product = ref({
    title: null,
    description: null,
    price: null,
    imageUrl: null,
    productId: null
})

const validations = {
    title: {required, maxlength: maxLength(255)},
    description: {required, maxlength: maxLength(2048)},
    price: {required, integer, numeric},
    imageUrl: {required, maxlength: maxLength(2048)}
}

//Validiert Felder vom Produkt, schaut, ob die validations eingehalten werden
const v$ = useVuelidate(validations, product)

//schaut ob es Änderungen bei den props.product gibt (sind die Eingabefelder)
//diese Änderungen werden dann in das v$ hineingespeichert und wieder validiert
//man validiert laufend, während Person tippt, real time check, wenn etwas nicht passt kommt warnmeldung
watch(() => props.product, () => {
    if (props.product) {
        v$.value.title.$model = props.product.title
        v$.value.description.$model = props.product.description
        v$.value.price.$model = props.product.price
        v$.value.imageUrl.$model = props.product.imageUrl
    }
}, {immediate: true})

//erstellt das Produkt und schickt es an die parent component, wenn validierung ok war
async function createProduct() {
    const result = await v$.value.$validate()
    if (!result) {
        return
    }
    emit('createProduct', {
        title: v$.value.title.$model,
        description: v$.value.description.$model,
        price: v$.value.price.$model,
        imageUrl: v$.value.imageUrl.$model
    })
}

</script>

<style>

</style>

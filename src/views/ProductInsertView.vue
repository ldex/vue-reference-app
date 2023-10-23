<template>
    <div>
        <form @submit.prevent="onSubmit" novalidate>
            <h2>Add product</h2>

            <div class="form-group" :class="{ 'form-group--error': v$.$error && v$.name.$error }">
                <label for="productName">Name:</label>
                <input type="text" v-model.trim="v$.name.$model" class="form-control" id="productName" maxlength="50"
                    autofocus autocomplete="off" />
                <p v-if="v$.$error" class="errorMessage">
                    <span v-if="v$.name.required.$invalid">Name is required.</span>
                    <span v-if="v$.name.minLength.$invalid">Name must have at least {{ v$.name.minLength.$params.min }}
                        characters!</span>
                    <span v-if="v$.name.maxlength.$invalid">Name must have less than {{ v$.name.maxlength.$params.max }}
                        characters!</span>
                </p>
            </div>

            <div class="form-group" :class="{ 'form-group--error': v$.$error && v$.description.$error }">
                <label for="productDesc">Description:</label>
                <textarea v-model.trim="v$.description.$model" class="form-control" id="productDesc" />
                <p v-if="v$.$error" class="errorMessage">
                    <span v-if="v$.description.minLength.$invalid">Description must have at least {{
                        v$.description.minLength.$params.min }} characters!</span>
                    <span v-if="v$.description.maxlength.$invalid">Description must have less than {{
                        v$.description.maxlength.$params.max }} characters!</span>
                </p>
            </div>

            <div class="form-group" :class="{ 'form-group--error': v$.$error && v$.price.$error }">
                <label for="productPrice">Price:</label>
                <input type="number" step="0.5" v-model.trim="v$.price.$model" class="form-control" id="productPrice" />
                <p v-if="v$.$error" class="errorMessage">
                    <span v-if="v$.price.required.$invalid">Price is required.</span>
                    <span v-if="v$.price.between.$invalid">Price must be between {{ v$.price.between.$params.min }} and {{
                        v$.price.between.$params.max }}</span>
                </p>
            </div>

            <div class="form-group" :class="{ 'form-group--error': v$.$error && v$.imageUrl.$error }">
                <label for="imageUrl">Image url:</label>
                <input type="text" v-model="product.imageUrl" class="form-control" id="imageUrl" placeholder="http://">
                <p v-if="v$.$error" class="errorMessage">
                    <span v-if="v$.imageUrl.isValidImageUrl.$invalid">Invalid image url.</span>
                </p>
            </div>

            <div class="form-group">
                <label for="discontinued">Discontinued?</label>
                <input type="checkbox" v-model="product.discontinued" class="form-control" id="discontinued">
            </div>

            <div class="form-group">
                <label for="fixedPrice">Fixed price?</label>
                <input type="checkbox" v-model="product.fixedPrice" class="form-control" id="fixedPrice">
            </div>

            <div style="margin: 10px">
                <button type="submit">Save product</button>
            </div>

            <img :src="product.imageUrl" width="200" />
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { required, minLength, maxLength, between } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();

const validUrlRegex = /^(https?:\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$/g;

const product = ref({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    discontinued: false,
    fixedPrice: false
});
const router = useRouter();

const rules = {
    name: {
        required,
        minLength: minLength(5),
        maxlength: maxLength(50)
    },
    description: {
        minLength: minLength(5),
        maxlength: maxLength(200)
    },
    price: {
        required,
        between: between(0, 1000000)
    },
    imageUrl: {
        isValidImageUrl(img) {
            return (
                img.length == 0 || validUrlRegex.test(img)
            );
        }
    }
}

const v$ = useVuelidate(rules, product, { $lazy: true })

function onSubmit() {
    v$.value.$touch();
    if(!v$.value.$error) {
        let newProduct = {
            name: product.value.name,
            price: product.value.price,
            description: product.value.description || '',
            imageUrl: product.value.imageUrl,
            discontinued: product.value.discontinued,
            fixedPrice: product.value.fixedPrice
        };
        productStore.addProduct(newProduct)
            .then(() => {
                router.push({ name: "products" });
            })
            .catch(error => {
                console.error("There was an error creating a new product, ", error);
            });
    }
}
</script>

<style lang="css" scoped>
input:active,
input:focus,
input:hover,
textarea:active,
textarea:focus,
textarea:hover {
    background-color: lightyellow;
    border-color: yellow;
}

label {
    clear: both;
    float: left;
    width: 120px;
}

.form-group--error {
    animation-name: shakeError;
    animation-fill-mode: forward;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
}

.form-group--error input,
.form-group--error textarea {
    border-color: #f79483;
}

@keyframes shakeError {
    0% {
        transform: translateX(0);
    }

    15% {
        transform: translateX(0.375rem);
    }

    30% {
        transform: translateX(-0.375rem);
    }

    45% {
        transform: translateX(0.375rem);
    }

    60% {
        transform: translateX(-0.375rem);
    }

    75% {
        transform: translateX(0.375rem);
    }

    90% {
        transform: translateX(-0.375rem);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
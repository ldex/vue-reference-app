<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset class="filters">
            Sort by:
            <button @click="sort('name')">Name</button>
            <button @click="sort('price')">Price</button>
            <button @click="sort('modifiedDate')">Date</button>
            <span>Filter by name: <input v-model="filterName" /></span>
        </fieldset>
        <ul class="products">
            <li v-for="product in sortedFilteredPaginatedProducts" v-bind:key="product.id"
                v-bind:class='{ discontinued: product.discontinued, selected: product === selectedProduct }' @click="selectedProduct = product">
                <span class="name">{{ product.name }}</span>
                <span class="description">{{ product.description }}</span>
                <span class="price">{{ product.price }}</span>
            </li>
        </ul>

        <button @click="prevPage" :disabled="pageNumber===1">
            &lt; Previous
        </button>
        Page {{ pageNumber }}
        <button @click="nextPage" :disabled="pageNumber >= pageCount">
            Next &gt;
        </button>

        <product-details :product="selectedProduct"></product-details>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductDetails from '@/components/ProductDetails.vue';

const props = defineProps({
    products: Array,
    pageSize: {
        type: Number,
        required: false,
        default: 5
    }
})
const title = 'Products';
const selectedProduct = ref(null);
const filterName = ref('');
const sortName = ref('modifiedDate');
const sortDir = ref('desc');
const pageNumber = ref(1);

function nextPage() {
    pageNumber.value++;
    selectedProduct.value = null;
}

function prevPage() {
    pageNumber.value--;
    selectedProduct.value = null;
}

function sort(s) {
    //if s == current sort, reverse order
    if (s === this.sortName) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    }
    this.sortName = s;
}

const filteredProducts = computed(() => {
    let filter = new RegExp(filterName.value, 'i')
    return props.products.filter(el => el.name.match(filter))
})

const sortedFilteredProducts = computed(() => {
    return [...filteredProducts.value].sort((a, b) => {
        let modifier = 1;
        if (sortDir.value === 'desc') modifier = -1;
        if (a[sortName.value] < b[sortName.value]) return -1 * modifier;
        if (a[sortName.value] > b[sortName.value]) return 1 * modifier;
        return 0;
    })
})

const sortedFilteredPaginatedProducts = computed(() => {
    const start = (pageNumber.value - 1) * props.pageSize,
        end = start + props.pageSize;

    return sortedFilteredProducts.value.slice(start, end);
})

const pageCount = computed(() => {
    let l = filteredProducts.value.length,
              s = props.pageSize;
            return Math.ceil(l / s);
})
</script>

<style lang="css" scoped>
.filters {
    padding: 10px
}

.products {
    margin: 0;
    list-style-type: none;
    padding: 0;
}

.products li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.8em;
    border-radius: 4px;
}

.products li:hover {
    color: #607D8B;
    background-color: yellow;
    left: .1em;
}

.products li:hover .name,
.products li:hover .price {
    color: #607D8B;
    background-color: #FFD800;
    left: .1em;
}

.products li.selected {
    background-color: #0094FF;
    color: white;
}

.products li.selected:hover {
    color: white;
}

.products li.selected .name,
.products li.selected .price {
    background-color: #0026FF;
    color: white;
}

.products .text {
    padding: 0.5em 0.7em 0em 0.7em;
    line-height: 1em;
    left: -1px;
    top: -4px;
    height: 1.8em;
}

.products .name {
    display: inline-block;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.products .price {
    float: right;
    width: 15%;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-left: .8em;
    border-radius: 0px 4px 4px 0px;
}

.products .description {
    height: 1.8em;
    display: inline-block;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.products .discontinued,
.products .discontinued * {
    color: red !important;
}
</style>
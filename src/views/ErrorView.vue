<template>
    <div>
        <h2>
            Error!
        </h2>
        <p>
            {{ message }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String
})
</script>
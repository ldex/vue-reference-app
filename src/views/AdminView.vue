<template>
    <div>
            <h2>Admin Page</h2>
            <div>
                Hello {{ userStore.username }}
            </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<style lang="css" scoped>

</style>
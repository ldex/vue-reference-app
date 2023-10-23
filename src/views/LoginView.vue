<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input label="Username" type="text" name="username" v-model="username" required autofocus autocomplete="off" />
            <br />
            <input label="Password" type="password" name="password" required v-model="password" />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter()

const username = ref('')
const password = ref('')

function login() {
    userStore.login({
        username: username.value,
        password: password.value
    })
        .then(
            () => {
                router.push({ name: "admin" });
                console.log('Successfully logged in!');
            }
        )
        .catch(error => {
            console.error('Unsuccessful login: ', error);
        })
}
</script>

<style lang="scss" scoped></style>
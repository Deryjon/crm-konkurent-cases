<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
            <UiInput placeholder="Login" type="text" class="mb-3" v-model="loginRef" />
            <UiInput placeholder="Password" type="password" class="mb-3" v-model="passwordRef" />
            <div class="flex items-center justify-center gap-5">
                <UiButton type="submit" @click="onSumbit">Login</UiButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">import { ref, computed } from 'vue'
const callCount = ref(0)
const loginRef = ref('')
const passwordRef = ref('')

const body = computed(() => JSON.stringify({
    login: loginRef.value,
    password: passwordRef.value,
}))

const didItWork = ref(false)

async function onSumbit() {
    try {
        const { data, error } = await useFetch('https://httpbin.org/post', {
            method: 'POST',
            body,
        })

        if (!error.value) {
            didItWork.value = true
        }
    } catch (err) {
    }
}


</script>

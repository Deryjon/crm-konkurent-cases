<script setup lang="ts">
import axios from '~/axios.config'


const emailRef = ref('')
const passwordRef = ref('')

const login = async () => {
  try {
    const response = await axios.post('/login', {
      login: emailRef.value,
      password: passwordRef.value
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}


</script>
<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
            <form action="">
                <UiInput placeholder="Email" type="email" class="mb-3" v-model="emailRef" />
                <UiInput placeholder="Password" type="password" class="mb-3" v-model="passwordRef" />
            </form>
            <div class="flex items-center justify-center gap-5">
                <UiButton type="button" @click="login">Login</UiButton>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mode = ref('')

type Theme = 'light' | 'dark'

const setColorTheme = (newTheme: Theme) => {
    useColorMode().preference = newTheme
}


onMounted(() => {
    mode.value = localStorage.getItem('nuxt-color-mode')
    useColorMode().preference = mode.value
})
</script>
<template>
    <div class="flex items-center mx-auto gap-[10px] cursor-pointer">
        <router-link to="/" class="text-3xl font-semibold">

            <div class="h-[60px] " v-if="$colorMode.preference === 'light'">
                <img src="../../assets/icons/logo-2.png" alt="" class="w-full h-full">
            </div>
            <div class="h-[60px]" v-if="$colorMode.preference === 'dark'">
                <img src="../../assets/icons/logo.png" alt="" class="w-full h-full">
            </div>
        </router-link>

        <div class="text-black dark:text-white cursor-pointer">

            <Icon name="heroicons:moon" size="25" v-if="$colorMode.preference === 'light'"
                @click="setColorTheme('dark')" />

            <Icon name="heroicons:sun" size="25" v-if="$colorMode.preference === 'dark'"
                @click="setColorTheme('light')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'
const selected = ref(false) || localStorage.getItem('colorMode') === 'light'

type Theme = 'light' | 'dark'

const router = useRouter()

const setColorTheme = (newTheme: Theme) => {
    localStorage.setItem('colorMode', newTheme)
    useColorMode().preference = newTheme
}

onMounted(() => {
    if (!selected.value) {
        setColorTheme('light')
    } else {
        setColorTheme('dark')
    }
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

                <Icon name="heroicons:moon" size="25" v-if="$colorMode.preference === 'light'"  @click="setColorTheme('dark')"/>
            
                <Icon name="heroicons:sun" size="25" v-if="$colorMode.preference === 'dark'"  @click="setColorTheme('light')"/>
        </div>
    </div>
</template>

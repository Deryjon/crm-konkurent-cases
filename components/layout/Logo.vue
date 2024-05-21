<script setup lang="ts">
import { ref } from 'vue'

const selected = ref(false) || localStorage.getItem('colorMode') === 'light'

type Theme = 'light' | 'dark'

const setColorTheme = (newTheme: Theme) => {
    useColorMode().preference = newTheme
}

if(!selected.value) {
    setColorTheme('light')
} else {
    setColorTheme('dark')
}
</script>

<template>
    <div class="flex items-center mx-auto gap-[10px]">
        <div class="h-[60px] " v-if="$colorMode.preference === 'light'">
            <img src="../../assets/icons/logo-2.png" alt="" class="w-full h-full">
        </div>
        <div class="h-[60px]" v-if="$colorMode.preference === 'dark'">
            <img src="../../assets/icons/logo.png" alt="" class="w-full h-full">
        </div>
    </div>
    <div class="flex items-center mx-auto gap-[10px] text-black dark:text-white">
        Light
        <UToggle color="blue" v-model="selected"
            @click="setColorTheme(selected ? 'light' : 'dark')" />
        Dark
    </div>
</template>

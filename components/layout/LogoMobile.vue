<script setup lang="ts">
import { ref } from 'vue'

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
</template>

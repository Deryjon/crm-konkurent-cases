<script lang="ts" setup>
import { ref } from 'vue'

const isAuth = ref(true)
</script>


<template>
    <LayoutHeader class="md:hidden" />
    <!-- <p v-if="!isAuth">Loading</p> -->
    <section class="flex">
        <div :class="{ grid: isAuth }" >
            <LayoutSidebar class="sticky top-[20px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block"
                v-if="isAuth" />
        </div>
        <div class="bg-[#262626] w-full">
            <slot />
        </div>
    </section>
</template>

<style scoped>
@media(min-width: 768px) {

    .grid {
        display: grid;
        grid-template-columns: 1.2fr 5fr;

    }
}
</style>
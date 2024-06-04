<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth-store'
import { ref, onMounted } from 'vue'

const store = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

onMounted(async () => {
    if(localStorage.getItem('nuxt-color-mode') === 'null') {
        localStorage.setItem('nuxt-color-mode', 'light')    
    }
    if (process.client) {
        const token = localStorage.getItem('token')
        if (token) {
            store.status = true
        } else {
            store.status = false
            router.push('/login')
        }
    }
    isLoading.value = true;

})



</script>



<template>
    <LayoutHeader class="lg:hidden" v-if="store.status" />
    <LayoutTheLoader v-if="!isLoading" />
    <section class="flex bg-white dark:bg-[#404040] text-black dark:text-white" v-else>
        <div :class="{ grid: store.status }" class="border-r border-black dark:border-0">
            <LayoutSidebar class="sticky top-[20px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block"
                v-if="store.status" />
        </div>
        <div class="bg-white dark:bg-[#262626] w-full min-h-[100vh] py-[20px] px-[15px] md:p-[40px]">
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
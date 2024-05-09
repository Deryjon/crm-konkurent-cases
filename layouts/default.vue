<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth-store'
import { ref, onMounted } from 'vue'

const store = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

onMounted(async () => {
    if (process.client) {
        const token = localStorage.getItem('token')
        if (token) {
            store.status = true
        } else {
            store.status = false
            router.push('/login')
        }
    }
})

onMounted(() => {
    isLoading.value = true;
})

const date1 = new Date()
const date2 = process.client ? new Date(parseInt(localStorage.getItem('exp') || '0')) : new Date()

if (date1 > date2) {
    console.log("Date 1 is later than Date 2.");
} else if (date1 < date2) {
    if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('exp')
        localStorage.removeItem('role')
        location.reload()
    }
} else {
    console.log("Both dates are equal.");
}
</script>



<template>
    <LayoutHeader class="md:hidden" v-if="store.status" />
    <LayoutTheLoader v-if="!isLoading" />
    <section class="flex" v-else>
        <div :class="{ grid: store.status }">
            <LayoutSidebar class="sticky top-[20px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block"
                v-if="store.status" />
        </div>
        <div class="bg-[#262626] w-full min-h-[100vh] py-[20px] px-[15px] md:p-[40px]">
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

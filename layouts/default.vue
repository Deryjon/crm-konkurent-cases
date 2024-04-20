<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth-store'

const store = useAuthStore()
const router = useRouter()

onMounted (async () => {
    const token = localStorage.getItem('token')
    if (token) {
        store.status = true
    } else {
        store.status = false
        router.push('/login')
    }
})
</script>


<template>
    <LayoutHeader class="md:hidden" />

    <section class="flex">
        <div :class="{ grid: store.isAuth }" >
            <LayoutSidebar class="sticky top-[20px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block"
                v-if="store.isAuth" />
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

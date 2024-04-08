<script lang="ts" setup>
</script>


<template>
    <LayoutHeader class="md:hidden"/>
    <section class="flex">
        <div class="grid lg:gap-10">
            <LayoutSidebar class="sticky top-[20px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block" />
        </div>
        <div class="bg-[#262626] w-full">
            <slot />
        </div>
    </section>
</template>

<style scoped>
@media(min-width: 768px){
    
    .grid {
        display: grid;
        grid-template-columns: 1.2fr 5fr;
    
    }
}
</style>
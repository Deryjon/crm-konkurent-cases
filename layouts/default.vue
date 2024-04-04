<script lang="ts" setup>
</script>


<template>
    <LayoutHeader class="md:hidden"/>
    <section class="">
        <div class="grid">
            <LayoutSidebar class="relative hidden md:block" />
            <div class="bg-[#262626]">
                <slot />
            </div>
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
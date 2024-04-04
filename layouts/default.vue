<script lang="ts" setup>
</script>


<template>
    <LayoutHeader class="md:hidden"/>
    <section class="">
        <div class="grid">
            <LayoutSidebar class="relative hidden lg:block" />
            <div class="bg-[#262626]">
                <slot />
            </div>
        </div>
    </section>
</template>

<style scoped>
@media(min-width: 840px){
    
    .grid {
        display: grid;
        grid-template-columns: 1.2fr 5fr;
    
    }
}
</style>
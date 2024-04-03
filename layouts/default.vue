<script lang="ts" setup>

</script>


<template>
    <!-- <p v-if="isLoadingStore.isLoading" class="">Loader</p> -->
    <section class="">
        <div class="container grid">
<!-- <button
          @click="isOpen = true"
          aria-label="Open menu"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden"
        >
          <span class="sr-only">Button used to open menu</span>
          <Icon name="heroicons:bars-2" />
        </button> -->
            <LayoutSidebar  />
            <div class="bg-[#262626]">
                <slot /> 
            </div>
        </div>
    </section>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1.2fr 5fr;
    
}
</style>
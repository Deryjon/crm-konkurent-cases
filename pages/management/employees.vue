<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
const toggleOpen = () => {
    open.value = !open.value;
};


</script>

<template>
    <section class="catalog">
        <div class="top flex items-center justify-between">
            <h2 class="text-2xl lg:text-4xl font-semibold ">Сотрудники</h2>
            <div class="stats flex items-center justify-between  text-[18px] w-[200px] cursor-pointer"
                @click="toggleOpen">
                <Icon :class="[open ? 'rotate-180' : '']" name="heroicons:chevron-down"
                    class="w-5 h-5 text-muted-foreground" />
                <div v-if="!open">
                    <p class="truncate">Показать статистику</p>
                </div>
                <div v-else>
                    <p class="truncate">Скрыть статистику</p>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.photo-cell {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>
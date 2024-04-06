<script setup lang="ts">
import { ref } from 'vue';
import Stat from './components/Stat.vue';
import InputSearch from '../../components/layout/InputSearch.vue'
import CreateBtn from './components/CreateBtn.vue';
const open = ref(false);
const toggleOpen = () => {
    open.value = !open.value;
};
</script>

<template>
    <section class="h-[100vh] py-[20px] px-[15px] md:p-[40px]">
        <div class="top flex items-center justify-between">
            <h2 class="text-4xl font-semibold ">Каталог</h2>
            <div class="stats flex items-center justify-between  text-[18px] w-[200px] cursor-pointer" @click="toggleOpen">
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
        <Stat v-if="open" class="mt-[30px]" />
        <div class="input flex justify-between mt-[50px] ">

            <InputSearch class="" />
            
            <CreateBtn />
        </div>
    </section>
</template>

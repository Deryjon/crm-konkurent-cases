<script setup lang="ts">
import { ref } from 'vue';
import CreateBtn from '../../components/layout/CreateBtn.vue'
import InputSearch from '../../components/layout/InputSearch.vue'
import AgentsTable from './components/AgentsTable.vue';
const open = ref(false);
const toggleOpen = () => {
    open.value = !open.value;
};


</script>

<template>
    <section class="catalog">
        <div class="top flex items-center justify-between">
            <h2 class="text-2xl lg:text-4xl font-semibold ">Агенты</h2>
        </div>
        <div class="input flex justify-between mt-[50px] ">

            <InputSearch class="" />

            <router-link to="/clients/create-agent">

             <CreateBtn >Новый агент</CreateBtn>
            </router-link>
        </div>

        <AgentsTable />
    </section>
</template>
<style scoped>
</style>
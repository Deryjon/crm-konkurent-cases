<script setup lang="ts">
import { ref } from 'vue';
import CreateBtn from '../../components/layout/CreateBtn.vue'
// import InputSearch from '../../components/layout/InputSearch.vue'
import SellersTable from './components/SellersTable.vue';


useHead({
  title: "Добавить сотрудника"
})

const open = ref(false);
const toggleOpen = () => {
    open.value = !open.value;
};


</script>

<template>
    <section class="catalog">
        <div class="top flex items-center justify-between">
            <h2 class="text-2xl lg:text-4xl font-semibold ">Сотрудники</h2>
        </div>
        <div class="input flex justify-between mt-[50px] ">

            <!-- <InputSearch class="" /> -->

            <router-link to="/management/create">

                <CreateBtn>Новый сотрудник</CreateBtn>
            </router-link>
        </div>

        <SellersTable />
    </section>
</template>
<style scoped>
.photo-cell {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>
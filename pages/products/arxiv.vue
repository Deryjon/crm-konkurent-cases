<script setup lang="ts">
import Stat from './components/Stat.vue';
import CatalogTable from './components/CatalogTable.vue';
import InputSearch from './components/InputSearch.vue'
import CreateBtn from '../../components/layout/CreateBtn.vue'
import { fetchStats } from './components/stats.data'


useHead({
  title: "Архив товары"
})


const open = ref(false);



const toggleOpen = () => {
  open.value = !open.value;
  fetchStats()
};

</script>
<template>
  <section class="catalog">
    <div class="top flex items-center justify-between">
      <h2 class="text-2xl lg:text-4xl font-semibold ">Архив товары</h2>
    </div>
    <Stat v-if="open" class="mt-[30px]" />
    <div class="input flex justify-between mt-[50px] ">

      <InputSearch class="" />

      <router-link to="/products/catalog">

        <CreateBtn>Добавить продукт</CreateBtn>
      </router-link>
    </div>
    <CatalogTable />
    <KanbanSlideover />
  </section>
</template>
<style scoped>
.customize-table {
  --easy-table-border: 1px solid #262626;
  --easy-table-border-radius: 1000px;
  --easy-table-row-border: 1px solid #ffffff;

  --easy-table-header-font-size: 18px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #262626;
  --easy-table-header-border-radius: 20px;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #262626;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #262626;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 18px;

  --easy-table-body-row-hover-background-color: #535353;
  --easy-table-body-row-hover-font-color: #c0c7d2;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #262626;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  ;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}

.photo-cell {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>

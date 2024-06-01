<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ExitButton from '../../../components/layout/ExitButton.vue';
import { useToast } from 'vue-toastification'
import TheLoader from '../../../components/layout/TheLoader.vue';

const isLoading = ref(true);
const imageUrls = ref<string[]>([]);
let item = ref([]);

const toast = useToast();

const headers = [
  { text: "Наименование", value: "name" },
  { text: "Количество", value: "quantity" },
  { text: "Цена", value: "cost_price" },

];
 
const itemsProducts = ref([])
onMounted( () => {
     item = JSON.parse(localStorage.getItem('import-item') || '')
     itemsProducts.value = item.products
         
         isLoading.value = false
     console.log(item)
});
</script>



<template>
    <LayoutTheLoader v-if="isLoading"/>
    <section class="create h-[100vh]  py-[20px] lg:px-[10px] md:p-[0px]" v-else>
        <div class="flex items-center gap-2 mt-6">
            <router-link to="/products/import">

                <ExitButton />
            </router-link>
            <h2 class="text-xl lg:text-4xl font-semibold ml-5">Данные об импорте</h2>
        </div>
                <div class="flex flex-col gap-5 mt-10">
                    <p>Дата: {{ item?.date }}</p>
                    <p>Код импорта: {{ item?.id }}</p>
                    <p>Количество товаров: {{ item.products?.length }}</p>
                </div>
                <div class="products mt-10">
                    <p class="text-2xl font-semibold">Добавленные товары</p>
                    <EasyDataTable            :hide-footer="true"
 :headers="headers" :items="itemsProducts" header-text-direction="center" body-text-direction="center"
        class="mt-10" :class="[$colorMode.preference === 'dark' ? 'customize-table' : 'customize-light-table']">
        <template #item-name="{ name }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer"
                >{{ name }}</p>
        </template>
      </EasyDataTable>
                </div>
    </section>
</template>
<style>

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
  --easy-table-scrollbar-thumb-color: #4c5d7a --easy-table-scrollbar-thumb-color: #4c5d7a;

  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #262626;
}

.customize-light-table {
  --easy-table-border: 1px solid #262626;
  --easy-table-border-radius: 1000px;
  --easy-table-row-border: 1px solid #262626;

  --easy-table-header-font-size: 18px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #111;
  --easy-table-header-background-color: #ffffff;
  --easy-table-header-border-radius: 20px;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #111;
  --easy-table-body-even-row-background-color: #262626;

  --easy-table-body-row-font-color: #111;
  --easy-table-body-row-background-color: #ffffff;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 18px;

  --easy-table-body-row-hover-background-color: #909090;
  --easy-table-body-row-hover-font-color: #111;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #ffffff;
  --easy-table-footer-font-color: #111;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;
  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a --easy-table-scrollbar-thumb-color: #4c5d7a;

  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #262626;
}
</style>
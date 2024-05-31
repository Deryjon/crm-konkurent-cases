<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { useDashboardService } from './components/dashboardService'
import { base_url } from '~/api'
import { useFetch } from "@vueuse/core";

useHead({
  title: "Главная"
})
const lastWeekData = ref([]);
const lastYear = ref([]);
const items = ref([]);
const labelsData = ref([]);

// const { labelsData, items, fetchDashboard } = useDashboardService();

interface Dataset {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: number[];
}

interface WeekdayData {
  labels: string[];
  datasets: Dataset[];
}

const loaded = ref(false);
const weekdayData = {
  labels: lastWeekData.value.map(item => item.label),
  datasets: [
    {
      label: 'Продажа',
      backgroundColor: '#ffffff',
      borderColor: '#1F78FF',
      data: lastWeekData.value.map(item => item.value)
    }
  ]
};
const yearData = {
  labels: lastWeekData.value.map(item => item.label),
  datasets: [
    {
      label: 'Продажа',
      backgroundColor: '#ffffff',
      borderColor: '#1F78FF',
      data: lastWeekData.value.map(item => item.value)
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false
};


const headers = [
  { text: "Наименование", value: "label" },
  { text: "Количество", value: "value" },

];
 
const itemstopProducts = ref([])
const fetchDashboard = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const { data } = await useFetch(`${base_url}/dashboard`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).json();
  items.value = data?.value;
  itemstopProducts.value = data.value.topProducts
  lastWeekData.value = data.value.last7daySales;
  lastYear.value = data.value.lastYearSales;
  weekdayData.labels = lastWeekData.value.map(item => item.label);
  weekdayData.datasets[0].data = lastWeekData.value.map(item => item.value);
  yearData.labels = lastYear.value.map(item => item.label);
  yearData.datasets[0].data = lastYear.value.map(item => item.value);
  loaded.value = true
};
const date1 = new Date();
const epoch = localStorage.getItem('epoch');
const date2 = new Date(epoch * 1000);


console.log('Текущая дата (date1):', date1);
console.log('Дата из локального хранилища (date2):', date2);

const isExpired = date1 < date2;
console.log('Истек ли срок:', isExpired);

if (isExpired) {
    console.log('Срок действия истек. Очищаем локальное хранилище и перезагружаем страницу.');
    localStorage.clear();
    window.location.reload();
} else {
    console.log('Срок действия не истек. Продолжаем выполнение.');
}
onMounted(() => {
  fetchDashboard();
})

</script>
<template>
  <section class="new-order mt-[15px]">
    <div class="flex justify-between">
      <h2 class="text-2xl lg:text-4xl font-semibold ">Главная</h2>
    </div>

    <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Статистика Недели</p>
    <div class="bar h-[300px]">
      <Line v-if="loaded" :data="weekdayData" :options="options" />
    </div>
    <div class="top-10">
      <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Топ-10 Товаров</p>
      <EasyDataTable            :hide-footer="true"
 :headers="headers" :items="itemstopProducts" header-text-direction="center" body-text-direction="center"
        class="mt-10" :class="[$colorMode.preference === 'dark' ? 'customize-table' : 'customize-light-table']">
        <template #item-value="{ value }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer"
                >{{ value }}</p>
        </template>
      </EasyDataTable>
    </div>
    <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Статистика Года</p>
    <div class="bar h-[300px]">
      <Line v-if="loaded" :data="yearData" :options="options" />
    </div>
  </section>
</template>
<style scoped>
.cart {
  border: 1px #ffffff dashed;
}

input {
  outline: none;
}

.bor {
  border: 1px #ffffff dashed;
}

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

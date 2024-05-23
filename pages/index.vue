import { ref, watch, onMounted } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";

export const useDashboardService = () => {
  const lastWeekData = ref([]);
  const lastYear = ref([]);
  const items = ref([]);
  const labelsData = ref([]);
  let total = ref(0);

  const fetchDashboard = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const { data, isFetching, error } = useFetch(`${base_url}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).json();

    watch(data, (newData) => {
      if (newData) {
        items.value = newData;
        lastWeekData.value = newData.last7daySales;
        lastYear.value = newData.lastYearSales;
        labelsData.value = Array.isArray(newData.last7daySales) ? newData.last7daySales.map(item => item.label) : [];
      }
    });
  };

  return {
    items,
    fetchDashboard,
    total,
    lastWeekData,
    labelsData,
    lastYear
  };
};

<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { useDashboardService } from './components/dashboardService'
useHead({
  title: "Главная"
})

const { labelsData, items, fetchDashboard } = useDashboardService();

const dataLabel =  []
const weekdayData = {
  labels: dataLabel,
  datasets: [
    {
      label: 'Продажи за последние 7 дней',
      backgroundColor: '#ffffff',
      borderColor: '#1F78FF',
      data: []
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

onMounted(async() => {
 await fetchDashboard();
dataLabel.value = labelsData.value 
console.log(dataLabel.value)
})

</script>
<template>
  <section class="new-order mt-[15px]">
    <div class="flex justify-between">
      <h2 class="text-2xl lg:text-4xl font-semibold ">Главная</h2>
    </div>

    <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Статистика Продаж</p>
    <div class="bar h-[300px]">
      <Line :data="weekdayData" :options="options" />
    </div>
    {{ items.lastYearSales }}
    {{ items.last7daySales }}

    <div class="top-10">
      <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Топ-10 Товаров</p>
      <div class="flex justify-between mt-5">
        <p class="name text-lg font-semibold">Наименование</p>
        <p class="quantity text-lg font-semibold">Количество</p>
      </div>
      <div class="cards flex flex-col gap-5">
        <div v-for="product in items.topProducts" :key="product.label" class="flex justify-between border rounded-2xl p-2">
          <p class="name">{{ product.label }}</p>
          <p class="name w-[95px]">{{ product.value }}</p>
        </div>
      </div>
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
</style>

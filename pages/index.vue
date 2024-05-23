<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { base_url } from "~/api";
import { useDashboardService } from './components/dashboardService'
useHead({
  title: "Главная"
})

const { items, fetchDashboard } = useDashboardService();

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#ffffff',
      borderColor: '#1F78FF',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}
const options = {
  responsive: true,
  maintainAspectRatio: false
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

    <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Статистика Продаж</p>
    <div class="bar h-[300px]">


      <Line :data="data" :options="options" />
    </div>
    {{ items.lastYearSales }}

    <div class="top-10">

<p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Топ-10 Товаров</p>
<div class="flex justify-between mt-5">
  <p class="name text-lg font-semibold">Наименование</p>
  <p class="quantity text-lg font-semibold">Количество</p>
</div>
<div class="cards flex flex-col gap-5">

  <div v-for="product in items.topProducts" :key="product.label" class="flex  justify-between border rounded-2xl p-2 ">
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
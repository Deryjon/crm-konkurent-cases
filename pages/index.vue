<script lang="ts" setup>
  import { Line } from 'vue-chartjs'
useHead({
  title: "Главная"
})
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
</script>
<template>
  <section class="new-order  mt-[15px]">
    <div class="flex justify-between">
      <h2 class="text-2xl lg:text-4xl font-semibold ">Главная</h2>
    </div>

    <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Статистика Продаж</p>
    <div class="bar h-[300px]">


      <Line :data="data" :options="options" />
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
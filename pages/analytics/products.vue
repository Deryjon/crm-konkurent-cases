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
      <h2 class="text-2xl lg:text-4xl font-semibold ">Статистика Товаров</h2>
    </div>

    <p class="text-2xl lg:text-3xl font-semibold mt-[30px]">Топ-20</p>
    <div class="cards flex flex-col gap-3 mt-4">
        <div class="card text-lg bor flex rounded-2xl gap-3 p-3 w-[500px] items-center bor">
            <div class="top">
                <p>1.</p>
            </div>
            <div class="name">
                <p>Адаптер света</p>
            </div>
            <div class="quantity">
                <p>95 шт</p>
            </div>
        </div>
        <div class="card text-lg bor flex rounded-2xl gap-3 p-3 w-[500px] items-center bor">
            <div class="top">
                <p>1.</p>
            </div>
            <div class="name">
                <p>Адаптер света</p>
            </div>
            <div class="quantity">
                <p>95 шт</p>
            </div>
        </div>
        <div class="card text-lg bor flex rounded-2xl gap-3 p-3 w-[500px] items-center bor">
            <div class="top">
                <p>1.</p>
            </div>
            <div class="name">
                <p>Адаптер света</p>
            </div>
            <div class="quantity">
                <p>95 шт</p>
            </div>
        </div>
        <div class="card text-lg bor flex rounded-2xl gap-3 p-3 w-[500px] items-center bor">
            <div class="top">
                <p>1.</p>
            </div>
            <div class="name">
                <p>Адаптер света</p>
            </div>
            <div class="quantity">
                <p>95 шт</p>
            </div>
        </div>
    </div>
    <!-- <div class="bar h-[300px]">


      <Line :data="data" :options="options" />
    </div> -->

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
  border: 1px blue solid;
}
</style>
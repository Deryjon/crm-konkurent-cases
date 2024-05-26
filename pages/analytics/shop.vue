<script lang="ts" setup>
  import { Line } from 'vue-chartjs'
  import VueDatePicker from '@vuepic/vue-datepicker';

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

const date = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
});

watch(date, (newValue) => {
  if (newValue) {
console.log(newValue)  }
});

onMounted(() => {
  date.value = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  }
})

</script>
<template>
  <section class="new-order  mt-[15px]">
    <div class="flex justify-between">
        <h2 class="text-2xl lg:text-4xl font-semibold ">Статистика Магазина</h2>
        <button class="flex text-white items-center justify-center gap-4 bg-[#1F78FF] lg:w-[200px] rounded-2xl p-5">
        <Icon name="fa:download" />
        <p class="text-[16px]  font-semibold hidden lg:block">
            Скачать Excel
        </p>
    </button>    </div> 
<div class="flex justify-between items-center mt-10">

  <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Ежемесяная продажа</p> 
  <div class="w-[200px]" >
    
    <VueDatePicker v-model="date" month-picker  placeholder="Выберите дату"
                        class=" p-3 rounded-2xl bg-[#1F78FF] " />
  </div>
</div>

    <div class="bar h-[300px]">


      <Line :data="data" :options="options" />
    </div>

  </section>
</template>
<style scoped>
.cart {
  border: 1px #ffffff dashed;
}

.dp__theme_light {
    --dp-background-color: #1F78FF;
    --dp-text-color: #ffffff;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #1976d2;
    --dp-primary-disabled-color: #6bacea;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-menu-border-color: #1F78FF;
    --dp-border-color: #1F78FF;
    --dp-border-color-hover: #1F78FF;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #1F78FF;
    --dp-scroll-bar-color: #1F78FF;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #ffffff;
    --dp-danger-color: #ff6f60;
    --dp-marker-color: #ff6f60;
    --dp-tooltip-color: #fafafa;
    --dp-disabled-color-text: #8e8e8e;
    --dp-highlight-color: rgb(25 118 210 / 10%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
    --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
input {
  outline: none;
}

.bor {
  border: 1px #ffffff dashed;
}
</style>
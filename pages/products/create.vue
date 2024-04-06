<script setup lang="ts">
import PriceCreate from './components/priceCreate.vue';


</script>

<template>
  <section class="create h-[100vh] py-[20px] px-[15px] md:p-[40px]">
    <div class="top flex items-center justify-between">
      <h2 class="text-4xl font-semibold ">Каталог</h2>
    </div>
    <div class="basic">
      <div class="name mt-10">
        <label for="">Наименование</label>
        <UiInput placeholder="Введите наименование" />
      </div>
      <div class="flex justify-between mt-10">
        <div class="articul w-1/3">
          <label for="">Артикул</label>
          <UiInput placeholder="Введите артикул" />
        </div>
        <div class="barcode w-1/3">
          <label for="">Баркод</label>
          <UiInput placeholder="Введите баркод" />
        </div>
      </div>
    </div>
    <PriceCreate/>
  </section>
</template>

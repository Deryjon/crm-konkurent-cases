<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import CreateBtn from '../../components/layout/CreateBtn.vue';
import ImportTable from './components/ImportTable.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useImportService } from './components/importService';
import { useImport } from "~/store/searchImport";

useHead({
  title: 'Импорт'
});

const date = ref<Date[]>([]);
const fromDate = ref<string>('');
const toDate = ref<string>(''); 
const store = useImport()
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}



onMounted(() => {
  const startDate = new Date();
  const endDate = new Date();
  date.value = [startDate, endDate];
});

watch(date, (newValue) => {
  fromDate.value = formatDate(date.value[0]); 
  toDate.value = formatDate(date.value[1]); 
  store.setFromDate(fromDate.value);
  store.setToDate(toDate.value);
});



</script>


<template>
  <section class="h-[100vh]">
    <h2 class="text-2xl lg:text-4xl font-semibold">Импорт</h2>
    <div class="input flex justify-between mt-[50px]">
      <div class="picker-date">
        <VueDatePicker v-model="date" :enable-time-picker="false" range placeholder="Выберите дату" class="p-3 rounded-2xl bg-[#1F78FF]" />
      </div>
      <router-link to="/products/create-import">
        <CreateBtn>Новый импорт</CreateBtn>
      </router-link>
    </div>
    <ImportTable />
  </section>
</template>
  <style scoped>
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
  </style>

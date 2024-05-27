<script lang="ts" setup>
  import VueDatePicker from '@vuepic/vue-datepicker';
import {base_url} from '~/api';
import { useRoute, useRouter } from 'vue-router';
import {useToast} from 'vue-toastification';
import {useFetch} from '@vueuse/core';
import { ref, watch, onMounted } from 'vue';

const toast = useToast();
useHead({
  title: "Отчет агента"
})

const id = useRoute().params.id;

const date = ref({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });


  const headers = [
    { text: "Дата", value: "date" },
    { text: "USD", value: "total_usd" },
  ];

  const itemsMonthly = ref([]);
const bonus = ref(0)
const fetchAgents = async () => {
    if(localStorage.getItem("role") !== "admin" && localStorage.getItem("role") !== "manager") {
      toast.error('Ошибка при запросе')
      return;
    }
    let month = date.value.month;
    month = month.toString().padStart(2, '0');
    const token = localStorage.getItem("token");
    if (!token) return;
     
      const { data } = await useFetch(`${base_url}/report/agent?id=${id}&month=${date.value.year}-${month}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).json();
      bonus.value = data.value.bonus
itemsMonthly.value = data.value.report;
    };

    const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    
    headers.push('Бонус');
    const rows = data.map(obj => {
        const row = Object.values(obj);
        row.push(bonus.value);
        return row;
    });
    const csvRows = rows.map(row => row.join(';')).join('\n');
        const csvString = headers.join(';') + '\n' + csvRows;
    
    return csvString;
};




const downloadExcel = () => {
    if (itemsMonthly.value.length === 0) {
        console.error('No data available for CSV download.');
        return;
    }
    const csvContent = convertToCSV(itemsMonthly.value);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "analytics-agent.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  watch(date, (newValue) => {
    if (newValue) {
      let month = newValue.month;
      month = month.toString().padStart(2, '0');
      fetchAgents();
    }
  });

  onMounted(() => {
    fetchAgents();
    date.value = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };
  });
</script>
<template>
  <section class="new-order  mt-[15px]">
    <div class="flex justify-between">
      <h2 class="text-2xl lg:text-4xl font-semibold ">Отчет Агента</h2>
      <button @click="downloadExcel" class="flex text-white items-center justify-center gap-4 bg-[#1F78FF] lg:w-[200px] rounded-2xl p-5">
        <Icon name="fa:download" />
        <p class="text-[16px] font-semibold hidden lg:block">
          Скачать Excel
        </p>
      </button> 
    </div>
    <div class="flex justify-between items-center mt-10">
      <p class="text-xl lg:text-3xl font-semibold mt-[30px]">Ежемесячный отчет об агенте</p>
      <div class="w-[200px]">
        <VueDatePicker v-model="date" month-picker placeholder="Выберите дату"
                       class="p-3 rounded-2xl bg-[#1F78FF]" >
                       <template #clear-icon="{ clear }">
        </template>
                      </VueDatePicker>
      </div>
    </div>
    <h3 class="text-2xl font-semibold mt-10">
     Общие Бонусы - {{ bonus }} USD
    </h3>
    <EasyDataTable :hide-footer="true"
                   :headers="headers" :items="itemsMonthly" header-text-direction="center" body-text-direction="center"
                   class="mt-10" :class="[$colorMode.preference === 'dark' ? 'customize-table' : 'customize-light-table']">
      <template #item-date="{ date }">
        <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer">{{ date }}</p>
      </template>
    </EasyDataTable>

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
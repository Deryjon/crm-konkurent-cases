<script lang="ts" setup>
  import VueDatePicker from '@vuepic/vue-datepicker';
  import { base_url } from '~/api';
  import { useFetch } from "@vueuse/core";
  import { ref, watch, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  useHead({
    title: "Отчеты"
  });

  const toast = useToast();

  const headers = [
    { text: "Дата", value: "date" },
    { text: "UZS", value: "total_uzs" },
    { text: "USD", value: "total_usd" },
  ];

  const date = ref({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const itemsMonthly = ref([]);

  const fetchAnalytics = async () => {
    if(localStorage.getItem("role") !== "admin" && localStorage.getItem("role") !== "manager") {
      toast.error('Ошибка при запросе')
      return;
    }
    let month = date.value.month;
    month = month.toString().padStart(2, '0');
    console.log(date.value.year + '-' + month);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await useFetch(`${base_url}/report/monthly?month=${date.value.year}-${month}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).json();
      itemsMonthly.value = data.value.report;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };
  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    
    // Создаем строки данных
    const rows = data.map(obj => {
        return headers.map(header => obj[header] ?? ''); // Если значение отсутствует, используем пустую строку
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
    link.setAttribute("download", "analytics.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  watch(date, (newValue) => {
    if (newValue) {
      let month = newValue.month;
      month = month.toString().padStart(2, '0');
      fetchAnalytics();
    }
  });

  onMounted(() => {
    // fetchAnalytics();
    date.value = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };
  });
</script>


<template>
  <section class="new-order mt-[15px]">
    <div class="flex justify-between">
      <h2 class="text-2xl lg:text-4xl font-semibold">Статистика Магазина</h2>
      <button @click="downloadExcel" class="flex text-white items-center justify-center gap-4 bg-[#1F78FF] lg:w-[200px] rounded-2xl p-5">
        <Icon name="fa:download" />
        <p class="text-[16px] font-semibold hidden lg:block">
          Скачать Excel
        </p>
      </button>
    </div>
    <div class="flex justify-between items-center mt-10">
      <p class="text-2xl lg:text-4xl font-semibold mt-[30px]">Ежемесячный отчет о продажах</p>
      <div class="w-[200px]">
        <VueDatePicker v-model="date" month-picker placeholder="Выберите дату"
                       class="p-3 rounded-2xl bg-[#1F78FF]" >
                       <template #clear-icon="{ clear }">
        </template>
                      </VueDatePicker>
      </div>
    </div>
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
input {
  outline: none;
}

.bor {
  border: 1px #ffffff dashed;
}
</style>
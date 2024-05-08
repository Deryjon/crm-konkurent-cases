<script lang="ts" setup>
import { ref } from 'vue'
import InputSearchSales from '../../components/layout/InputSearchSales.vue'
import InputData from './components/InputData.vue'
import { SALES_DATA } from './components/sales.data'
import VueDatePicker from '@vuepic/vue-datepicker';
import {useSaleService} from './components/salesService'
useHead({
  title: "Все продажи"
})

const date = ref<Date[]>([]);
const fromDate = ref<string>('');
const toDate = ref<string>(''); 
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const serverOptions = ref<ServerOptions>({ page: 1, rowsPerPage: 10 }); 

const { fetchSales } = useSaleService(date, fromDate, toDate, serverOptions); 

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date();
  date.value = [startDate, endDate];
  fetchSales(); 
});

watch(date, (newValue) => {
  fromDate.value = formatDate(date.value[0]); 
  toDate.value = formatDate(date.value[1]); 
  fetchSales(); 
});

</script>
<template>
    <section class="new-order flex mt-[15px]">
        <div class="left w-[850px] border-r pr-4 mt-[10px]">
            <div class="flex justify-between">
                <h2 class="text-2xl lg:text-4xl font-semibold ">Все продажи</h2>
                <div>

                    <VueDatePicker v-model="date" :enable-time-picker="false" range placeholder="Выберите дату" class=" p-3 rounded-2xl bg-[#1F78FF]" />
                </div>
            </div>
            <div class="search mt-10">
                <div class="top flex justify-between">

                    <InputSearchSales class="" />
                    <button class="flex items-center gap-4 bg-[#1F78FF]  rounded-2xl p-5">
                        <Icon name="fontisto:arrow-return-right" />
                        <p>Возврат</p>
                    </button>
                </div>
                <div class="body mt-5">
                    <div class="cards mt-5">
                        <div class="card bg-[#404040] p-4 rounded-2xl flex items-center justify-between font-medium">
                            <div class="left flex items-center gap-6">

                                <div class="etc flex items-center gap-2 border rounded-xl p-2">
                                   1 шт
                                </div>
                                <div class="">

                                    <div class="name-product flex gap-2">
                                        <p>Продажа</p>
                                        <p>2991918818</p>
                                        
                                    </div>
                                    
                                    <div class="name-product flex gap-2">
                                        <p>19.04.2024</p>
                                        |
                                        <p>16:55:23</p>
                                    </div>
                                </div>
                            </div>
                            <div class="right flex items-center gap-6">

                                <div class="price flex items-center gap-2 text-[#1F78FF] cursor-pointer">
                                    <p class="text-xl font-semibold">100000 UZS</p>
                                   
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="right w-[300px] p-4 h-[630px]">
            <div class="clients bg-[#404040] rounded-2xl ">
                <div class="top p-3">

                    <p>Транзакции</p>
                    <p>0 шт</p>
                </div>
                <div class="bor"></div>
                <div class="data-sales flex flex-wrap gap-7 p-3">
                    <div class="" v-for="item in SALES_DATA">
                        <p class="name">{{ item.name }}</p>
                        <div class="flex gap-1">

                            <p class="etc">{{ item.etc }}</p>
                            <p class="unit">{{ item.unit }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-[#404040] rounded-2xl p-5 shadow-2xl mt-20">
                <p>Сумма транзакций</p>
                <div class="flex gap-1">

<p class="etc">0</p>
<p class="unit">UZS</p>
</div>
            </div>
        </div>
        <!-- будем делать через модалку при нахождение товаров должен открыться модалка и выйти товары при нажатие на них должен добавляться в [] чтобы я мог отправить запрос через [] -->
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
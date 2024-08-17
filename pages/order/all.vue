<script lang="ts" setup>
import { onMounted, watch, ref, computed } from 'vue';
import { SALES_DATA } from './components/sales.data'
import VueDatePicker from '@vuepic/vue-datepicker';
import { useSaleService } from './components/salesService'
import { base_url } from '~/api';
import { useToast } from 'vue-toastification'


useHead({
    title: "Все продажи"
})

const date = ref<Date[]>([]);
const fromDate = ref<string>('');
const toDate = ref<string>('');
const selectedItem = ref<any>(null);

const toast = useToast();

const formatNumber = (value: number | undefined): string => {
  if (value === undefined) return '';
  return new Intl.NumberFormat('de-DE').format(value);
};

function formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
}

const serverOptions = ref<ServerOptions>({ page: 1, rowsPerPage: 10 });

const { items, fetchSales } = useSaleService(date, fromDate, toDate, serverOptions);

const isOpen = ref(false);
const deleteOpen = ref(false);

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date();
    date.value = [startDate, endDate];
});

watch(date, (newValue) => {
    fromDate.value = formatDate(date.value[0]);
    toDate.value = formatDate(date.value[1]);
    fetchSales();
});

const totalUsd = computed(() => items.value.reduce((total, sale) => total + sale.total_usd, 0));
const totalUzs = computed(() => items.value.reduce((total, sale) => total + sale.total_uzs, 0));

const calculateTotalQuantity = (products) => {
    if (!products || !Array.isArray(products)) {
        return 0;
    }
    return products.reduce((acc, product) => acc + product.quantity, 0);
}
const selectSale = (sale) => {
    console.log(sale)
    isOpen.value = true;
    selectedItem.value = sale;
    fetchAgents();
    fetchClients()
}

const agentName = ref('');

const fetchAgents = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/agent?pattern=${selectedItem.value?.agent_id}&limit=1`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    });
    if (data) {
        agentName.value = data.value.agents[0]?.fio
        // agents.value = data.value.agents;
    }
};

const clientName = ref('');

const fetchClients = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/customer?pattern=${selectedItem.value.customer_id}&limit=1`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    });
    if (data) {
        clientName.value = data.value.customers[0]?.fio

    }
};

const deleteItem = async (id: string) => {
    const token = localStorage.getItem("token") || "";
    const { status } = await useFetch(
        `${base_url}/sale?id=${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
    if (status.value === "success") {
        deleteOpen.value = false
        isOpen.value = false
        fetchSales();
        toast.success("Продажа удалена")
    }

};


</script>
<template>
    <section class="new-order lg:flex mt-[15px]">
        <div class="left lg:w-[830px] lg:border-r lg:pr-4 mt-[10px]">
            <div class="flex flex-wrap gap-2 justify-between">
                <h2 class="text-2xl lg:text-4xl font-semibold ">Все продажи</h2>
                <div class="picker-date">
        <VueDatePicker v-model="date" :enable-time-picker="false" range placeholder="Выберите дату" class="p-3 rounded-2xl bg-[#1F78FF]" >
          <template #clear-icon="{ clear }">
        </template>
        </VueDatePicker>
      </div>
            </div>
            <div class="search mt-5 lg:mt-10">
                <div class="top flex justify-between">
                </div>
                <div class="body mt-5">
                    <div class="cards flex flex-col gap-3 mt-5">
                        <div class="card bg-white border-2 dark:bg-[#404040] p-2 lg:p-4 rounded-2xl lg:flex items-center justify-between font-medium cursor-pointer"
                            v-for="(sale) in items" :key="sale.id" @click="selectSale(sale)">

                            <div class="left flex items-center gap-6">

                                <div class="etc flex items-center gap-2 border rounded-xl p-2">
                                    {{ calculateTotalQuantity(sale.products) }} шт
                                </div>
                                <div class="text-xs lg:text-sm">

                                    <div class="name-product flex gap-2">
                                        <p>Продажа</p>
                                        <p>{{ sale.id }}</p>

                                    </div>

                                    <div class="name-product flex gap-2">
                                        <p>{{ sale.date }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="right flex items-center gap-6">

                                <div class="price flex lg:flex-col items-center gap-2 text-[#1F78FF] cursor-pointer">
                                    <p class="text-md font-semibold">{{ formatNumber(sale.total_usd) }} USD</p>
                                    <p class="text-md font-semibold">{{ formatNumber(sale.total_uzs) }} UZS</p>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="right w-full lg:w-[300px] lg:p-4 lg:h-[630px] mt-5 lg:mt-0">
            <div class=" shadow-2xl bg-white border-2 dark:bg-[#404040] rounded-2xl ">
                <div class="top p-3">

                    <p>Транзакции</p>
                    <p>{{ items.length }} шт</p>
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

            <div class="bg-white border-2 dark:bg-[#404040] rounded-2xl p-5 shadow-2xl mt-5 lg:mt-20">
                <p>Сумма транзакций</p>
                <div class="flex gap-1">

                    <p class="etc">{{ formatNumber(totalUsd) }} </p>
                    <p class="unit">USD</p>
                </div>
                <div class="flex gap-1">

                    <p class="etc">{{ formatNumber(totalUzs) }}</p>
                    <p class="unit">UZS</p>
                </div>
            </div>
        </div>
        <USlideover v-model="isOpen" class="text-black dark:text-white">
            <UCard class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex justify-end">


<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"  @click="isOpen = false" />
</div> 
                    <div class="wrapper flex items-center justify-center gap-6">
                        <div class="obs flex flex-col items-center gap-3 p-2">
                            <p class="text-2xl">Продажа</p>
                            <p>#{{ selectedItem?.id }} </p>
                        </div>
                    </div>
                </template>

                <div class="product" v-if="selectedItem">
                    <h3 class="text-2xl font-semibold">Данные о продаже</h3>
                    <div class="flex flex-col gap-4 mt-2">
                        <p>Клиент: {{ clientName }}</p>
                        <p>Агент: {{ agentName }}</p>
                        <p>Сумма продажи: {{ selectedItem.total_usd }} USD</p>
                        <p>Сумма продажи: {{ selectedItem.total_uzs }} UZS</p>
                        <p>Количество товаров: {{ calculateTotalQuantity(selectedItem.products) }}</p>
                    </div>
                    <p class="text-2xl font-semibold mt-3">Проданные товары</p>
                    <div class="flex flex-col gap-4 mt-2">
                        <div class="card flex gap-3" v-for="item in selectedItem.products">

                            <p> {{ item.name }}</p> |
                            <p> {{ item.quantity }}</p>|
                            <p> {{ item.price }}</p>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <div class="wrapper flex items-center justify-center gap-6">
                        <button @click="deleteOpen = true" class="bg-red-500 w-[100px] rounded-lg py-2">
                            <Icon name="mdi:trash-can-outline" />
                            Удалить
                        </button>
                        <UModal v-model="deleteOpen">
                            <Placeholder>
                                <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                                <div class=" flex gap-10 items-center justify-center my-10">
                                    <button @click="deleteOpen = false"
                                        class="bg-red-400 w-[100px] rounded-lg">Нет</button>
                                    <button @click="deleteItem(selectedItem.id)"
                                        class="bg-green-400 w-[100px] rounded-lg">Да</button>
                                </div>
                            </Placeholder>
                        </UModal>
                    </div>
                </template>
            </UCard>
        </USlideover>
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
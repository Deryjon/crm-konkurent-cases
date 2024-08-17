<script setup lang="ts">
import { useSearchDefectStore } from '../../../store/searchDefect';
import { useDefectService } from './defectService';
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import DeleteBtn from '../../../components/layout/DeleteBtn.vue';
import EditBtn from '../../../components/layout/EditBtn.vue';
import { base_url } from '~/api';


const isOpen = ref(false);
const deleteOpen = ref(false);
const store = useSearchDefectStore();

const searchField = computed(() => store.searchField);
const searchValue = computed(() => store.searchValue);

const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = ref(25);
const serverOptions = ref<ServerOptions>({
    page: currentPage.value,
    rowsPerPage: itemsPerPage.value,
});

const { items, total: serverItemsLength, fetchDefect } = useDefectService(serverOptions);
const urlImage = 'https://lignis-srv.webhook.uz/images/'

const headers = [
    { text: "Добавил", value: "name" },
    { text: "Артикул", value: "code" },
    { text: "Действие", value: "operation" },
];

let selectedItem = ref(null);


const loading = ref(false);



function openSlideover(item: { id: string, created_by: string, defects: [] }) {
    selectedItem.value = item;
    isOpen.value = true;
}

const loadFromServer = async () => {
    try {
        loading.value = true;
        await fetchDefect();
        console.log('Items after fetching:', items.value); // Debugging line
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadFromServer();
});

watch(serverOptions, (value) => {
    loadFromServer();
}, { deep: true });

const deleteItem = async (id: string) => {
    // const token = localStorage.getItem("token") || "";
    // const { data } = await useFetch(
    //   `${base_url}/product?`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // ).json();
    console.log(id)

};

</script>
<template>
    <EasyDataTable :loading="loading" v-model:server-options="serverOptions" :server-items-length="serverItemsLength"
        :headers="headers" buttons-pagination :items="items"
        :class="[$colorMode.preference === 'dark' ? 'customize-table' : 'customize-light-table']"
        header-text-direction="center" body-text-direction="center" class="mt-10" :search-field="searchField"
        :search-value="searchValue">
        <template #item-name="{ id, defects, created_by }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer"
                @click="openSlideover({ id, defects, created_by })">{{ created_by }}</p>
        </template>
        <template #item-code="{ id, }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer">{{ id }}</p>
        </template>
        <template #item-operation="{ id }" :key="id">
            <div class="operation-wrapper flex gap-1 items-center justify-center">

                <DeleteBtn @click="deleteOpen = true" />
                <UModal v-model="deleteOpen">
                    <Placeholder>
                        <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                        <div class=" flex gap-10 items-center justify-center my-10">
                            <button @click="deleteOpen = false" class="bg-red-400 w-[100px] rounded-lg">Нет</button>
                            <button @click="deleteItem(id)" class="bg-green-400 w-[100px] rounded-lg">Да</button>
                        </div>
                    </Placeholder>
                </UModal>
            </div>
        </template>
    </EasyDataTable>
    <USlideover v-model="isOpen" class="text-black dark:text-white">
            <UCard class="flex flex-col flex-1 max-h-screen overflow-y-auto" :ui="{
                        body: { base: 'flex-1' },
                        ring: '',
                        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
                    }">
                <template #header>
                    <div class="flex justify-end">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            @click="isOpen = false" />
                    </div>
                    <div class="wrapper flex items-center justify-center gap-6">
                        <div class="obs flex flex-col items-center gap-3 p-2">
                            <p class="text-2xl">Бракованные товары</p>
                            <p>#{{ selectedItem?.id }} </p>
                        </div>
                    </div>
                </template>

                <div class="product-details" v-if="selectedItem">
                    <h3 class="text-2xl font-semibold mb-4">Данные о браке</h3>
                    <div class="details-grid grid grid-cols-2 gap-4 mb-6">
                        <p><strong>Работник:</strong> {{ selectedItem.created_by }}</p>
                        <p><strong>Количество товаров:</strong> {{ selectedItem.products }}</p>
                    </div>
                    <h4 class="text-xl font-semibold mb-3">Бракованные товары</h4>
                    <div class="sold-items flex flex-col gap-4">
                        <div :class="[$colorMode.preference === 'dark' ? 'sold-item-dark' : 'sold-item-light']" class="sold-item flex flex-wrap justify-between p-3 border rounded-lg"
                            v-for="item in selectedItem.defects" :key="item.id">
                            <p><strong>Название:</strong> {{ item.name }}</p>
                            <p><strong>Количество:</strong> {{ item.quantity }}</p>
                            <p><strong>Причина:</strong> {{ item.remark }}</p>
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
                                <p class="mt-5 text-center">Вы точно хотите удалить?</p>
                                <div class="flex gap-10 items-center justify-center my-10">
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
</template>
<style scoped>
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

    /* --easy-table-body-row-hover-background-color: #262626; */

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

    /* --easy-table-body-row-hover-background-color: rgb(255, 255, 255); */

    --easy-table-body-row-hover-background-color: rgb(235, 235, 237);
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
.details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.sold-item-light {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.sold-item-dark {
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.sold-item p {
    margin: 0;
    padding: 0;
}
</style>
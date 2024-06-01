<script setup lang="ts">
import { useSearchStore } from '../../../store/searchCatalog.store.ts';
import { useImportService } from './importService';
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { base_url } from '~/api'
import DeleteBtn from '../../../components/layout/DeleteBtn.vue';
import { useToast } from 'vue-toastification'



const isOpen = ref(false);
const deleteOpen = ref(false);
const store = useSearchStore();

const toast = useToast();

const searchField = computed(() => store.searchField);
const searchValue = computed(() => store.searchValue);

const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = ref(25);
const serverOptions = ref<ServerOptions>({
    page: currentPage.value,
    rowsPerPage: itemsPerPage.value,
});

const { items, total: serverItemsLength, fetchImports } = useImportService(serverOptions);

const headers = [
    { text: "Дата", value: "date" },
    { text: "Действие", value: "operation" },
];

let selectedItem = ref(null);


const loading = ref(false);

function openSlideover(acceptance) {
    selectedItem.value = acceptance;
    isOpen.value = true;
}


const loadFromServer = async () => {
    try {
        loading.value = true;
        await fetchImports();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    } finally {
        loading.value = false;
    }
};
const deleteItem = async (id: string) => {
    // console.log
    const token = localStorage.getItem("token") || "";
    const { status } = await useFetch(
        `${base_url}/acceptance?id=${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
    if (status.value === "success") {
        deleteOpen.value = false
        toast.success("Импорт удален")
    }
    if (status.value === "error") {
        deleteOpen.value = false
        toast.error("Ошибка при удалении импорт")
    }

};
const goImport = async (id: string, item: []) => {
    console.log(item)
    localStorage.setItem('import-item', JSON.stringify(item))
    router.push(`/products/imports/${id}`);

}

onMounted(() => {

    loadFromServer()
})

watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });

</script>
<template>
    <EasyDataTable :loading="loading" v-model:server-options="serverOptions" :server-items-length="serverItemsLength"
        :headers="headers" buttons-pagination :items="items"
        :class="[$colorMode.preference === 'dark' ? 'customize-table' : 'customize-light-table']"
        header-text-direction="center" body-text-direction="center" class="mt-10" :search-field="searchField"
        :search-value="searchValue">
        <template #item-operation="{ id, date, products }">
            <div class="operation-wrapper flex gap-1 items-center justify-center">
                <button @click="openSlideover({ id, date, products })"
                    class="flex items-center  bg-blue-500  rounded-2xl px-3 py-3">
                    <Icon name="mdi:eye" class="text-white"/>
                </button>
                <!-- <UModal v-model="deleteOpen" class="text-black dark:text-white ">
                    <Placeholder>
                        <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                        <div class=" flex gap-10 items-center justify-center my-10">
                            <button @click="deleteOpen = false" class="bg-red-400 w-[100px] rounded-lg">Нет</button>
                            <button @click="deleteItem(id)" class="bg-green-400 w-[100px] rounded-lg">Да</button>
                        </div>
                    </Placeholder>
                </UModal> -->
            </div>
        </template>
    </EasyDataTable>
    <USlideover v-model="isOpen" class="text-black dark:text-white ">
        <UCard class="flex flex-col flex-1 w-[1000px]"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <div class="Import" v-if="selectedItem">
                <div class="flex ">


                    <h3 class="text-2xl font-semibold">Данные о импорте продуктов</h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
                </div>
                <div class="flex flex-col gap-5 mt-10">
                    <p>Дата: {{ selectedItem.date }}</p>
                    <p>Код импорта: {{ selectedItem.id }}</p>
                    <p>Количество товаров: {{ selectedItem.products.length }}</p>
                </div>
                <p class="text-2xl font-semibold mt-10">Добавленные товары</p>
                <div class="cards wrapper flex gap-3 mt-10">
                    <button class="btn bg-[#1F78FF] w-[150px] text-white rounded-2xl p-1"
                        @click="goImport(selectedItem.id, selectedItem)">Подбронее об импорте</button>
                        <button @click="deleteOpen = true" class="bg-red-400 w-[150px] text-white rounded-2xl ">Удалить 
                    <Icon name="mdi:delete" />
                    </button> 
                    <UModal v-model="deleteOpen">
                        <Placeholder class="text-black dark:text-white">
                            <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                            <div class=" flex gap-10 items-center justify-center my-10">
                                <button @click="deleteOpen = false" class="bg-red-400 w-[100px] rounded-lg">Нет</button>
                                <button @click="deleteItem(selectedItem.id)"
                                    class="bg-green-400 w-[100px] rounded-lg">Да</button>
                            </div>
                        </Placeholder>
                    </UModal>
                </div>
            </div>

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
</style>
<script setup lang="ts">
import { useSearchStore } from '../../../store/searchCatalog.store.ts';
import { useImportService } from './importService';
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import DeleteBtn from '../../../components/layout/DeleteBtn.vue';
import EditBtn from '../../../components/layout/EditBtn.vue';


const isOpen = ref(false);
const deleteOpen = ref(false);
const store = useSearchStore();

const searchField = computed(() => store.searchField);
const searchValue = computed(() => store.searchValue);

const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const serverOptions = ref<ServerOptions>({
    page: currentPage.value,
    rowsPerPage: itemsPerPage.value,
});

const { items, total: serverItemsLength, fetchImports } = useImportService(serverOptions);

const headers = [
    { text: "Дата", value: "date" },
    { text: "Код импорта", value: "id" },
    { text: "Действие", value: "operation" },
];

let selectedItem = ref(null);


const loading = ref(false);

function openSlideover(acceptance) {
    console.log(acceptance)
    console.log(acceptance.products)
    selectedItem.value = acceptance;
    isOpen.value = true;
}

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
onMounted(() => {

    loadFromServer()
})

watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });

</script>
<template>
    <EasyDataTable :loading="loading" v-model:server-options="serverOptions" :server-items-length="serverItemsLength"
        :headers="headers" buttons-pagination :items="items" table-class-name="customize-table" theme-color="#1d90ff"
        header-text-direction="center" body-text-direction="center" class="mt-10" :search-field="searchField"
        :search-value="searchValue">
        <template #item-operation="{ id, date, products }">
            <div class="operation-wrapper flex gap-1 items-center justify-center">
                <DeleteBtn @click="deleteOpen = true" />
                <button @click="openSlideover({ id, date, products })"
                    class="flex items-center  bg-blue-500  rounded-2xl px-3 py-3">
                    <Icon name="mdi:eye" />
                </button>
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
    <USlideover v-model="isOpen">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="wrapper flex items-center justify-center gap-6">
                    <div class="icon">

                    </div>
                    <div class="name">
                        <p>{{ selectedItem && selectedItem.name }}</p>
                    </div>
                </div>
            </template>

            <div class="Import" v-if="selectedItem">
                <h3 class="text-2xl font-semibold">Данные о импорте продуктов</h3>
                <div class="flex flex-col gap-10 mt-10">
                    <p>Дата: {{ selectedItem.date }}</p>
                    <p>Код импорта: {{ selectedItem.id }}</p>
                    <p>Колличество товаров: {{ selectedItem.products.length }}</p>
                </div>
                <div class="cards wrapper flex flex-col  justify-center gap-3 mt-4">
                    <p class="text-2xl font-semibold">Добавленные товары</p>
                    <div class="card flex gap-2" v-for="item in selectedItem.products">
                        <p>{{item.name}}</p> |
                        <p>{{item.quantity}}</p> |
                        <p>{{item.cost_price}}</p>
                    </div>
                </div>
            </div>
            

            <template #footer>
                <div class="wrapper flex items-center justify-center gap-6">
                    <DeleteBtn @click="deleteOpen = true" />
                    <EditBtn @click="routeEdit(selectedItem.id)" />
                    <UModal v-model="deleteOpen">
                        <Placeholder>
                            <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                            <div class=" flex gap-10 items-center justify-center my-10">
                                <button @click="deleteOpen = false" class="bg-red-400 w-[100px] rounded-lg">Нет</button>
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
</style>
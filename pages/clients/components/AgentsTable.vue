<script lang="ts" setup>
import { useRouter } from 'vue-router';
import DeleteBtn from '../../../components/layout/DeleteBtn.vue';
import EditBtn from '../../../components/layout/EditBtn.vue';
import { useAgentsService } from './agentService';
import { ref, computed, onMounted } from 'vue';
import { useSearchAgentStore } from '../../../store/searchAgentStore.store';
import { useToast } from 'vue-toastification'
import {base_url} from '~/api'


const store = useSearchAgentStore();

const isOpen = ref(false);
const deleteOpen = ref(false);

const loading = ref(false);
const toast = useToast();


const searchField = computed(() => store.searchField);
const searchValue = computed(() => store.searchValue);

const currentPage = ref(1); 
const itemsPerPage = ref(25); 
const serverOptions = ref<ServerOptions>({
    page: currentPage.value,
    rowsPerPage: itemsPerPage.value,
});
const {items, total: serverItemsLength, fetchAgents } = useAgentsService(serverOptions);
const headers = [
    { text: "Имя", value: "fio" },
    { text: "Телефон", value: "phone" },
    { text: "Инстаграм", value: "instagram_username" },
    { text: "Бонусный процент", value: "bonus_percent" },
    { text: "Действие", value: "operation" },

];

let selectedItem = ref(null); 

const deleteItem = async (id: string) => {
    const token = localStorage.getItem("token") || "";
    const { status } = await useFetch(
      `${base_url}/agent?id=${id}`,
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
        loadFromServer()
        toast.success("Агент удален")
    }
    if (status.value === "error") {
        deleteOpen.value = false
        toast.error("Ошибка при удалении импорт")
    }

};

const router = useRouter();

const loadFromServer = async () => {
    try {
        loading.value = true;
        await fetchAgents();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        // Обработка ошибок, если необходимо
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    
    loadFromServer()
})
function openSlideover(agent) {
    console.log(agent)
    selectedItem.value = agent;
    isOpen.value = true;
}

const goToReports = (id) => {

    router.push(`/analytics/${id}`);

}

watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });

</script>

<template>
    <EasyDataTable   :loading="loading"
 v-model:server-options="serverOptions" :server-items-length="serverItemsLength" :headers="headers" buttons-pagination :items="items"  header-text-direction="center" body-text-direction="center" class="mt-10"
    :search-field="searchField"
    :class="[$colorMode.preference === 'dark' ? 'customize-table' : 'customize-light-table']"

        :search-value="searchValue"   
    >
        <template #item-name="{ name }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer" @click="isOpen = true">{{ name }}</p>
        </template>
        <template #item-operation="{ id, fio, phone, instagram_username, bonus_percent }">
            <div class="operation-wrapper flex gap-1 items-center justify-center">
                <button @click="openSlideover({ id,  phone, instagram_username, bonus_percent, fio })"
                    class="flex items-center  bg-blue-500  rounded-2xl px-3 py-3">
                    <Icon name="mdi:eye" />
                </button>
            </div>
        </template>
    </EasyDataTable>
    <USlideover v-model="isOpen" class="text-black dark:text-white">

        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            
            <div class="flex justify-end">


<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"  @click="isOpen = false" />
</div>            <div class="product">
                <h3 class="text-2xl font-semibold">Данные о Агенте</h3>
                <div class="flex flex-col gap-10 mt-10">

                    <p>Имя и фамилия: {{ selectedItem?.fio }}</p>
                    <p>Инстаграм-юзер: {{selectedItem?.instagram_username}}</p>
                    <p>Телефон: {{selectedItem?.phone}}</p>
                    <p>Бонусный процент: {{selectedItem?.bonus_percent}}</p>
                </div>
                <button class="btn bg-[#1F78FF]  rounded-2xl p-3 text-center text-white font-bold w-[150px] mt-10" @click="goToReports(selectedItem?.id)"> 
Отчеты
                </button>
            </div>
            <template #footer>
                <div class="wrapper flex items-center justify-center gap-6">
                    <button @click="deleteOpen = true" class="bg-red-400 w-[100px] rounded-lg">Удалить 
                    <Icon name="mdi:delete" />
                    </button>
                    <UModal v-model="deleteOpen" >
                
                        <Placeholder>

                            <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                            
                           <div class=" flex gap-10 items-center justify-center my-10">
   
   
                               <button  @click="deleteOpen = false" class="bg-red-400 w-[100px] rounded-lg">Нет</button>
                               <button @click="deleteItem(selectedItem?.id)" class="bg-green-400 w-[100px] rounded-lg">Да</button>
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
</style>
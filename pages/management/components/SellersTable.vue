<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import DeleteBtn from '../../../components/layout/DeleteBtn.vue';
import EditBtn from '../../../components/layout/EditBtn.vue';
import {useSellerService} from './sellerService'

const isOpen = ref(false);
const deleteOpen = ref(false);

const {fetchSellers, items} = useSellerService()

const headers = [
    { text: "Имя", value: "fio" },
    { text: "Айди", value: "id" },
    { text: "Роль", value: "role" },
   
];




const router = useRouter();

function routeEdit() {
    router.push('/products/update/id');
}

onMounted(() => {
    fetchSellers()
})
</script>

<template>
    <EasyDataTable :headers="headers" buttons-pagination :items="items" table-class-name="customize-table"
        theme-color="#1d90ff" header-text-direction="center" body-text-direction="center" class="mt-10"
        >
        <template #item-name="{ name }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer" @click="isOpen = true">{{ name }}</p>
        </template>
        <template #item-photo="{ photo }">
            <img v-if="photo" :src="photo" alt="Photo" class="rounded-2xl photo-cell mx-auto">
            <img v-else src="../../../assets/icons/placeholder_img.svg" alt="Photo" class="photo-cell mx-auto">
        </template>
    </EasyDataTable>
    <USlideover v-model="isOpen">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            

            <div class="product">
                <h3 class="text-2xl font-semibold">Данные о сотруднике</h3>
                <div class="flex flex-col gap-10 mt-10">

                    <p>Имя: Илья</p>
                    <p>Login: ilya22</p>
                    <p>Роль: Админ</p>
                </div>
            </div>
            <template #footer>
                <div class="wrapper flex items-center justify-center gap-6">
                    <DeleteBtn @click="deleteOpen = true" />
                    <EditBtn @click="routeEdit" />
                    <UModal v-model="deleteOpen" >
                
                        <Placeholder>

                            <p class="mt-5 text-center"> Вы точно хотите удалить? </p>
                            
                           <div class=" flex gap-10 items-center justify-center my-10">
   
   
                               <button  @click="deleteOpen = false" class="bg-red-400 w-[100px] rounded-lg">Нет</button>
                               <button @click="" class="bg-green-400 w-[100px] rounded-lg">Да</button>
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
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}


</style>
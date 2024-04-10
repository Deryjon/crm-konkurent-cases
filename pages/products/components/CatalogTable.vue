<script lang="ts" setup>
// import { useDealSlideStore } from '~/store/deal-slide.store';
// const store = useDealSlideStore()
import { ref } from 'vue'
import DeleteBtn from '../../../components/layout/DeleteBtn'
import EditBtn from '../../../components/layout/EditBtn'
const isOpen = ref(false)


const headers = [
    { text: "Фото", value: "photo" },
    { text: "Наименование", value: "name" },
    { text: "Артикуль", value: "code" },
    { text: "Цена прихода", value: "pricecome" },
    { text: "Цена продажи", value: "price" },
];
const items = [
    { name: "Кардиган", photo: "", code: "19992881", pricecome: 30000, price: 65000, },
    { name: "Брюки", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/1410201910_6S9zLaUNscE-380x575.jpg", code: "DDD", pricecome: 150, price: 199, },
    { name: "Белье", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/2003202403_photo_2024-03-07_16-42-18-crop-380x575.jpg", code: "DXX", pricecome: 90, price: 2000, },
    { name: "Рубашка", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/0410202207_photo_jjf%D1%962022-10-03_20-26-11-crop-380x575.jpg", code: "SNB", pricecome: 1000, price: 5000, },

];
</script>
<template>
    <EasyDataTable :headers="headers" buttons-pagination :items="items" table-class-name="customize-table"
        theme-color="#1d90ff" header-text-direction="center" body-text-direction="center" class="mt-10">
        <template #item-name="{ name }">
            <p class="mx-auto text-[#4993dd] font-semibold cursor-pointer" @click="isOpen = true">{{ name }}</p>
        </template>
        <template #item-photo="{ photo }">
            <img v-if="photo" :src="photo" alt="Photo" class="rounded-2xl photo-cell mx-auto">
            <img v-if="!photo" src="../../../assets/icons/placeholder_img.svg" alt="Photo" class="photo-cell mx-auto">
        </template>
    </EasyDataTable>
    <USlideover v-model="isOpen">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="wrapper flex items-center justify-center gap-6">
                    <div class="icon">
                        <img v-if="!photo" src="../../../assets/icons/placeholder_img.svg" alt="Photo"
                            class="photo-cell mx-auto">

                    </div>
                    <div class="name">
                        <p>Tanga</p>
                    </div>
                </div>
            </template>
            
            <div class="product">
                <h3 class="text-2xl font-semibold">Данные о продукте</h3>
                <div class="flex flex-col gap-10 mt-10">

                    <p>Наименование: Кардиган</p>
                    <p>Артикул: 9199191828</p>
                    <p>Цена: 25.000sum</p>
                    <p>Колличество: 25</p>
                </div>
            </div>
            <template #footer>
                <div class="wrapper flex items-center justify-center gap-6">
                    <DeleteBtn />
                    <EditBtn />
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

.photo-cell {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>
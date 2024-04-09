<script setup lang="ts">
import { ref } from 'vue';
import Stat from './components/Stat.vue';
import InputSearch from '../../components/layout/InputSearch.vue'
import CreateBtn from './components/CreateBtn.vue';
const open = ref(false);
const toggleOpen = () => {
    open.value = !open.value;
};
const headers = [
    { text: "Фото", value: "photo" },
    { text: "Наименование", value: "name" },
    { text: "Код", value: "code" },
    { text: "Цена прихода", value: "pricecome" },
    { text: "Цена продажи", value: "price" },
];
const items = [
    { name: "Кардиган", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/0911202303_photo_2023-11-05_10-32-29-crop-380x575.jpg", code: "19992881", pricecome: 30000, price: 65000, },
    { name: "Брюки", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/1410201910_6S9zLaUNscE-380x575.jpg", code: "DDD", pricecome: 150, price: 199, },
    { name: "Белье", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/2003202403_photo_2024-03-07_16-42-18-crop-380x575.jpg", code: "DXX", pricecome: 90, price: 2000, },
    { name: "Рубашка", photo: "https://laluna.com.ua/image/cache/catalog/easyphoto/0410202207_photo_jjf%D1%962022-10-03_20-26-11-crop-380x575.jpg", code: "SNB", pricecome: 1000, price: 5000, },
];

</script>

<template>
    <section class="catalog h-[100vh] py-[20px] px-[15px] md:p-[40px]">
        <div class="top flex items-center justify-between">
            <h2 class="text-4xl font-semibold ">Каталог</h2>
            <div class="stats flex items-center justify-between  text-[18px] w-[200px] cursor-pointer"
                @click="toggleOpen">
                <Icon :class="[open ? 'rotate-180' : '']" name="heroicons:chevron-down"
                    class="w-5 h-5 text-muted-foreground" />
                <div v-if="!open">
                    <p class="truncate">Показать статистику</p>
                </div>
                <div v-else>
                    <p class="truncate">Скрыть статистику</p>
                </div>
            </div>
        </div>
        <Stat v-if="open" class="mt-[30px]" />
        <div class="input flex justify-between mt-[50px] ">

            <InputSearch class="" />

            <router-link to="/products/create">

                <CreateBtn />
            </router-link>
        </div>
        <EasyDataTable :headers="headers" buttons-pagination :items="items" table-class-name="customize-table"
            theme-color="#1d90ff" header-text-direction="center" body-text-direction="center" class="mt-10">
            <template #item-photo="{ photo }" >
                <img :src="photo" alt="Photo" class="photo-cell mx-auto" >
            </template>
        </EasyDataTable>

    </section>


</template>
<style scoped>
.customize-table {
    --easy-table-border: 1px solid #262626;
    --easy-table-border-radius: 1000px;
    --easy-table-row-border: 1px solid #ffffff;

    --easy-table-header-font-size: 14px;
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
    --easy-table-body-row-font-size: 14px;


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
    /* Установите желаемую ширину */
    height: 50px;
    /* Установите желаемую высоту */
    object-fit: cover;
    /* Убедитесь, что фотографии корректно масштабируются в ячейках */
    /* border-radius: 50%; */
    /* Округлите углы для круглого изображения */
}
</style>
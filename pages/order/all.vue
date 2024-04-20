<script lang="ts" setup>
import { ref } from 'vue'
import InputSearchSales from '../../components/layout/InputSearchSales.vue'
import InputData from './components/InputData.vue'
import { SALES_DATA } from './components/sales.data'

const numberProduct = ref(1)
const selectedButton = ref('UZS');

const selectButton = (button: string) => {
    selectedButton.value = button;
};
</script>
<template>
    <section class="new-order flex mt-[15px]">
        <div class="left w-[850px] border-r pr-4 mt-[10px]">
            <div class="flex justify-between">
                <h2 class="text-2xl lg:text-4xl font-semibold ">Все продажи</h2>
                <InputData />
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
</style>
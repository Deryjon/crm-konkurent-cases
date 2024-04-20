<script lang="ts" setup>
import { ref } from 'vue'
import InputSearch from '../../components/layout/InputSearch.vue'
import Agents from './components/Agents.vue'
const numberProduct = ref(1)
const selectedButton = ref('UZS');

const selectButton = (button: string) => {
  selectedButton.value = button;
};
</script>
<template>
    <section class="new-order flex ">
        <div class="left w-[850px] border-r pr-4">

            <h2 class="text-2xl lg:text-4xl font-semibold ">Новая продажа</h2>
            <div class="search mt-10">
                <div class="top flex justify-between">

                    <InputSearch class="" />
                    <button class="flex items-center gap-4 bg-[#1F78FF]  rounded-2xl p-5">
                        <Icon name="fontisto:arrow-return-right" />
                        <p>Возврат</p>
                    </button>
                </div>
                <div class="body mt-5">
                    <div class="top flex items-center gap-6">

                        <h3 class="text-xl lg:text-3xl font-semibold
                        ">Корзина</h3>
                        <div class="etc bg-[#404040] p-2 rounded-xl">
                            1
                        </div>
                    </div>
                    <Agents/>
                    <!-- <div class="cart h-[300px] rounded-2xl mt-5 ">
                        <p class="text-center text-lg mt-[130px]">Корзинка пока x`что пуста</p>
                    </div> -->
                    <div class="cards mt-5">
                        <div class="card bg-[#404040] p-4 rounded-2xl flex items-center justify-between">
                            <div class="left flex items-center gap-6">

                                <div class="etc flex items-center gap-2">
                                    <input v-model="numberProduct" type="number"
                                        class="w-[50px] h-[30px] border rounded-lg px-[10px]"> шт
                                </div>
                                <div class="img-product">
                                    <img src="../../assets/icons/placeholder_img.svg" alt="Photo"
                                        class="photo-cell mx-auto">

                                </div>
                                <div class="name-product">
                                    <p>Паяльник</p>
                                    <p>2991918818</p>
                                </div>
                            </div>
                            <div class="right flex items-center gap-6">

                                <div class="price-product flex items-center gap-2 text-[#1F78FF] cursor-pointer">
                                    <p class="text-xl font-semibold">100000 UZS</p>
                                    <Icon name="ic:baseline-edit" size="20" />
                                </div>
                                <button class="delete hover:text-red-500 p-2">
                                    <Icon name="fa:trash" size="20" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="right w-[300px] p-5 h-[630px]">
            <div class="clients mt-6">
                <div class="top flex justify-between font-semibold text-lg ">

                    <p class="">Клиент</p>
                    <button class="create text-[#1F78FF]">
                        Создать
                    </button>
                </div>
                <div class="bg-[#3b3b3b] mt-4 px-2 py-4 rounded-2xl flex gap-3">
                    <Icon name="heroicons:user" class="text-[#1F78FF]" size="24" />
                    <input type="text bg-tr" placeholder="Имя и номер клиента">
                </div>


            </div>
            <div class="sales my-10">


                <p class="">Скидка</p>
                <div class="flex gap-2 mt-4">
                    <div class="bg-[#3b3b3b] w-[130px] px-2 py-4 rounded-2xl">
                        <input type="text" placeholder="Введите скидку" class="w-[120px]" />
                    </div>
                    <div class="flex items-center bg-[#404040] rounded-2xl w-[130px]">
                        <button class="p-1 py-4 w-1/2 rounded-2xl" :class="{ 'border': selectedButton === 'UZS' }"
                            @click="selectButton('UZS')">
                            UZS
                        </button>
                        <button class="p-1 py-4 w-1/2 rounded-2xl" :class="{ 'border': selectedButton === '%' }"
                            @click="selectButton('%')">
                            %
                        </button>
                    </div>
                </div>


            </div>
            <div class="bg-[#404040] rounded-2xl p-5 shadow-2xl mt-24">
                <div class="obs flex items center justify-between text-md p-2">
                    <p>Подитог</p>
                    <p>1 UZS</p>

                </div>
                <div class="discount flex items center justify-between text-md p-2">
                    <p>Скидка</p>
                    <p>100 UZS</p>
                </div>
                <div class="btn bg-[#1F78FF] rounded-2xl p-5 text-center">Оплатить</div>
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
</style>
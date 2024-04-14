<script lang="ts" setup>
import {ref} from 'vue'
import InputSearch from '../../components/layout/InputSearch.vue'

const numberProduct = ref(1)
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
                <div class="body mt-10">
                    <div class="top flex items-center gap-10">

                        <h3 class="text-xl lg:text-3xl font-semibold
                        ">Корзина</h3>
                        <div class="etc bg-[#404040] p-2 rounded-lg">
                            1
                        </div>
                    </div>
                    <div class="sellers mt-5 flex gap-3">
                        <button class="all bg-[#1F78FF] rounded-2xl px-4 py-1">
                            <p class="px-auto">Все продавцы</p>
                        </button>
                        <button class="all bg-[#404040] rounded-2xl px-4 py-1">
                            <Icon name="ic:baseline-plus" />
                        </button>
                    </div>
                    <!-- <div class="cart h-[300px] rounded-2xl mt-10 ">
                        <p class="text-center text-lg mt-[130px]">Корзинка пока x`что пуста</p>
                    </div> -->
                    <div class="cards mt-10">
                        <div class="card bg-[#404040] p-4 rounded-2xl flex items-center justify-between">
                            <div class="left flex items-center gap-6">

                                <div class="etc flex items-center gap-2">
                                    <input v-model="numberProduct" type="number" class="w-[50px] h-[30px] border rounded-lg"> шт
                                </div>
                                <div class="img-product">
                                    <img  src="../../assets/icons/placeholder_img.svg" alt="Photo" class="photo-cell mx-auto">
    
                                </div>
                                <div class="name-product">
                                    <p>Паяльник</p>
                                    <p>2991918818</p>
                                </div>
                            </div>
                            <div class="right flex items-center gap-6">

                                <div class="price-product flex items-center gap-2 text-[#1F78FF] cursor-pointer">
                                    <p class="text-xl font-semibold">100000 UZS</p>
                                    <Icon name="ic:baseline-edit" size="20"/>
                                </div>
                                <button class="delete hover:text-red-500 p-2">
                                    <Icon name="fa:trash" size="20"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="right w-[300px] p-5">
            <div class="clients">

                <p class="">Клиент</p>
            </div>
        </div>
        <!-- будем делать через модалку при нахождение товаров должен открыться модалка и выйти товары при нажатие на них должен добавляться в [] чтобы я мог отправить запрос через [] -->
    </section>
</template>
<style scoped>
.cart {
    border: 1px #ffffff dashed;
}
input {outline:none;}

</style>
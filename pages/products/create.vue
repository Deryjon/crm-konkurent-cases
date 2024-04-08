<script setup lang="ts">
import PriceCreate from './components/priceCreate.vue';
import CreateBtn from './components/CreateBtn.vue';
import { ref } from 'vue';

const imageUrls = ref<string[]>([]);

const removeImage = (index: number) => {
    imageUrls.value.splice(index, 1);
};

const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const files = Array.from(target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    imageUrls.value.push(e.target!.result as string);
                };
                reader.readAsDataURL(file);
            });
        }
    };
    input.click();
};


</script>

<template>
    <section class="create  py-[20px] px-[15px] md:p-[40px]">
        <div class="top flex items-center justify-between">
            <h2 class="text-4xl font-semibold ">Новый продукт</h2>
            <CreateBtn class="mt-10 ml-auto"/>
        </div>
        <div class="basic">
            <div class="name mt-10">
                <label for="">Наименование</label>
                <UiInput placeholder="Введите наименование" />
            </div>
            <div class="flex justify-between mt-10">
                <div class="articul w-1/3">
                    <label for="">Артикул</label>
                    <UiInput placeholder="Введите артикул" />
                </div>
                <div class="barcode w-1/3">
                    <label for="">Баркод</label>
                    <UiInput placeholder="Введите баркод" />
                </div>
            </div>
        </div>
        <div class="photo mt-10">
            <label for="">Фото</label>
            <div>
                <div class="flex flex-wrap gap-10">
                    <div v-for="(imageUrl, index) in imageUrls" :key="index" class="relative w-[200px] h-[200px] mt-10">
                        <img :src="imageUrl" class="w-full h-full" alt="Выбранное изображение">
                        <button class="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                                @click="removeImage(index)">
                            X
                        </button>
                    </div>
                </div>
                <div @click="openFilePicker" class="mt-6 rounded-2xl"
                    style="cursor: pointer; border: 2px dashed #ccc; padding: 20px; text-align: center;">
                    <p>Нажмите сюда, чтобы выбрать фото</p>
                </div>
            </div>
        </div>
        <PriceCreate />
        <div class="barcode w-1/3 mt-10">
            <label for="">Кол-во</label>
            <UiInput  placeholder="0" type="number"  />
        </div>
    </section>
</template>

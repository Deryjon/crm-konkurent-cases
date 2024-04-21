<script setup lang="ts">
import PriceCreate from './components/priceCreate.vue';
import CreateBtn from './components/CreateBtn.vue';
import ExitButton from '../../components/layout/ExitButton.vue';
import { base_url } from '~/api';

const imageUrls = ref<string[]>([]);
const name = ref<string>('');
const article = ref<string>('');
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

const createProduct = async () => {
    const formData = new FormData();
    for (let i = 0; i < imageUrls.value.length; i++) {
        formData.append('photos', imageUrls.value[i]);
    }
    formData.append('name', name.value);
    formData.append('code', article.value);
    const token = localStorage.getItem('token') || '';
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    await useFetch(`${base_url}/product`, {
        method: 'POST',
        body: formData,
        headers,
    });
};



</script>
<template>
    <section class="basic">
        <div class="flex items-center justify-between mt-6">
            <router-link to="/products/catalog">

                <ExitButton />
            </router-link>
            <h2 class="text-4xl font-semibold ml-5">Новый продукт</h2>
            <CreateBtn class="ml-auto" @click="createProduct" />
        </div>
        <div class="basic">
            <div class="flex justify-between mt-10">
                <div class="name w-1/3">
                    <label for="">Наименование</label>
                    <UiInput placeholder="Введите наименование" v-model="name" />
                </div>
                <div class="articul w-1/3">
                    <label for="">Артикул</label>
                    <UiInput placeholder="Введите артикул" v-model="article" />
                </div>
                <!-- <div class="barcode w-1/3 ">
                    <label for="">Кол-во</label>
                    <UiInput placeholder="0" type="number" />
                </div> -->
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
        <!-- <PriceCreate /> -->

    </section>
</template>


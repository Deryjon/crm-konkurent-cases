<script setup lang="ts">
import EditBtn from '../../../components/layout/EditBtn.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ExitButton from '../../../components/layout/ExitButton.vue';
import { base_url } from "~/api";

const imageUrls = ref<string[]>([]);
let item = ref<{ id: string, name: string, code: string, quantity: number, price: number }>({ id: '', name: '', code: '', quantity: 0, price: 0 });

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

const fetchProduct = async () => {
    try {
        const token = localStorage.getItem("token") || "";
        const id = useRoute().params.id;
        const response = await fetch(`${base_url}/product?pattern=${id}&page=1&limit=1`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const data = await response.json();
        if (data && data.products && data.products.length > 0) {
            item.value = data.products[0];
            console.log(item.value);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

onMounted(async () => {
    await fetchProduct();
});
</script>



<template>
    <section class="create h-[100vh]  py-[20px] px-[15px] md:p-[0px]">
        <div class="flex items-center justify-between mt-6">
            <router-link to="/products/catalog">

                <ExitButton />
            </router-link>
            <h2 class="text-4xl font-semibold ml-5">Редактирование продукта</h2>
            <EditBtn class="ml-auto flex gap-2">Изменить</EditBtn>
        </div>
        <div class="basic">
            <div class="flex flex-wrap gap-[30px] justify-between mt-10">
                <div class="name w-1/3">
                    <label for="">Наименование</label>
                    <UiInput placeholder="Введите наименование" v-model="item.name" />
                </div>
                <div class="barcode w-1/3 ">
                    <label for="">Кол-во</label>
                    <UiInput placeholder="0" type="number" v-model="item.quantity" />
                </div>
                <div class="articul w-1/3 ">
                    <label for="">Артикул</label>
                    <UiInput placeholder="Введите артикул"
                    v-model="item.code"
                    />
                </div>
                <div class="articul w-1/3 ">
                    <label for="">Цена</label>
                    <UiInput placeholder="Введите цену"
                    v-model="item.price"
                    />
                </div>
            </div>
        </div>
        <div class="photo mt-10">
            <label for="">Фото</label>
            <div>
                <div class="flex flex-wrap gap-10">
                    <img v-if="item.id" :src="`${base_url}/image/${item.id}`" alt="Photo" class="rounded-2xl w-[100px] h-[100px] mt-4">                        <img v-if="imageUrl" :src="imageUrl" class="w-full h-full" alt="Выбранное изображение">
                    <div v-for="(imageUrl, index) in imageUrls" :key="index" class="relative w-[200px] h-[200px] mt-10">
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
    </section>
</template>

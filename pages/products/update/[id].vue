<script setup lang="ts">
import EditBtn from '../../../components/layout/EditBtn.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ExitButton from '../../../components/layout/ExitButton.vue';
import { base_url } from "~/api";
import { useToast } from 'vue-toastification'


const imageUrls = ref<string[]>([]);
let item = ref<{ id: string, name: string, code: string, quantity: number, price: number }>({ id: '', name: '', code: '', quantity: 0, price: 0 });

const router = useRouter();
const id = useRoute().params.id;

const toast = useToast();

const removeImage = (index: number) => {
    imageUrls.value.splice(index, 1);
};

let file: File | undefined;
const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file = target.files[0];
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                imageUrls.value = []; // Очищаем список изображений перед добавлением нового
                imageUrls.value.push(e.target!.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};



const fetchProduct = async () => {
    try {
        const token = localStorage.getItem("token") || "";
        const response = await fetch(`${base_url}/product?pattern=${id}&page=1&limit=1`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const data = await response.json();
        if (data && data.products && data.products.length > 0) {
            item.value = data.products[0];
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

const editProduct = async () => {
//     if (item.value.price === 0) {
//         toast.error("Цена не может быть равна 0");
//         return;
//    }
    const formData = new FormData();

    formData.append('photo', file);
    formData.append('name', item.value.name);
    formData.append('code', item.value.code);
    formData.append('price', item.value.price);
    const token = localStorage.getItem("token") || "";
    const {status} = await useFetch(`${base_url}/product?id=${id}`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });
    if (status.value === "success") {
        toast.success("Продукт успешно изменен")
        router.push('/products/catalog')
    }

};
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
            <EditBtn class="ml-auto flex gap-2" @click="editProduct">Изменить</EditBtn>
        </div>
        <div class="basic">
            <div class="flex flex-wrap gap-[30px] justify-between mt-10">
                <div class="name w-1/3">
                    <label for="">Наименование</label>
                    <UiInput placeholder="Введите наименование" v-model="item.name" />
                </div>
                <div class="articul w-1/3 ">
                    <label for="">Артикул</label>
                    <UiInput placeholder="Введите артикул" v-model="item.code" />
                </div>
                <div class="articul w-1/3 ">
                    <label for="">Цена</label>
                    <UiInput placeholder="Введите цену" v-model="item.price" />
                </div>
            </div>
        </div>
        <div class="flex gap-20">

            <div class="photo mt-10">
                <label for="">Новое Фото</label>
                <div>
                    <div class="flex flex-wrap gap-10">
                        
                        <div v-for="(imageUrl, index) in imageUrls" :key="index" class="relative w-[200px] h-[200px] mt-10">
                            <img v-if="imageUrl" :src="imageUrl"
                               class="w-full h-full rounded-2xl" alt="Выбранное изображение">
                               <img v-else src="../../../assets/icons/placeholder_img.svg" alt="Photo" class="w-full h-full rounded-2xl">
                            <button class="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                                @click="removeImage(index)">
                                X
                            </button>
                        </div>
                    </div>
                  
                </div>
            </div>
            <div class="photo mt-10">
                <label for="">В настоящее время</label>
                <div>
                    <div class="flex flex-wrap gap-10">
                        <img v-if="item.id" :src="`${base_url}/image/${item.id}`" alt="Photo"
                            class="w-[200px] h-[200px] mt-10 rounded-2xl"> 
                        
                    </div>
                </div>
            </div>
        </div>
        <div @click="openFilePicker" class="mt-6 rounded-2xl"
            style="cursor: pointer; border: 2px dashed #ccc; padding: 20px; text-align: center;">
            <p>Нажмите сюда, чтобы изменить фото</p>
        </div>
    </section>
</template>

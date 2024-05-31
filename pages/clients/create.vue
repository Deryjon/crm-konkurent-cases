<script setup lang="ts">
import CreateBtn from '../../components/layout/CreateBtn.vue'
import ExitButton from '../../components/layout/ExitButton.vue';
import { useRouter } from 'vue-router';
import { base_url } from '~/api';
import { ref } from 'vue'
import { useToast } from 'vue-toastification';
import { computed } from 'vue';

useHead({
  title: "Создать Клиента"
})

const name = ref<string>('');
const address = ref<string>('');
const phone = ref<string>('');
const router = useRouter();
const toast = useToast();

const createClient = async () => {
    if(localStorage.getItem("role") !== "salesman" && localStorage.getItem("role") !== "admin") {
      toast.error('Ошибка при запросе')
      return;
    }

    const phoneRegex = /^\+\d{3}\d{9}$/;
    const isValidPhone = phoneRegex.test(phone.value);

    if (!isValidPhone || !name.value || !address.value) {
        toast.error('Заполните все обязательные поля');
        toast.error("Неверный формат телефона");
        return;
    }

    const body = {
        fio: name.value,
        phone: phone.value,
        address: address.value,
    };
    const token = localStorage.getItem('token') || '';
    const {status} = await useFetch(`${base_url}/customer`, {
        method: 'POST',
        headers:{
    "Authorization": "Bearer " + token,
},
        body: JSON.stringify(body),
    })
    if (status.value === "success") {
        toast.success("Клиент создан")
        router.push('/order/new-order')
    }
    if (status.value === "error") {
        deleteOpen.value = false
        toast.error("Ошибка при создании клиента")
    }
};

const phoneValid = computed(() => {
    const phoneRegex = /^\+\d{3}\d{9}$/;
    return phoneRegex.test(phone.value);
});

</script>
<template>
    <section class="basic">
        <div class="flex items-center justify-between mt-6">
            <router-link to="/clients/all">

                <ExitButton />
            </router-link>
            <h2 class="text-2xl lg:text-4xl font-semibold ml-5">Новый Клиент</h2>
            <CreateBtn class="ml-auto"  @click="createClient">Новый Клиент</CreateBtn>
        </div>
        <div class="basic">
            <div class="flex flex-col lg:flex-row flex-wrap gap-[10px] lg:gap-[30px] justify-between mt-10">
                <div class="name lg:w-1/3">
                    <label for="">Имя</label>
                    <UiInput placeholder="Имя клиента" v-model="name" />
                </div>
                <div class="phone lg:w-1/3">
                    <label for="">Телефон</label>
                    <UiInput placeholder="+998XXXXXXX" v-model="phone" :class="{'border-red-500': !phoneValid}" />
                </div>
                <div class="address lg:w-1/3">
                    <label for="">Адрес</label>
                    <UiInput placeholder="Адрес клиента" v-model="address" />
                </div>

            </div>
        </div>
    </section>
</template>


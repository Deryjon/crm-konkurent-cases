<script setup lang="ts">
import CreateBtn from '../../components/layout/CreateBtn.vue'
import ExitButton from '../../components/layout/ExitButton.vue';
import { useRouter } from 'vue-router';
import { base_url } from '~/api';
import { ref } from 'vue'
import { useToast } from 'vue-toastification';


useHead({
  title: "Создать Клиента"
})

const name = ref<string>('');
const address = ref<string>('');
const phone = ref<string>('');
const router = useRouter();
const toast = useToast();

const createClient = async () => {
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
        router.push('/clients/all')
    }
};

</script>
<template>
    <section class="basic">
        <div class="flex items-center justify-between mt-6">
            <router-link to="/clients/all">

                <ExitButton />
            </router-link>
            <h2 class="text-4xl font-semibold ml-5">Новый Клиент</h2>
            <CreateBtn class="ml-auto" @click="createClient">Новый Клиент</CreateBtn>
        </div>
        <div class="basic">
            <div class="flex flex-wrap gap-[30px] justify-between mt-10">
                <div class="name w-1/3">
                    <label for="">Имя</label>
                    <UiInput placeholder="Имя клиента" v-model="name" />
                </div>
                <div class="phone w-1/3">
                    <label for="">Телефон</label>
                    <UiInput placeholder="Телефон клиента" v-model="phone" />
                </div>
                <div class="address w-1/3">
                    <label for="">Адрес</label>
                    <UiInput placeholder="Адрес клиента" v-model="address" />
                </div>

            </div>
        </div>
    </section>
</template>



<script setup lang="ts">
import CreateBtn from '../../components/layout/CreateBtn.vue'
import ExitButton from '../../components/layout/ExitButton.vue';
import { useRouter } from 'vue-router';
import { base_url } from '~/api';
import { ref } from 'vue'
import { useToast } from 'vue-toastification';

const name = ref<string>('');
const instagram_username = ref<string>('');
const phone = ref<string>('');
const bonus_percent = ref<number>(0);
const router = useRouter();
const toast = useToast();
const createClient = async () => {
    const body = {
        fio: name.value,
        phone: phone.value,
        bonus_percent: bonus_percent.value,
        instagram_username: instagram_username.value,
    };
    const token = localStorage.getItem('token') || '';
   const { status } = await useFetch(`${base_url}/agent`, {
        method: 'POST',
        headers:{
    "Authorization": "Bearer " + token,
},
        body: JSON.stringify(body),
    })
    if (status.value === "success") {
        toast.success("Агент создан")
       router.push('/clients/agents')

      }
};

</script>
<template>
    <section class="basic">
        <div class="flex items-center justify-between mt-6">
            <router-link to="/clients/agents">

                <ExitButton />
            </router-link>
            <h2 class="text-4xl font-semibold ml-5">Новый Агент</h2>
            <CreateBtn class="ml-auto" @click="createClient">Новый Агент</CreateBtn>
        </div>
        <div class="basic">
            <div class="flex flex-wrap gap-[30px] justify-between mt-10">
                <div class="name w-1/3">
                    <label for="">Имя</label>
                    <UiInput placeholder="Имя агента" v-model="name" />
                </div>
                <div class="phone w-1/3">
                    <label for="">Телефон</label>
                    <UiInput placeholder="Телефон агента" v-model="phone" />
                </div>
                <div class="instagram_username w-1/3">
                    <label for="">Инстаграм-юзер</label>
                    <UiInput placeholder="Instagram-юзер" v-model="instagram_username" />
                </div>
                <div class="bonus_percent w-1/3">
                    <label for="">Бонусный процент</label>
                    <UiInput placeholder="Бонус" v-model="bonus_percent" type="number" />
                </div>

            </div>
        </div>
    </section>
</template>



<script setup lang="ts">
import CreateBtn from '../../components/layout/CreateBtn.vue'
import ExitButton from '../../components/layout/ExitButton.vue';
import { useRouter } from 'vue-router';
import { base_url } from '~/api';
import { ref } from 'vue'
import { useToast } from 'vue-toastification';

useHead({
  title: "Создать нового сотрудника"
})

const name = ref<string>('');
const login = ref<string>('');
const role = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const toast = useToast();

const createWorker = async () => {
    const body = {
        fio: name.value,
        login: login.value,
        role: role.value,
        password: password.value,
    };
    const token = localStorage.getItem('token') || '';
   const { status } = await useFetch(`${base_url}/user`, {
        method: 'POST',
        headers:{
    "Authorization": "Bearer " + token,
},
        body: JSON.stringify(body),
    })
        if (status.value === "success") {
        toast.success("Сотрудник создан")
        router.push('/management/employees')
     }
};

</script>
<template>
    <section class="basic">
        <div class="flex items-center justify-between mt-6">
            <router-link to="/management/employees">

                <ExitButton />
            </router-link>
            <h2 class="text-2xl lg:text-4xl font-semibold ml-5">Новый сотрудник</h2>
            <CreateBtn class="ml-auto" @click="createWorker" >Новый сотрудин</CreateBtn>
        </div>
        <div class="basic">
            <div class="flex flex-col lg:flex-row flex-wrap gap-[10px] lg:gap-[30px] justify-between mt-10">
                <div class="name lg:w-1/3">
                    <label for="">Имя</label>
                    <UiInput placeholder="Имя сотрудника" v-model="name" />
                </div>
                <div class="name lg:w-1/3">
                    <label for="">Логин</label>
                    <UiInput placeholder="Логин сотрудника" v-model="login" />
                </div>
                <div class="role lg:w-1/3 ">
                    <label for="">Роль</label>
                    <select placeholder="Роль сотрудника" v-model="role"
                        class="w-full text-[#f5f5f5] py-4 px-3 rounded-2xl mt-5 border bg-[#404040]">
                        <option value="salesman">Продавец</option>
                        <option value="manager">Менеджер</option>
                        <option value="admin">Админ</option>
                    </select>
                </div>
                <div class="role lg:w-1/3">
                    <label for="">Пароль</label>
                    <UiInput placeholder="Пароль сотрудника" v-model="password" />
                </div>

            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';


export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const toast = useToast();
    
    const loginRef = ref(authStore.login);
    const passwordRef = ref(authStore.password);
    
    useHead({
      title: "Вход в систему"
    })
    watch([loginRef, passwordRef], ([login, password]) => {
      isDisabled.value = login.length < 5 || password.length < 8;
    })

    const errorText = ref<string>('');
    let isDisabled = ref(true);

    const loginUser = async () => {
      isDisabled.value = true;
      authStore.login = loginRef.value;
      authStore.password = passwordRef.value;
      await authStore.loginUser();
      errorText.value = authStore.errorText;
      if (authStore.status) {
        toast.success('Вы успешно вошли в систему');
        window.location.reload()
      }

    };

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token || authStore.status) {
        router.push('/');
      }
    })
    return {
      loginRef,
      passwordRef,
      errorText,
      isDisabled,
      loginUser,
      authStore,
    };
  },
});
</script>
<template>
  <section class="lg:h-[100vh]">

    <form class="flex items-center justify-center h-[600px]" @submit.prevent.default="loginUser">
      <div class="rounded bg-sidebar w-[300px] md:w-[400px] p-5">
        <h1 class="text-2xl font-bold text-center mb-5">Вход в систему</h1>
        <UiInput placeholder="Логин" type="text" class="mb-3" v-model="loginRef" />
        <span v-if="loginRef.length < 5" class="text-red-500 text-xs lg:text-sm">Минимальная длина логина - 5 символов</span>
        <UiInput placeholder="Пароль" type="password" class="mb-3" v-model="passwordRef" />
        <span v-if="passwordRef.length < 8" class="text-red-500 text-xs lg:text-sm">Минимальная длина пароля - 8 символов</span>
        <span class="text-red-500 text-xs lg:text-sm">{{ errorText }}</span>
        <div class="flex items-center justify-center gap-5 mt-6">
          <button :disabled="isDisabled" type="submit" class="border p-3 rounded-xl cursor-pointer w-[120px]"
            :class="isDisabled ? 'bg-gray-500' : 'bg-blue-500'" @click="loginUser">Войти</button>
        </div>
      </div>
    </form>
  </section>
</template>

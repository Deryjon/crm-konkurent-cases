<template>
  <form class="flex items-center justify-center min-h-screen w-full" @submit.prevent.default="loginUser">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
            <UiInput placeholder="Login" type="text" class="mb-3" v-model="loginRef" />
            <UiInput placeholder="Password" type="password" class="mb-3" v-model="passwordRef" />
            <div class="flex items-center justify-center gap-5">
                <UiButton type="submit" class="border p-3 rounded-xl" @click="loginUser">Login</UiButton>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'vue-router'; 


export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); 

    const loginRef = ref(authStore.login);
    const passwordRef = ref(authStore.password);

    const loginUser = async () => {
      authStore.login = loginRef.value;
      authStore.password = passwordRef.value;
      await authStore.loginUser();
      if(authStore.status) {
        await router.push('/');
      }
    };

    return {
        loginRef,
        passwordRef,
      loginUser,
    };
  },
});
</script>
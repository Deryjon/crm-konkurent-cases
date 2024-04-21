<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

function logOut(){
  authStore.$reset();
  localStorage.removeItem('token');
  router.push('/login')
}
</script>
<template>
  <aside class="w-[300px] h-[700px]">
    <div class="flex h-[650px] w-full flex-col gap-3 lg:gap-5 overflow-hidden rounded-md bg-card p-[20px]">
      <LayoutLogo @click="$router.push('/')" class="cursor-pointer" />
      <LayoutMenu />
      <div class="mt-auto">
        <LayoutLogout @click="logOut" />
        <LayoutHelp />
      </div>
    </div>
  </aside>
</template>



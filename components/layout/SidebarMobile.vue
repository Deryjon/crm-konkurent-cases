<script setup lang="ts">
import { useAuthStore } from '~/store/auth-store';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

function logOut(){
  authStore.$reset();
  localStorage.removeItem('token');
  window.location.reload();
  router.push('/login')
}
</script>
<template>
  <aside class="w-[290px] h-[700px] bg-white dark:bg-[#404040]">
    <div class="flex h-[650px] w-full flex-col gap-3 lg:gap-5 overflow-hidden rounded-md p-[10px]">
      <LayoutLogoMobile @click="$router.push('/')" class="  lg:hidden" />
      <!-- <LayoutLogo @click="$router.push('/')" class="hidden" /> -->
      <LayoutMenu class="" />
      <div class="mt-auto">
        <LayoutLogout @click="logOut" />
        <!-- <LayoutHelp /> -->
      </div>
    </div>
  </aside>
</template>


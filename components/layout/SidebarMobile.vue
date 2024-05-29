<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function logOut() {
  localStorage.removeItem('token');
  window.location.reload();
  router.push('/login')
}
</script>
<template>
  <aside class="w-[290px] h-[700px] bg-white dark:bg-[#404040]">
    <div class="flex h-[650px] w-full flex-col gap-3 lg:gap-5 rounded-md p-[10px]">
      <LayoutLogoMobile @click="$router.push('/')" class="  lg:hidden" />
      <LayoutMenu class="" />
      <LayoutLogout @click="logOut" class="mt-[30px]" />

    </div>
  </aside>
</template>

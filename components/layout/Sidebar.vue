<script setup lang="ts">
import { ref } from 'vue';

const xBut = ref(false);
function toggleSidebarWidth() {
  xBut.value = !xBut.value;
}
</script>
<template>
  <aside class="w-[300px] h-[700px]">
    <div class="flex h-[650px] w-full flex-col gap-3 lg:gap-5 overflow-hidden rounded-md bg-card p-[20px]">
      <LayoutLogo @click="$router.push('/')" class="cursor-pointera" />
      <LayoutMenu />
      <div class="mt-auto">
        <LayoutLogout />
        <LayoutHelp />
      </div>
    </div>
  </aside>
</template>

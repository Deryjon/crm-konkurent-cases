<script setup lang="ts">
import { ref } from 'vue';

const xBut = ref(false);
function toggleSidebarWidth() {
  xBut.value = !xBut.value;
}
</script>
<template>
   <aside :class="{ 'w-[10px]': xBut }">
    <div class="sticky flex h-[700px] w-full flex-col gap-3 lg:gap-5 overflow-y-auto rounded-md bg-card  scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md p-[20px]">
      <LayoutLogo />
      <LayoutMenu />
      <div class="mt-auto">
        <LayoutLogout />
        <LayoutHelp />
      </div>
    </div>
  </aside>
</template>


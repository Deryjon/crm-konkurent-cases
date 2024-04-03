<template>
  <aside>
    <div
      class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md  bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md p-[20px]">
      <LayoutLogo />
      <LayoutMenu />
      <div class="mt-auto">
        <LayoutLogout />
        <LayoutHelp />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
</script>
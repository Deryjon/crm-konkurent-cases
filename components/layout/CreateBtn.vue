<script lang="ts" setup>
</script>
<template>
    <button class="flex items-center gap-4 bg-[#1F78FF] lg:w-[240px] rounded-2xl p-5">
        <Icon name="fa:plus" color="white" />
        <p class="text-[16px] text-white font-semibold hidden lg:block">
            <slot />
        </p>
    </button> </template>
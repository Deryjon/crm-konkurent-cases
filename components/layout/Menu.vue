<script setup lang="ts">
import { MENU_DATA } from './menu.data';
</script>
<template>
    <div class="flex flex-col gap-[5px]">
      <template v-for="(item, i) in MENU_DATA" :key="i">
        <NuxtLink v-if="!item.items" :to="item.url" class="inline-flex items-center gap-4 px-4 p-3 text-left text-[18px]">
          <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 text-muted-foreground" />
          <p class="truncate">{{ item.name }}</p>
        </NuxtLink>
  
        <HDisclosure v-else v-slot="{ open }" :key="i">
          <HDisclosureButton class="inline-flex  items-center justify-between gap-4 px-4 p-3 text-left text-[18px]">
            <div class="flex items-center gap-4">
              <Icon v-if="item.icon" :name="item.icon" class="w-5 h-5 text-muted-foreground" />
              <p class="truncate">{{ item.name }}</p>
            </div>
            <div class="">
              <Icon :class="[open && 'rotate-180']" v-if="item.icon" name="heroicons:chevron-down" class="w-5 h-5 text-muted-foreground" />
            </div>
          </HDisclosureButton>
          <TransitionExpand>
            <HDisclosurePanel class="mx-6 flex flex-col border-l px-3">
              <template v-for="(subItem, j) in item.items" :key="j">
                <NuxtLink class="rounded-md px-3 py-1.5 text-md hover:bg-muted" :to="subItem.url">
                  {{ subItem.title }}
                </NuxtLink>
              </template>
            </HDisclosurePanel>
          </TransitionExpand>
        </HDisclosure>
      </template>
    </div>
  </template>
    
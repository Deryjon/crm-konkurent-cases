<template>
    <header class=" top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div class="container flex h-16 items-center justify-between">
        <!-- Logo and page title -->
        <div class="flex items-center gap-3">
          <button
            @click="isOpen = true"
            aria-label="Open menu"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden"
          >
            <span class="sr-only">Button used to open menu</span>
            <Icon name="heroicons:bars-2" />
          </button>
          <!-- Logo -->
          <img
            src="https://img.logoipsum.com/296.svg"
            alt="Analytics logo"
            class="h-7 w-7 object-contain"
          />
          <!-- Page title -->
          <NuxtLink class="text-xl font-bold" to="/">Analytics</NuxtLink>
        </div>
  
      </div>
      <!-- Mobile menu -->
      <LayoutMobileMenu v-model="isOpen" />
    </header>
  </template>
  
  <script setup lang="ts">

    const profileMenuOptions = [
      { title: "Profile" },
      { title: "Billing" },
      { title: "Settings" },
      { title: "Team members" },
      { title: "Sales" },
      { divider: true },
      { title: "Logout" },
    ];
  
    // Used to open/close menu
    const isOpen = ref(false);
  </script>
  <template>
    <header class="px-[20px] top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div class="container flex h-16 items-center justify-between">
        <!-- Logo and page title -->
        <button @click="openMenu" aria-label="Open menu" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden">
          <span class="sr-only">Button used to open menu</span>
          <Icon name="heroicons:bars-2" />
        </button>
        <!-- Logo -->
        <div class="img-logo flex">
          <!-- <img src="../../assets/icons/logo-konkurent.svg" alt="Analytics logo" class="h-7 w-7 object-contain" /> -->
          <!-- Page title -->
          <NuxtLink class="text-xl font-bold" to="/">LIGNIS</NuxtLink>
        </div>

      </div>
      <!-- Mobile menu -->
      <LayoutMobileMenu :isOpen="store.isOpen" />
    </header>
  </template>


  <script setup lang="ts">
  import { useMenuStore } from '~/store/menu.store';
  const store = useMenuStore();
  function openMenu(){
    store.isOpen = !store.isOpen
  }
  </script>


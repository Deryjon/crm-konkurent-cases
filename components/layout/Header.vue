  <template>
    <header class="px-[20px] top-0 z-20 border-b bg-white dark:bg-[#404040] backdrop-blur">
      <div class="container flex h-16 items-center justify-between text-black dark:text-white">
        <!-- Logo and page title -->
        <button @click="openMenu" aria-label="Open menu" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden">
          <span class="sr-only">Button used to open menu</span>
          <Icon name="heroicons:bars-2" />
        </button>
        <!-- Logo -->
        <div class="img-logo flex">
          <!-- <img src="../../assets/icons/logo-konkurent.svg" alt="Analytics logo" class="h-7 w-7 object-contain" /> -->
          <!-- Page title -->
          <!-- <NuxtLink class="text-xl font-bold" to="/">LIGNIS</NuxtLink> -->
          <div class="text-black dark:text-white cursor-pointer " >
            <Icon name="heroicons:moon" size="25" v-if="$colorMode.preference === 'light'"  @click="setColorTheme('dark')"/>
        
            <Icon name="heroicons:sun" size="25" v-if="$colorMode.preference === 'dark'"  @click="setColorTheme('light')"/>
        </div>
        </div>

      </div>
      <!-- Mobile menu -->
      <LayoutMobileMenu :isOpen="store.isOpen" />
    </header>
  </template>


  <script setup lang="ts">
  import { useMenuStore } from '~/store/menu.store';
  const selected = ref(false) || localStorage.getItem('colorMode') === 'light'

type Theme = 'light' | 'dark'


const setColorTheme = (newTheme: Theme) => {
    localStorage.setItem('colorMode', newTheme)
    useColorMode().preference = newTheme
}

onMounted(() => {
    if (!selected.value) {
        setColorTheme('light')
    } else {
        setColorTheme('dark')
    }
})
  const store = useMenuStore();
  function openMenu(){
    store.isOpen = !store.isOpen
  }
  </script>


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxt/image",
    "nuxt-headlessui",
    "@morev/vue-transitions/nuxt",
    "shadcn-nuxt",
    "@pinia/nuxt",
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },
  build: {
    transpile: ['vue-toastification'],
  },
  // tailwindcss: {exposeConfig: true},  
  headlessui: { prefix: "H" },
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
});

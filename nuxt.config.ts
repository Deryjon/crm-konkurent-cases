// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  modules: [
    // "@nuxtjs/tailwindcss",
    '@nuxt/ui',
    'nuxt-icon',
    "@nuxt/image",
    'nuxt-headlessui',
    "@morev/vue-transitions/nuxt",
    "shadcn-nuxt",
    "@pinia/nuxt"

  ],
  headlessui: {prefix: "H"},
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
})

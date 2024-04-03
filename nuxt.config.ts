// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    'nuxt-icon',
    "@nuxt/image",
    'nuxt-headlessui',
    "@morev/vue-transitions/nuxt",

  ],
  headlessui: {prefix: "H"},
})

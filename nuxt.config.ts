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
  ],
  // tailwindcss: {exposeConfig: true},  
  headlessui: { prefix: "H" },
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  
});

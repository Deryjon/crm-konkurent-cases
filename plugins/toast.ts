import * as vt from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { defineNuxtPlugin } from '#app';
    
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(vt.default);
  return {
    provide: {
      toast: vt.useToast()
    }
  }
})
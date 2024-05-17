<script setup lang="ts">
import { useSearchSellerStore } from '~/store/searchSeller'
import { ref, watch } from 'vue'

const store = useSearchSellerStore()
const searchValue = ref(store.searchValue ?? '')

watch(searchValue, (newValue) => {
  store.searchValue = newValue
  console.log(newValue)
})
</script>


<template>
  <div class="bg-[#404040] w-[280px] lg:w-[640px] flex items-center gap-4 py-4 px-3 rounded-2xl">
    <Icon name="fluent:search-12-filled" size="22" color=""/>
    <input 
      type="text" 
      class="bg-transparent font-semibold w-[540px]" 
      placeholder="Артикуль, наименование" 
      :value="searchValue" 
      @input="searchValue = $event.target.value" 
    />
  </div>
</template>

<style scoped>
input { outline: none; }
</style>




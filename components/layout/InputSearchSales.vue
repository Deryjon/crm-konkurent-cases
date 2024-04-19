<script setup lang="ts">
import { useSearchStore } from '~/store/searchCatalog.store'
import { ref, watch } from 'vue'

const store = useSearchStore()
const searchValue = ref(store.searchValue)

const handleInput = (event) => {
  store.searchValue = event.target.value
}
</script>

<template>
  <div class="bg-[#404040] w-[280px] lg:w-[640px] flex items-center gap-4 py-4 px-3 rounded-2xl">
    <Icon name="fluent:search-12-filled" size="22" color=""/>
    <input 
      type="text" 
      class="bg-transparent font-semibold w-[540px]" 
      placeholder="Транзакция, ID" 
      @input="handleInput"
      v-model="searchValue"
    />
  </div>
</template>

<style scoped>
input { outline: none; }
</style>

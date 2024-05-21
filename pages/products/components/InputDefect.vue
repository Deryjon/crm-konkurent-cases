<script setup lang="ts">
import { useSearchDefectStore } from '~/store/searchDefect'
import { ref, watch } from 'vue'

const store = useSearchDefectStore()
const searchValue = ref(store.searchValue ?? '')

watch(searchValue, (newValue) => {
  store.searchValue = newValue
})
</script>


<template>
  <div class="bg-input-search">
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




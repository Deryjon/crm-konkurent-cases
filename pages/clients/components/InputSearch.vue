<script setup lang="ts">
import { useSearchAgentStore } from '~/store/searchAgentStore.store'
import { ref, watch } from 'vue'

const store = useSearchAgentStore()
const searchValue = ref(store.searchValue ?? '')

watch(searchValue, (newValue) => {
  store.searchValue = newValue
  console.log(newValue)
})
</script>


<template>
  <div class="bg-input-search">
    <Icon name="fluent:search-12-filled" size="22" color=""/>
    <input 
      type="text" 
      class="bg-transparent font-semibold w-[540px]" 
      placeholder="Имя, телефон" 
      :value="searchValue" 
      @input="searchValue = $event.target.value" 
    />
  </div>
</template>

<style scoped>
input { outline: none; }
</style>




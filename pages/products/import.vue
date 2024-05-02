<script setup lang="ts">
 import CreateBtn from '../../components/layout/CreateBtn.vue'
import ImportTable from './components/ImportTable.vue'
useHead({
  title: "Импорт"
})
</script>
<template >
    <section class="h-[100vh]">
      <h2 class="text-2xl lg:text-4xl font-semibold ">Импорт</h2>
      <div class="input flex justify-between mt-[50px] ">
        <div class="from">
          <p>from</p>
          <input type="date" class="p-5 rounded-2xl bg-[#1F78FF]">
        </div>
        <div class="to">
          <p>to</p>
          <input type="date" class="p-5 rounded-2xl bg-[#1F78FF]">
        </div>

<router-link to="/products/create-import">
    <CreateBtn >Новый импорт</CreateBtn>
</router-link>
</div>
<ImportTable />
    </section>
    
</template> 
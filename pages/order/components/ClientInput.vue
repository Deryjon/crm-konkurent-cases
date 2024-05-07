<script setup lang="ts">
import { ref, computed } from 'vue'

const clientName = ref('');
const customers = ref<{ id: string, fio: string, phone: string, address: string, dropdownOpen: boolean }[]>([]);
const selectedClient = ref<{ id: string, fio: string, phone: string }[]>([]);
const fetchClients = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/customer?pattern=${encodeURIComponent(clientName.value)}&limit=3`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      },
    });
    if (data) {
      console.log(data.value);
      customers.value = data.value.customers;
    }
  };

  watch(clientName, (newName, oldName) => {
    fetchClients();
  })

  const toggleDropdownClient = (index: number) => {
    customers.value[index].dropdownOpen = !customers.value[index].dropdownOpen;
};

const selectClient = (item) => {
    selectedClient.value.push({
        id: item.id,
        fio: item.fio,
        phone: item.phone,
    });
    clientName.value = item.fio;
    toggleDropdownClient(0);
};
</script>
<template>
    <div class="clients mt-3">
                <div class="top flex justify-between font-semibold text-lg ">

                    <p class="">Клиент</p>
                    <router-link to="/products/import">
                        <button class="create text-[#1F78FF]">
                            Создать
                        </button>
                    </router-link>
                </div>
                <div class="bg-[#3b3b3b] mt-4 px-2 py-4 rounded-2xl flex gap-3 search-select">
                    <Icon name="heroicons:user" class="text-[#1F78FF]" size="24" />
                    <input type="text " placeholder="Имя и номер клиента" class="bg-[#404040]" v-model="clientName"
                        @focus="toggleDropdownClient(0)" />
                    <ul class="options-list mt-1 absolute" :class="{ 'open': customers[0].dropdownOpen }">
                        <li v-for="(item, index) in customers" :key="item.id" @click="selectClient(item)"
                            class="cursor-pointer flex justify-between items-center ">
                            <div>{{ item.fio }}</div>
                            <div>
                                <p class="text-sm text-[#1F78FF]">{{ item.phone }}</p>
                            </div>
                        </li>
                    </ul>

                </div>
                </div>

</template>
<style scoped>
input {
    outline: none;
}

.search-select {
    position: relative;
    /* Изменено позиционирование */
    background-color: #404040;
}

.options-list {
    position: absolute;
    /* Изменено позиционирование */
    top: calc(100% + -3px);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
    padding: 0;
    list-style-type: none;
    border-radius: 5px;
    background-color: #404040;
    display: none;
}

.options-list.open {
    display: block;
    z-index: 10;
}

.options-list li {
    padding: 8px;
    cursor: pointer;
}

.options-list li:hover {
    background-color: #878787;
}
</style>
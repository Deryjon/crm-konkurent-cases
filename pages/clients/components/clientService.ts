import { useFetch } from '@vueuse/core';
import { base_url } from '~/api';
import { ref, watch } from 'vue';
import { useSearchClientStore } from '~/store/searchClient'
import { useToast } from 'vue-toastification';


export const useClientsService = (serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, fio: string, phone: string, address: string}[]>([]);
  let total = ref(0);

  const store = useSearchClientStore()
  const searchValue = computed(() => store.searchValue ?? "");

  const fetchClients = async () => {
    if(localStorage.getItem("role") !== "admin" && localStorage.getItem("role") !== "salesman") {
      useToast().error('Ошибка при запросе')
      return;
    } 

    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/customer?pattern=${encodeURIComponent(searchValue.value)}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).json();
    if (data) {
      console.log(data.value);
      items.value = data.value.customers;
      total.value = data.value.total;
    }
  };
  watch(searchValue, () => {
    fetchClients();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };

  return {
    items,
    searchValue,
    fetchClients,
    setSearchValue,
    total,
  };
};

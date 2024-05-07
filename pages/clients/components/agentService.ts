import { useFetch } from '@vueuse/core';
import { base_url } from '~/api';
import { ref, watch } from 'vue';
import { useSearchAgentStore } from '~/store/searchAgentStore.store'


export const useAgentsService = (serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, fio: string, phone: string, instagram_username: string, bonus_percent: number }[]>([]);
  let total = ref(0);

  const store = useSearchAgentStore()
  const searchValue = computed(() => store.searchValue ?? "");

  const fetchAgents = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/agent?pattern=${encodeURIComponent(searchValue.value)}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).json();
    if (data) {
      items.value = data.value.agents;
      total.value = data.value.total;
    }
  };
  watch(searchValue, () => {
    fetchAgents();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };

  return {
    items,
    searchValue,
    fetchAgents,
    setSearchValue,
    total,
  };
};

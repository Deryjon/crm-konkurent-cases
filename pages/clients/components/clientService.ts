import { useFetch } from '@vueuse/core';
import { base_url } from '~/api';
import { ref, watch } from 'vue';

export const useAgentsService = () => {
  let items = ref<{ id: string, fio: string, phone: string, instagram_username: string, bonus_percent: number }[]>([]);
  const fetchAgents = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/customer?pattern`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).json();
    if (data) {
      items.value = data.value;
    }
  };

  return {
    items,
    fetchAgents,
  };
};

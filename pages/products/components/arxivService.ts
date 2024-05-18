import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useSearchArxivStore } from "~/store/searchArxiv.store";

export const useArchiveService = (serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, name: string, code: string, quantity: number, price: number }[]>([]);
  let total = ref(0);

  const store = useSearchArxivStore();
  const searchValue = computed(() => store.searchValue ?? "");

  const fetchArchive = async () => {
    const token = localStorage.getItem("token") || "";
    const { data } = await useFetch(
      `${base_url}/product/archive?pattern=${encodeURIComponent(searchValue.value)}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).json();
    if (data) {
      items.value = data.value.products;
      total.value = data.value.total;
    }
  };

  // Вызываем fetchArchive при каждом изменении searchValue
  watch(searchValue, () => {
    fetchArchive();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };
  return {
    items,
    searchValue,
    fetchArchive,
    setSearchValue,
    total,
  };
};


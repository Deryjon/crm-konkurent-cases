import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useSearchStore } from "~/store/searchCatalog.store";

export const useProductService = (serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, name: string, code: string, quantity: number, price: number }[]>([]);
  let total = ref(0);

  const store = useSearchStore();
  const searchValue = computed(() => store.searchValue ?? "");

  const fetchProducts = async () => {
    const token = localStorage.getItem("token") || "";
    const { data } = await useFetch(
      `${base_url}/product?pattern=${encodeURIComponent(searchValue.value)}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
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

  // Вызываем fetchProducts при каждом изменении searchValue
  watch(searchValue, () => {
    fetchProducts();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };
  return {
    items,
    searchValue,
    fetchProducts,
    setSearchValue,
    total,
  };
};


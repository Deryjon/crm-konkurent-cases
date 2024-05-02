import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useSearchStore } from "~/store/searchCatalog.store";

export const useProductService = (serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, quantity: number, cost_price: number, sale_price: number,}[]>([]);
  let total = ref(0);

  const store = useSearchStore();
  const from = ref(""); // от
  const to = ref(""); // до

  const fetchProducts = async () => {
    const token = localStorage.getItem("token") || "";
    const { data } = await useFetch(
      `${base_url}/acceptance?=from${from.value}&to=${to.value}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
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
  watch(() => store.searchValue, () => {
    fetchProducts();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };
  return {
    items,
    searchValue: store.searchValue,
    fetchProducts,
    setSearchValue,
    total,
  };
};

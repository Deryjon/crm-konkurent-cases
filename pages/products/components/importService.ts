import { Ref, ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useSearchStore } from "~/store/searchCatalog.store";

interface ServerOptions {
  page: number;
  rowsPerPage: number;
}

export const useImportService = (date: Ref<Date[]>, fromDate: Ref<string>, toDate: Ref<string>, serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, quantity: number, cost_price: number, sale_price: number }[]>([]);
  let total = ref(0);

  const store = useSearchStore();

  const fetchImports = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // Check if token exists

    const { data } = await useFetch(
      `${base_url}/acceptance?from=${fromDate.value}&to=${toDate.value}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).json();
    console.log(data);
  };
  watch([() => store.searchValue, serverOptions, fromDate, toDate], () => {
    fetchImports();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };
  return {
    items,
    searchValue: store.searchValue,
    fetchImports,
    setSearchValue,
    total,
  };
};

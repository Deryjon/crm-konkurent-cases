import {  ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useSearchStore } from "~/store/searchCatalog.store";

interface ServerOptions {
  page: number;
  rowsPerPage: number;
}

export const useSaleService = (date: Ref<Date[]>, fromDate: Ref<string>, toDate: Ref<string>, serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, date: string, deleted_by: string, customer_id: string, agent_id: string, products: { id: string, quantity: number, price: number }[], total_uzs: number, total_usd: number, currency_code: string }[]>([]);
  let total = ref(0);

  const store = useSearchStore();

  const fetchArchiveSales = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; 

    const { data } = await useFetch(
      `${base_url}/sale/refund?from=${fromDate.value}&to=${toDate.value}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).json();
    items.value = data.value.refunds;

  };
  watch([() => store.searchValue, serverOptions, fromDate, toDate], () => {
    fetchArchiveSales();
  });

  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };
  return {
    items,
    searchValue: store.searchValue,
    fetchArchiveSales,
    setSearchValue,
    total,
  };
};

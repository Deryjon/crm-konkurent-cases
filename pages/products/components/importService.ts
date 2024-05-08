import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useImport } from "~/store/searchImport";

interface ServerOptions {
  page: number;
  rowsPerPage: number;
}

export const useImportService = (serverOptions = ref<ServerOptions>({page: 1, rowsPerPage: 10})) => {
  let items = ref<{ id: string, date: string, products: { id: string, quantity: number, cost_price: number, sale_price: number }[] }[]>([]);
  let total = ref(0);

  const store = useImport();

  // Создаем переменные ref для хранения значений fromDate и toDate
  const fromDate = ref(store.fromDate);
  const toDate = ref(store.toDate);

  // Отслеживаем изменения значений fromDate и toDate в хранилище
  watch([() => store.fromDate, () => store.toDate], ([newFromDate, newToDate]) => {
    fromDate.value = newFromDate;
    toDate.value = newToDate;
    fetchImports();
  }, );


  const fetchImports = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; 
    const { data } = await useFetch(
      `${base_url}/acceptance?from=${fromDate.value}&to=${toDate.value}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).json();
      items.value = data.value.acceptances;
      total.value = data.value.total;
    }  

  return {
    items,
    fetchImports,
    total,
  };
};

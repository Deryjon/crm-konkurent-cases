import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { useSearchDefectStore } from "~/store/searchDefect";

export const useDefectService = (serverOptions: Ref<ServerOptions>) => {
  let items = ref<{ id: string, defects: { product_id: string, quantity: number, remark: string }[] }[]>([]);
  let total = ref(0);

  const store = useSearchDefectStore();
  const searchValue = computed(() => store.searchValue ?? "");

  const fetchDefect = async () => {
    try {
        const token = localStorage.getItem("token") || "";
        const { data, isFetching, error } = await useFetch(
            `${base_url}/defect?pattern=${encodeURIComponent(searchValue.value)}&page=${serverOptions.value.page}&limit=${serverOptions.value.rowsPerPage}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        ).json();

        if (error.value) {
            console.error('Error fetching data:', error.value);
            return;
        }

        if (data.value) {

            items.value = data.value.defects;
            total.value = data.value.total;
        }
    } catch (error) {
        console.error('Fetch failed:', error);
    }
};


  // Вызываем fetchDefect при каждом изменении searchValue
  watch([searchValue, serverOptions], fetchDefect, { deep: true });


  const setSearchValue = (value: string) => {
    store.searchValue = value;
  };
  return {
    items,
    searchValue,
    fetchDefect,
    setSearchValue,
    total,
  };
};


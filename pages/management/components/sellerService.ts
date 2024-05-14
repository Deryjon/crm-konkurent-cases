import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
// import { useSeller } from "~/store/searchImport";

interface ServerOptions {
  page: number;
  rowsPerPage: number;
}

export const useSellerService = (serverOptions = ref<ServerOptions>({page: 1, rowsPerPage: 10})) => {
  let items = ref<{ id: string, date: string, products: { id: string, quantity: number, cost_price: number, sale_price: number }[] }[]>([]);
  let total = ref(0);



  const fetchSellers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;   
    const { data } = await useFetch(
      `${base_url}/user?&limit=3`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).json();
    
    console.log(data)
    items.value = data.value.users;
    // total.value = data.value.total;
  };
  

  return {
    items,
    fetchSellers,
    total,
  };
};

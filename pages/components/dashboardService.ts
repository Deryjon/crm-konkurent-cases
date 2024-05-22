import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";



export const useDashboardService = () => {
 const items = ref([]);
  let total = ref(0);


  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;   
    const { data } = await useFetch(
      `${base_url}/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data.value.lastYearSales)
    items.value = data.value
    // total.value = data.value.topProducts.reduce((acc, {value}) => acc + value, 0);
    }

  return {
    items,
    fetchDashboard,
    total,
  };
};

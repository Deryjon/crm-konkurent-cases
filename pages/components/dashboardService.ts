import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";

export const useDashboardService = () => {
  const lastWeekData = ref([]);
  const lastYear = ref([]);
  const items = ref([]);
  const labelsData = ref([]);
  let total = ref(0);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const { data } = await useFetch(`${base_url}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).json();
    items.value = data.value;
    lastWeekData.value = data.value.last7daySales;
    lastYear.value = data.value.lastYearSales;
    labelsData.value = lastWeekData.value.map(item => item.label);
  };

  return {
    items,
    fetchDashboard,
    total,
    lastWeekData,
    labelsData,
    lastYear
  };
};

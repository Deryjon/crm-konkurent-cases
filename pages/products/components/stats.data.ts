import {base_url}   from '~/api'   

export interface IMenuItem {
    name: string;
    icon: string;
    unit: string;
    value: string;
  }
  
  const statsProduct = ref({})

  export const fetchStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;   
    const { data } = await useFetch(
      `${base_url}/product/stats`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data.value)
    statsProduct.value = data.value
};

  export const STATS_DATA: IMenuItem[] = [

    {
      name: "Наименований",
      icon: "heroicons:cube",
      unit: "шт",
      value: statsProduct.total_quantity,
    },
    {
      name: "Товарных единиц",
      icon: "heroicons:cube",
      unit: "ед.",
      value: statsProduct.total_products,

    },
    {
      name: "Сумма по цене продажи",
      icon: "ph:money",
      unit: "USD",
      value: statsProduct.total_stock_value,

    },
    {
      name: "Сумма по цене продажи",
      icon: "ph:money",
      unit: "UZS",
      value: statsProduct.total_stock_value,

    },
  
  ];
  
  
  
import { useFetch } from "@vueuse/core";
import { base_url } from "~/api";
import { ref } from "vue";

export const useProductService = () => {
  let items = ref<{ id: string, name: string, code: string, quantity: number, price: number }[]>([]);
  let searchValue = ref(" ");

  const fetchProducts = async () => {
    const token = localStorage.getItem("token") || "";
    const { data } = await useFetch(
      `${base_url}/product?pattern=${searchValue.value}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).json();
    if (data) {
      items.value = data.value;
    }
  };

  const setSearchValue = (value: string) => {
    searchValue.value = value;
    console.log(value);
    fetchProducts();
  };

  return {
    items,
    searchValue,
    fetchProducts,
    setSearchValue,
  };
};


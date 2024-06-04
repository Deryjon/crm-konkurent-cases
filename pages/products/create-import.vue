<script setup lang="ts">
import CreateBtn from '../../components/layout/CreateBtn.vue'
import ExitButton from '../../components/layout/ExitButton.vue';
import { base_url } from '~/api';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'
import { ref, watch } from 'vue'

const products = ref<{ id: string, quantity: number, cost_price: number, sell_price: number, code: string, dropdownOpen: boolean }[]>([
  { id: '', quantity: 0, cost_price: 0, sell_price: 0, code: '', dropdownOpen: true }
]);
const items = ref<{ id: string, name: string, code: string }[]>([]);

const router = useRouter();
const toast = useToast();

const fetchProducts = async (value: string) => {
  const token = localStorage.getItem("token") || "";
  const { data } = await useFetch(
    `${base_url}/product?pattern=${value}&limit=5`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (data && data.value && data.value.products) {
    const products = data.value.products;
    items.value = products.map((product: { id: any; name: any; code: any; }) => ({
      id: product.id,
      name: product.name,
      code: product.code
    }));
  }

};
const addProduct = (count = 1) => {
  for (let i = 0; i < count; i++) {
    products.value.push({ id: '', quantity: 0, cost_price: 0, sell_price: 0, code: '', dropdownOpen: false });
  }
};

const createImport = async () => {
  const body = {
    products: products.value.map(p => ({
      id: p.id,
      quantity: p.quantity,
      cost_price: p.cost_price,
      sell_price: p.sell_price
    }))
  };
  const token = localStorage.getItem('token') || '';
  const { status } = await useFetch(`${base_url}/acceptance`, {
    method: 'POST',
    body,
    headers: {
      "Authorization": "Bearer " + token,
    },
  });
  if (status.value === "success") {
    toast.success("Импорт создан")
    router.push('/products/import')
  }
};

const selectItem = (item, product) => {
  product.id = item.id;
  product.code = item.name; // Сохраняем name выбранного продукта
  product.dropdownOpen = false;
};


watch(() => products.value.map(product => product.code), (newCodes, oldCodes) => {
  // Fetch products when product codes change
  for (const code of newCodes) {
    if (!oldCodes.includes(code)) {
      fetchProducts(code);
    }
  }
});

const closeDropdown = (product: { dropdownOpen: boolean; }) => {
  product.dropdownOpen = false;
};
</script>


<template>
  <section class="basic">
    <div class="flex items-center justify-between mt-6">
      <router-link to="/products/import">
        <ExitButton />
      </router-link>
      <h2 class="text-2xl lg:text-4xl font-semibold ml-5">Новый импорт</h2>
      <CreateBtn class="ml-auto" @click="createImport">Создать</CreateBtn>

    </div>
    <div class="basic mt-10">
      <div class="labels flex gap-3">
        <div class="art w-1/4">
          <label for="">Артикул</label>
        </div>
        <div class="art w-1/4">

          <label for="">Количество</label>
        </div>
        <div class="art w-1/4">

          <label for="">Цена поставки

          </label>
        </div>
        <div class="art w-1/4">

          <label for="">Цена продажи</label>
        </div>
      </div>
      <div v-for="(product, index) in products" :key="index" class="flex justify-between gap-2 mt-5 ">
        <div class="code w-1/4 relative">
          <div class="search-select mt-4 rounded-2xl" >
            <UiInput v-model="product.code" type="text" placeholder="Артикул" @focus="product.dropdownOpen = true"
            />

            <ul class="options-list mt-1 absolute bg-white dark:bg-[#404040]" :class="{ 'open': product.dropdownOpen }">
              <li v-for="item in items" :key="item.id" @click="selectItem(item, product)"  class="cursor-pointer border">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="articul w-1/4">
          <UiInput placeholder="Введите колл-во" type="number" v-model="product.quantity" />
        </div>
        <div class="articul w-1/4">
          <UiInput placeholder="Цена поставки" type="number" v-model.number="product.cost_price" />
        </div>
        <div class="articul w-1/4">
          <UiInput placeholder="Цена продажи" type="number" v-model.number="product.sell_price" />
        </div>
      </div>
      <div class="mt-10 flex justify-end">
        <button @click="addProduct(1)" class="border p-2 rounded-2xl">Добавить товар</button>
      </div>
    </div>
  </section>
</template>


<style scoped>
.search-select {
  position: relative;
  /* Изменено позиционирование */
  background-color: #404040;
}


.options-list {
  position: absolute;
  top: calc(100% + -3px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: hidden;
  margin-top: 4px;
  padding: 0;
  list-style-type: none;
  border-radius: 5px;
  display: none;
}

.options-list.open {
  display: block;
  z-index: 10;
}

.options-list li {
  padding: 8px;
  cursor: pointer;
}

.options-list li:hover {
  background-color: #878787;
}
</style>

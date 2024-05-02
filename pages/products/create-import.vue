<script setup lang="ts">
import CreateBtn from '../../components/layout/CreateBtn.vue'
import ExitButton from '../../components/layout/ExitButton.vue';
import { base_url } from '~/api';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'
import { ref, watch } from 'vue'

const products = ref<{id: string, quantity: number, cost_price: number, sale_price: number}[]>([])
const items = ref<{ id: string, name: string, code: string, quantity: number, price: number }[]>([]);

const addProduct = () => {
  products.value.push({id: '', quantity: 0, cost_price: 0, sale_price: 0});
};

const router = useRouter();
const toast = useToast();

const fetchProducts = async (value) => {
  const token = localStorage.getItem("token") || "";
  const { data } = await useFetch(
    `${base_url}/product?pattern=${value}&limit=3`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (data && data.value && data.value.products) {
    const products = data.value.products;
    items.value = products.map(product => ({
      id: product.id,
      name: product.name
    }));
  }

};

const createImport = async () => {
  const body = {
      products: products.value.map(p => ({
        id: p.id,
        quantity: p.quantity,
        cost_price: p.cost_price,
        sale_price: p.sale_price
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

watch(() => products.value.map(product => product.code), (newCodes, oldCodes) => {
  // Fetch products when product codes change
  for (const code of newCodes) {
    if (!oldCodes.includes(code)) {
      fetchProducts(code);
    }
  }
});

</script>

<template>
  <section class="basic">
    <div class="flex items-center justify-between mt-6">
      <router-link to="/products/import">
        <ExitButton />
      </router-link>
      <h2 class="text-4xl font-semibold ml-5">Новый импорт</h2>
      <CreateBtn class="ml-auto" @click="createImport">Создать</CreateBtn>
    </div>
    <div class="basic">
      <div v-for="(product, index) in products" :key="index" class="flex justify-between gap-2 mt-10">
        <div class="code w-1/4">
          <label for="">Артикул</label>
          <UiInput v-model="product.code" class="" :options="items" placeholder="Введите артикул" />
          <label for="" class="mt-2">Выберите товар</label>
          <select v-model="product.id" class="w-full bg-[#404040] text-[#f5f5f5] py-4 px-3 rounded-2xl mt- border">
            <option v-for="item in items" :value="item.id" :key="item.id">{{ item.name }}</option>
          </select>
        </div>
        <div class="articul w-1/4">
          <label for="">Колл-во</label>
          <UiInput placeholder="Введите колл-во" type="number" v-model="product.quantity" />
        </div>
        <div class="articul w-1/4">
          <label for="">Цена поставки</label>
          <UiInput placeholder="Цена поставки" type="number" v-model.number="product.cost_price" />
        </div>
        <div class="articul w-1/4">
          <label for="">Цена продажи</label>
          <UiInput placeholder="Цена продажи" type="number" v-model.number="product.sale_price" />
        </div>
      </div>
      <div class="mt-10 flex justify-end">
        <button @click="addProduct" class="border p-2 rounded-2xl ">Добавить товар</button>
      </div>
    </div>
  </section>
</template>



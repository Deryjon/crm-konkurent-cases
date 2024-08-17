<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { base_url } from '~/api';
import { useToast } from 'vue-toastification';
import { useFetch } from "@vueuse/core";

useHead({
    title: "Новая продажа"
});

const toast = useToast();
const valyutUsd = ref(0);
const code = ref('');
const items = ref([]);
const dropdownOpen = ref(false);
const selectedProducts = ref(JSON.parse(localStorage.getItem('selectedProducts')) || []);
const products = ref([{ id: '', quantity: 0, cost_price: 0, sale_price: 0, code: '', dropdownOpen: false }]);

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
    ).json();
    items.value = data.value.products.map(product => ({
        id: product.id,
        name: product.name,
        code: product.code,
        price: product.price,
    }));
};

const numberProduct = ref(1);
const selectedButton = ref('USD');
const discountValue = ref(0);

const selectButton = (button) => {
    selectedButton.value = button;
};

watch(discountValue, (newDiscountValue) => {
    if (selectedButton.value === '%') {
        if (newDiscountValue > 100) {
            discountValue.value = 0;
            toast.warning("Скидка не может быть больше 100%");
        }
    }
 
})

watch(discountValue, (newDiscountValue) => {

if (selectedButton.value === 'USD') {
        if (newDiscountValue > subtotal.value || newDiscountValue === '') {
            discountValue.value = 0;
            toast.warning("Скидка не может быть больше суммы продажи");
        }
    }
})

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

watch(code, (newCode) => {
    fetchProducts(newCode);
});

const selectItem = (item) => {
    selectedProducts.value.push({
        id: item.id,
        name: item.name,
        code: item.code,
        price: item.price,
        quantity: 1,
    });
   localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts.value));
    dropdownOpen.value = false;
    code.value = '';
}
const subtotal = computed(() => {
    return selectedProducts.value.reduce((acc, product) => acc + product.price * product.quantity, 0);
});

const discountAmount = computed(() => {
    if (selectedButton.value === 'USD') {
        return discountValue.value;
    } else if (selectedButton.value === '%') {
        return (subtotal.value * discountValue.value) / 100;
    }
    return 0;
});

const formatNumber = (value: number | undefined): string => {
  if (value === undefined) return '';
  return new Intl.NumberFormat('de-DE').format(value);
};

const createOrder = async () => {
    if(selectedProducts.value.length === 0) {
        toast.warning("Добавьте хотя бы один продукт");
        return
    }
    const order = {
        customer_id: selectedClient.value[0]?.id,
        agent_id: selectedAgent.value[0]?.id,
        products: selectedProducts.value.map(product => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price
        })),
        total_uzs: Math.floor((subtotal.value - discountAmount.value) * valyutUsd.value),
        total_usd: subtotal.value - discountAmount.value,
        currency_code: "USD"
    };

    const token = localStorage.getItem('token') || '';
    const body = JSON.stringify(order);

    try {
        const response = await fetch(`${base_url}/sale`, {
            method: 'POST',
            body: body,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            toast.success("Продажа создана");
            selectedProducts.value = [];
            subtotal.value = 0;
            discountValue.value = 0;
            selectedButton.value = 'USD';
            agentName.value = '';
            clientName.value = '';
        localStorage.removeItem('selectedProducts');
        } else {
            toast.error("Ошибка при создании продажи");
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        toast.error("Ошибка при выполнении запроса");
    }
};

const clientName = ref('');
const customers = ref([]);
const selectedClient = ref([]);
const fetchClients = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/customer?pattern=${encodeURIComponent(clientName.value)}&limit=3`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    }).json();
    if (data) {
        customers.value = data.value.customers;
    }
};

watch(clientName, () => {
    fetchClients();
});

const dropdownClientOpen = ref(false);
const toggleDropdownClient = () => {
    dropdownClientOpen.value = !dropdownClientOpen.value;
};

const selectClient = (item) => {
    selectedClient.value.push({
        id: item.id,
        fio: item.fio,
        phone: item.phone,
    });
    clientName.value = item.fio;
    dropdownClientOpen.value = false;
};

const agentName = ref('');
const agents = ref([]);
const selectedAgent = ref([]);
const fetchAgents = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/agent?pattern=${encodeURIComponent(agentName.value)}&limit=3`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    }).json();
    if (data) {
        agents.value = data.value.agents;
    }
};

watch(agentName, () => {
    fetchAgents();
});

const dropdownAgentOpen = ref(false);
const toggleDropdownAgent = () => {
    dropdownAgentOpen.value = !dropdownAgentOpen.value;
};

const selectAgent = (item) => {
    selectedAgent.value.push({
        id: item.id,
        fio: item.fio,
        phone: item.phone,
    });
    agentName.value = item.fio;
    toggleDropdownAgent();
};

const createAgent = () => {
    toast.warning("Обратитесь к директору");
};

const fetchValyuta = async () => {
    try {
        const { data, error } = await useFetch(`https://cbu.uz/ru/arkhiv-kursov-valyut/json/USD/`, {
            method: 'GET',
        }).json();

        if (!error.value && data.value && data.value[0].Rate) {
            valyutUsd.value = data.value[0].Rate;
        } else {
            // Установка fallback значения
            valyutUsd.value = 10800; // например, значение на момент последнего успешного запроса
            toast.warning("Ошибка при получении курса валют. Используется последнее известное значение.");
        }
    } catch (err) {
        valyutUsd.value = 10800; // fallback значение
        toast.error("Не удалось получить курс валют. Проверьте подключение к интернету.");
        console.error("Ошибка при получении курса валют:", err);
    }
};

onMounted(() => {
    fetchValyuta();
});

</script>


<template>
    <!-- <section class="loading" v-if="isLoading">
        <div class="loader">loader</div>
    </section> -->
    <section class="new-order lg:flex ">
        <div class="left lg:w-[400px] xl:w-[800px] lg:border-r lg:pr-4">
            <div class="flex flex-wrap justify-between items-center">

                <h2 class="text-2xl lg:text-4xl font-semibold ">Новая продажа</h2>
                <p class="text-sm lg:text-xl font-semibold">Курс - {{ valyutUsd }} USD</p>
            </div>
            <div class="search mt-5 lg:mt-10">
                <div class="top flex justify-between">
                    <div class="code w-full lg:w-3/4 relative">
                        <div class="relative mt-4 rounded-2xl">
                            <UiInput v-model="code" type="text" placeholder="Наименование, Артикул"
                                @focus="toggleDropdown(0)" />

                            <ul class="options-list bg-white dark:bg-[#404040]  mt-1 absolute "
                                :class="{ 'open': dropdownOpen }">
                                <li v-for="(item, index) in items" :key="item.id" @click="selectItem(item)"
                                    class="cursor-pointer flex justify-between border items-center ">
                                    <div class="">

                                        {{ item.name }}
                                        <p class="text-xs lg:text-sm">{{ item.code }}</p>
                                    </div>
                                    <div class="">
                                        <p class="text-lg text-[#1F78FF]">{{ item.price }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="body mt-5">
                    <div class="top flex items-center gap-6">

                        <h3 class="text-xl lg:text-3xl font-semibold
                        ">Корзина</h3>
                    </div>
                    <Agents />
                    <div class="cards flex flex-col gap-3 mt-5">
                        <div class="card bg-white border-2 dark:bg-[#404040] p-2 lg:p-4 rounded-2xl flex items-center justify-between"
                            v-for="(product, index) in selectedProducts" :key="index">
                            <div class="left flex items-center gap-6">
                                <div class="etc flex items-center gap-2">
                                    <input v-model="product.quantity" type="number"
                                        class="w-[60px] lg:w-[50px] h-[30px] border rounded-lg px-[10px] bg-white border dark:bg-[#404040]">
                                    шт
                                </div>
                                <div class="name-product">
                                    <p>{{ product.name }}</p>
                                    <p>{{ product.code }}</p>
                                </div>
                            </div>
                            <div class="right flex items-center lg:gap-6">
                                <div class="price-product flex items-center  lg:gap-2 text-[#1F78FF] cursor-pointer">
                                    <p class="text-sm lg:text-xl font-semibold">{{ product.price }} USD</p>
                                    <Icon name="ic:baseline-edit" size="20" />
                                </div>
                                <button class="delete hover:text-red-500 p-2"
                                    @click="selectedProducts.splice(index, 1)">
                                    <Icon name="fa:trash" size="20" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="right lg:w-[250px] 2xl:w-[300px] lg:pl-3 ">
            <div class="clients mt-3">
                <div class="top flex justify-between font-semibold text-lg ">

                    <p class="">Клиент</p>
                 <router-link to="/clients/create">
                        <button class="create text-[#1F78FF]">
                            Создать
                        </button>
                    </router-link>
                </div>
                <div class=" bg-white border-2 dark:bg-[#3b3b3b] mt-4 px-2 py-4 rounded-2xl flex gap-3 relative">
                    <Icon name="heroicons:user" class="text-[#1F78FF]" size="24" />
                    <input type="text " placeholder="Имя и номер клиента" class="bg-white dark:bg-[#3b3b3b]"
                        v-model="clientName" @focus="toggleDropdownClient()" />
                    <ul class="options-list bg-white dark:bg-[#404040] mt-1 absolute"
                        :class="{ 'open': dropdownClientOpen }">
                        <li v-for="(item, index) in customers" :key="item.id" @click="selectClient(item)"
                            class="cursor-pointer border flex justify-between items-center ">
                            <div>{{ item.fio }}</div>
                            <div>
                                <p class="text-sm text-[#1F78FF]">{{ item.phone }}</p>
                            </div>
                        </li>
                    </ul>

                </div>


            </div>
            <div class="clients mt-1 lg:mt-3">
                <div class="top flex justify-between font-semibold text-lg ">

                    <p class="">Агент</p>
                    <button class="create text-[#1F78FF]" @click="createAgent()">
                        Создать
                    </button>
                </div>
                <div class="bg-white border-2 dark:bg-[#3b3b3b] mt-4 px-2 py-4 rounded-2xl flex gap-3 relative">
                    <Icon name="heroicons:user" class="text-[#1F78FF]" size="24" />
                    <input type="text " placeholder="Имя и номер агента" class="bg-white dark:bg-[#3b3b3b]"
                        v-model="agentName" @focus="toggleDropdownAgent()" />
                    <ul class="options-list bg-white dark:bg-[#404040] mt-1 absolute"
                        :class="{ 'open': dropdownAgentOpen }">
                        <li v-for="(item, index) in agents" :key="item.id" @click="selectAgent(item)"
                            class="cursor-pointer border flex justify-between items-center ">
                            <div>{{ item.fio }}</div>
                            <div>
                                <p class="text-sm text-[#1F78FF]">{{ item.phone }}</p>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>
            <div class="sales mt-5 lg:my-10">


                <p class="">Скидка</p>
                <div class="flex gap-2 ">

                    <UiInput type="number" placeholder="Введите скидку" class="w-[120px]" v-model="discountValue" />

                    <div
                        class="flex items-center bg-white border    dark:bg-[#404040] rounded-2xl w-[120px] h-[60px] mt-4">
                        <button class=" py-4 w-1/2 rounded-2xl" :class="{ 'border': selectedButton === 'USD' }"
                            @click="selectButton('USD')">
                            USD
                        </button>
                        <button class=" py-4 w-1/2 rounded-2xl" :class="{ 'border': selectedButton === '%' }"
                            @click="selectButton('%')">
                            %
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-white border-2 dark:bg-[#404040] rounded-2xl p-5 shadow-2xl mt-5 lg:mt-24">
                <div class="obs flex flex-wrap items center justify-between text-md p-2">
                    <p>Подитог</p>
                    <p>{{ formatNumber(subtotal - discountAmount) }} USD</p>
                </div>
                <div class="obs flex flex-wrap items center justify-between text-md p-2">
                    <p>Подитог</p>
                    <p>{{ formatNumber((subtotal * valyutUsd - (discountAmount * valyutUsd)).toFixed(2)) }} UZS</p>
                </div>
                <div class="discount flex flex-wrap items center justify-between text-md p-2" v-if="discountAmount !== 0">
                    <p>Скидка</p>
                    <p>{{ formatNumber(subtotal - discountAmount) }} USD</p>
                </div>



                <button class="btn bg-[#1F78FF] flex flex-wrap items-center justify-between rounded-2xl p-5 text-center w-full"
                    @click="createOrder">
                    <p>Оплатить</p>
                    <p>{{ formatNumber(subtotal - discountAmount) }} USD</p>
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
input {
    outline: none;
}

.relative {
    position: relative;
    /* Изменено позиционирование */
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
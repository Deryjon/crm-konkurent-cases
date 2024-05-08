<script setup lang="ts">
import { ref, computed } from 'vue'
import { base_url } from '~/api';
import { useToast } from 'vue-toastification'

useHead({
    title: "Новая продажа"
})

const toast = useToast();


const products = ref<{ id: string, quantity: number, cost_price: number, sale_price: number, code: string, dropdownOpen: boolean }[]>([
    { id: '', quantity: 0, cost_price: 0, sale_price: 0, code: '', dropdownOpen: false }
]);
const code = ref('');
const items = ref<{ id: string, name: string, code: string, price: number }[]>([]);
const selectedProducts = ref<{ name: string, code: string, price: number }[]>([]);
const fetchProducts = async (value: string) => {
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
        items.value = products.map((product: { id: any; name: any; code: any; price: any; }) => ({
            id: product.id,
            name: product.name,
            code: product.code,
            price: product.price,
        }));
    }
};

const numberProduct = ref(1);
const selectedButton = ref('USD');
const discountValue = ref(0); // Значение скидки

const selectButton = (button: string) => {
    selectedButton.value = button;
};

const toggleDropdown = (index: number) => {
    products.value[index].dropdownOpen = !products.value[index].dropdownOpen;
};

watch(code, (newCode, oldCode) => {
    fetchProducts(newCode);
})

const selectItem = (item) => {
    selectedProducts.value.push({
        id: item.id,
        name: item.name,
        code: item.code,
        price: item.price,
        quantity: ref(1)
    });
    code.value = '';
    toggleDropdown(0);
};

const subtotal = computed(() => {
    return selectedProducts.value.reduce((acc, product) => acc + product.price * product.quantity, 0);
});

const discountAmount = computed(() => {
    if (selectedButton.value === 'USD') {
        // Если выбраны USD, то скидка применяется напрямую
        return discountValue.value;
    } else if (selectedButton.value === '%') {
        // Если выбраны проценты, то скидка вычисляется как процент от общей суммы
        return (subtotal.value * discountValue.value) / 100;
    }
});

const createOrder = async () => {
    const order = {
        customer_id: selectedClient.value[0].id,
        agent_id: selectedAgent.value[0].id,
        products: selectedProducts.value.map(product => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price
        })),
        total_USD: subtotal.value - discountAmount.value,
        total_usd: 0,
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
        } else {
            toast.error("Ошибка при создании продажи");
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        toast.error("Ошибка при выполнении запроса");
    }
}

const clientName = ref('');
const customers = ref<{ id: string, fio: string, phone: string, address: string}[]>([]);
const selectedClient = ref<{ id: string, fio: string, phone: string }[]>([]);
const fetchClients = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/customer?pattern=${encodeURIComponent(clientName.value)}&limit=3`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    });
    if (data) {
        console.log(data.value);
        customers.value = data.value.customers;
    }
};

watch(clientName, (newName, oldName) => {
    fetchClients();
})

const dropdownСlientOpen = ref(false);
const toggleDropdownClient = () => {
    dropdownСlientOpen.value = !dropdownСlientOpen.value;
};

const selectClient = (item) => {
    selectedClient.value.push({
        id: item.id,
        fio: item.fio,
        phone: item.phone,
    });
    clientName.value = item.fio;
    toggleDropdownClient();
};

const agentName = ref('');
const agents = ref<{ id: string, fio: string, phone: string, instagram_username: string}[]>([]);
const selectedAgent = ref<{ id: string, fio: string, phone: string }[]>([]);
const fetchAgents = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/agent?pattern=${encodeURIComponent(agentName.value)}&limit=3`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
        },
    });
    if (data) {
        console.log(data.value);
        agents.value = data.value.agents;
    }
};

watch(agentName, (newName, oldName) => {
    fetchAgents();
})


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
    toast.warning("Обратитесь к директору")
}
</script>

<template>
    <section class="new-order flex ">
        <div class="left w-[840px] border-r pr-4">

            <h2 class="text-2xl lg:text-4xl font-semibold ">Новая продажа</h2>
            <div class="search mt-10">
                <div class="top flex justify-between">
                    <div class="code w-3/4 relative">
                        <div class="search-select mt-4 rounded-2xl">
                            <UiInput v-model="code" type="text" placeholder="Наименование, Артикул"
                                @focus="toggleDropdown(0)" />

                            <ul class="options-list  mt-1 absolute" :class="{ 'open': products[0].dropdownOpen }">
                                <li v-for="(item, index) in items" :key="item.id" @click="selectItem(item)"
                                    class="cursor-pointer flex justify-between items-center ">
                                    <div class="">

                                        {{ item.name }}
                                        <p class="text-sm">{{ item.code }}</p>
                                    </div>
                                    <div class="">
                                        <p class="text-lg text-[#1F78FF]">{{ item.price }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- <InputSearch class="" /> -->
                    <button class="flex items-center gap-4 bg-[#1F78FF]  rounded-2xl p-5">
                        <Icon name="fontisto:arrow-return-right" />
                        <p>Возврат</p>
                    </button>
                </div>
                <div class="body mt-5">
                    <div class="top flex items-center gap-6">

                        <h3 class="text-xl lg:text-3xl font-semibold
                        ">Корзина</h3>
                        <div class="etc bg-[#404040] p-2 rounded-xl">
                            {{ selectedProducts.length }}
                        </div>
                    </div>
                    <Agents />
                    <div class="cards flex flex-col gap-3 mt-5">
                        <div class="card bg-[#404040] p-4 rounded-2xl flex items-center justify-between"
                            v-for="(product, index) in selectedProducts" :key="index">
                            <div class="left flex items-center gap-6">
                                <div class="etc flex items-center gap-2">
                                    <input v-model="product.quantity" type="number"
                                        class="w-[50px] h-[30px] border rounded-lg px-[10px] bg-[#404040]"> шт
                                </div>
                                <div class="name-product">
                                    <p>{{ product.name }}</p>
                                    <p>{{ product.code }}</p>
                                </div>
                            </div>
                            <div class="right flex items-center gap-6">
                                <div class="price-product flex items-center gap-2 text-[#1F78FF] cursor-pointer">
                                    <p class="text-xl font-semibold">{{ product.price }} USD</p>
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
        <div class="right w-[300px] pl-3 h-[630px]">
            <div class="clients mt-3">
                <div class="top flex justify-between font-semibold text-lg ">

                    <p class="">Клиент</p>
                    <router-link to="/products/import">
                        <button class="create text-[#1F78FF]">
                            Создать
                        </button>
                    </router-link>
                </div>
                <div class="bg-[#3b3b3b] mt-4 px-2 py-4 rounded-2xl flex gap-3 search-select">
                    <Icon name="heroicons:user" class="text-[#1F78FF]" size="24" />
                    <input type="text " placeholder="Имя и номер клиента" class="bg-[#404040]" v-model="clientName"
                        @focus="toggleDropdownClient()" />
                    <ul class="options-list mt-1 absolute" :class="{ 'open': dropdownСlientOpen }">
                        <li v-for="(item, index) in customers" :key="item.id" @click="selectClient(item)"
                            class="cursor-pointer flex justify-between items-center ">
                            <div>{{ item.fio }}</div>
                            <div>
                                <p class="text-sm text-[#1F78FF]">{{ item.phone }}</p>
                            </div>
                        </li>
                    </ul>

                </div>


            </div>
            <div class="clients mt-3">
                <div class="top flex justify-between font-semibold text-lg ">

                    <p class="">Агент</p>
                    <button class="create text-[#1F78FF]" @click="createAgent()">
                        Создать
                    </button>
                </div>
                <div class="bg-[#3b3b3b] mt-4 px-2 py-4 rounded-2xl flex gap-3 search-select">
                    <Icon name="heroicons:user" class="text-[#1F78FF]" size="24" />
                    <input type="text " placeholder="Имя и номер агента" class="bg-[#404040]" v-model="agentName"
                        @focus="toggleDropdownAgent()" />
                    <ul class="options-list mt-1 absolute" :class="{ 'open': dropdownAgentOpen }">
                        <li v-for="(item, index) in agents" :key="item.id" @click="selectAgent(item)"
                            class="cursor-pointer flex justify-between items-center ">
                            <div>{{ item.fio }}</div>
                            <div>
                                <p class="text-sm text-[#1F78FF]">{{ item.phone }}</p>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>
            <div class="sales my-10">


                <p class="">Скидка</p>
                <div class="flex gap-2 ">

                    <UiInput type="number" placeholder="Введите скидку" class="w-[120px]" v-model="discountValue" />

                    <div class="flex items-center bg-[#404040] rounded-2xl w-[120px] h-[60px] mt-4">
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
            <div class="bg-[#404040] rounded-2xl p-5 shadow-2xl mt-24">
                <div class="obs flex items center justify-between text-md p-2">
                    <p>Подитог</p>
                    <p>{{ subtotal }} USD</p>
                </div>
                <div class="discount flex items center justify-between text-md p-2" v-if="discountAmount !== 0">
                    <p>Скидка</p>
                    <p>{{ (subtotal - discountAmount) }} USD</p>
                </div>



                <button class="btn bg-[#1F78FF] rounded-2xl p-5 text-center w-full"
                    @click="createOrder">Оплатить</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
input {
    outline: none;
}

.search-select {
    position: relative;
    /* Изменено позиционирование */
    background-color: #404040;
}

.options-list {
    position: absolute;
    /* Изменено позиционирование */
    top: calc(100% + -3px);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
    padding: 0;
    list-style-type: none;
    border-radius: 5px;
    background-color: #404040;
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

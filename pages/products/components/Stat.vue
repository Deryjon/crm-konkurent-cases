<script setup lang="ts">
import { ref } from 'vue'
import { base_url } from '~/api'
const statsProduct = ref({})
const valyutaKurs = ref(0)
const fetchStats = async () => {
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
    statsProduct.value = data.value
};
const fetchValyuta = async () => {
    const { data, status } = await useFetch(`https://cbu.uz/ru/arkhiv-kursov-valyut/json/USD/`, {
        method: 'GET'
    });
    if (status.value === "success") {
        valyutaKurs.value = data.value[0].Rate
    }
}
fetchValyuta()
onMounted(() => {
    fetchStats()
});

</script>
<template>
    <section class="stats flex gap-3 flex-wrap justify-between">

        <div class="w-[150px] lg:w-[250px] bg-white border-2 dark:bg-[#353535] rounded-2xl p-1 lg:p-3">
            <Icon name="heroicons:cube" class="h-5 w-5 text-muted-foreground" />
            <p class="text-sm">Наименований</p>
            <div class="flex items-center gap-1">

                <p>{{ statsProduct?.total_products }}</p>
                <p>шт</p>
            </div>
        </div>

        <div class="w-[150px] lg:w-[250px] bg-white border-2 dark:bg-[#353535] rounded-2xl p-1 lg:p-3">
            <Icon name="heroicons:cube" class="h-5 w-5 text-muted-foreground" />
            <p class="text-sm">Товарных единиц</p>
            <div class="flex items-center gap-1">
                <p>{{ statsProduct?.total_quantity }}</p>
                <p>ед.</p>
            </div>
        </div>
        <div class="w-[150px] lg:w-[250px] bg-white border-2 dark:bg-[#353535] rounded-2xl p-1 lg:p-3">
            <Icon name="ph:money" class="h-5 w-5 text-muted-foreground" />
            <p class="text-sm">Сумма по цене продажи</p>
            <div class="flex items-center gap-1">
                <p>{{ statsProduct?.total_stock_value }}</p>
                <p>USD</p>
            </div>
        </div>
        <div class="w-[150px] lg:w-[250px] bg-white border-2 dark:bg-[#353535] rounded-2xl p-1 lg:p-3">
            <Icon name="ph:money" class="h-5 w-5 text-muted-foreground" />
            <p class="text-sm">Сумма по цене продажи</p>
            <div class="flex items-center gap-1">
                <p>{{ Math.round(statsProduct?.total_stock_value * valyutaKurs) }}</p>
                <p>UZS</p>
            </div>
        </div>

    </section>
</template>

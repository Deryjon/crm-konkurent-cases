<script setup lang="ts">
import  {STATS_DATA} from './stats.data'
</script>
<template>
    <section class="stats flex justify-between">

        <div class="w-[250px] bg-[#353535] rounded-2xl p-3" v-for="item in STATS_DATA">
            <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 text-muted-foreground" />
            <p>{{ item.name }}</p>
            <p>{{ item.unit }}</p>
        </div>
    </section>
</template>
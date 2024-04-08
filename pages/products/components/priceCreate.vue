<script lang="ts" setup>
import { ref, computed } from 'vue';
const priceIn = ref(0);
const markup = ref(0);
const sellingPrice = computed(() => priceIn.value * (1 + markup.value / 100));
</script><template>
    <div class="price">
      <div class="flex justify-between mt-10">
        <div class="price w-1/3">
          <label for="">Цена прихода(uzs)</label>
          <UiInput v-model="priceIn" placeholder="0" type="number" />
        </div>
        <div class="price w-1/4">
          <label for="">Наценка(%)</label>
          <UiInput v-model="markup" max="100" placeholder="0" type="number" />
        </div>
        <div class="price w-1/3">
          <label for="">Цена продажи(uzs)</label>
          <UiInput v-model="sellingPrice" placeholder="0" type="number" readonly />
        </div>
      </div>
    </div>
</template>
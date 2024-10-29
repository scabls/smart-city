<template>
  <CommonCard title="武汉三镇人口统计">
    <PieChart v-bind="config" :data class="chart" />
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { PieChart } from '@opd/g2plot-vue'
import { getPopulation } from '@/api/plot'
import { ref, onMounted } from 'vue'

const data = ref([])
const config = ref({
  appendPadding: 10,
  angleField: 'population',
  colorField: 'name',
  radius: 0.9,
  label: {
    labelHeight: 28,
    content: '{name}',
  },
  interactions: [{ type: 'element-active' }],
  height: 270,
  legend: {
    position: 'top',
    itemName: {
      style: {
        fill: '#fff',
      },
    },
  },
})

onMounted(async () => {
  data.value = await getPopulation().then(res => res.area)
})
</script>

<style lang="scss" scoped>
.chart {
  height: 12rem;
  padding: 1rem;
}
</style>

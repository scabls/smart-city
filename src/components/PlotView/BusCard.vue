<template>
  <CommonCard title="武汉各区公交在线表">
    <RoseChart v-bind="config" class="chart" />
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { RoseChart } from '@opd/g2plot-vue'
import { ref, onMounted } from 'vue'
import { getBus } from '@/api/plot'

const config = ref({
  xField: 'name',
  yField: 'bus',
  seriesField: 'name',
  appendPadding: 10,
  radius: 0.9,
  label: {
    offset: -15,
  },
  state: {
    active: {
      style: {
        lineWidth: 0,
        fillOpacity: 0.65,
      },
    },
  },
  interactions: [{ type: 'element-active' }],
})

onMounted(async () => {
  const data = await getBus().then(res => res.area)
  config.value.data = data
})
</script>

<style lang="scss" scoped>
.chart {
  height: 13rem;
  padding: 1rem;
}
</style>

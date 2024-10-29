<template>
  <CommonCard title="武汉各区出行人口统计">
    <div id="travel-chart"></div>
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { onMounted } from 'vue'
import { getTravelPopulation } from '@/api/plot'
import { Chart } from '@antv/g2'

onMounted(async () => {
  const data = await getTravelPopulation().then(res => res.area)
  console.log(data)

  const chart = new Chart({
    container: 'travel-chart',
  })
})
</script>

<style scoped>
#travel-chart {
  width: 100%;
  height: 100%;
}
</style>

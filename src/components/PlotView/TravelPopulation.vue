<template>
  <CommonCard title="武汉各区出行人口统计">
    <ColumnChart v-bind="config" class="chart" />
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { ref, onMounted } from 'vue'
import { getTravelPopulation } from '@/api/plot'
import { ColumnChart } from '@opd/g2plot-vue'

const config = ref({})

const renderChart = data => {
  config.value = {
    data,
    autoFit: true,
    appendPadding: [18, 0, 0, 0],
    xField: 'name',
    yField: 'population',
    seriesField: 'population',
    label: {
      position: 'top',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    maxColumnWidth: 20,
    color: ({ population }) => {
      if (population > 40000) return 'red'
      else if (population > 30000) return 'orange'
      else if (population > 20000) return 'yellow'
      else return 'green'
    },
    legend: false,
    tooltip: {
      field: 'population',
      formatter: datum => {
        return { name: '出行人口', value: datum.population }
      },
    },
  }
}

onMounted(async () => {
  const data = await getTravelPopulation().then(res => res.area)
  renderChart(data)
})
</script>

<style lang="scss" scoped>
.chart {
  height: 13rem;
  padding: 1rem;
}
</style>

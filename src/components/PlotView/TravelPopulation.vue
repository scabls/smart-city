<template>
  <CommonCard title="武汉各区出行人口统计"> </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { ref, onMounted } from 'vue'
import { getTravelPopulation } from '@/api/plot'

const travelPopulation = ref({})

onMounted(async () => {
  const res = await getTravelPopulation()
  travelPopulation.value = res
})
</script>

<style scoped></style>

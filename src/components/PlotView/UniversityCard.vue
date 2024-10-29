<template>
  <CommonCard title="武汉市高校学生统计"> </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import {} from '@opd/g2plot-vue'
import { ref, onMounted } from 'vue'

const config = ref({})

const renderChart = data => {
  config.value = {
    data,
  }
}

onMounted(async () => {})
</script>

<style lang="scss" scoped></style>

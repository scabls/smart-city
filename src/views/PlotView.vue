<template>
  <div class="plot-view">
    <TravelPopulation class="travel-population" />
  </div>
</template>

<script setup>
import TravelPopulation from '@/components/PlotView/TravelPopulation.vue'
</script>

<style lang="scss" scoped>
.plot-view {
  position: relative;
  .travel-population {
    position: absolute;
    top: 5.5rem;
    left: 3rem;
  }
}
</style>

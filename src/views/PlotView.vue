<template>
  <div class="plot-view">
    <TravelPopulation class="travel-population" />
    <BusCard class="bus-card" />
    <PopulationCard class="population-card" />
    <HospitalCard class="hospital-card" />
    <UniversityCard class="university-card" />
  </div>
</template>

<script setup>
import TravelPopulation from '@/components/PlotView/TravelPopulation.vue'
import BusCard from '@/components/PlotView/BusCard.vue'
import PopulationCard from '@/components/PlotView/PopulationCard.vue'
import HospitalCard from '@/components/PlotView/HospitalCard.vue'
import UniversityCard from '@/components/PlotView/UniversityCard.vue'
</script>

<style lang="scss" scoped>
.plot-view {
  position: relative;
  .travel-population {
    position: absolute;
    top: 5.5rem;
    left: 3rem;
  }
  .bus-card {
    position: absolute;
    top: 20rem;
    left: 3rem;
  }
  .population-card {
    position: absolute;
    top: 5.5rem;
    right: 3rem;
  }
  .hospital-card {
    position: absolute;
    top: 16.5rem;
    right: 3rem;
  }
  .university-card {
    position: absolute;
    top: 27.5rem;
    right: 3rem;
  }
}
</style>

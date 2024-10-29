<template>
  <div class="rotate-view"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '@/stores/map'

const { startRotate, stopRotate } = useMapStore()

onMounted(() => {
  startRotate()
})
onUnmounted(() => {
  stopRotate()
})
</script>

<style lang="scss" scoped></style>

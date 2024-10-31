<template>
  <div class="rotate-view"></div>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'

let requestID

const { map, isRotating } = storeToRefs(useMapStore())
const { startRotate, stopRotate } = useMapStore()

const rotateEarth = () => {
  const center = map.value.getCenter()
  // 旋转地球并考虑经度边界(-180, 180)
  center.lng = ((center.lng + 180 + 0.1) % 360) - 180
  map.value.setCenter(center)
  requestID = requestAnimationFrame(rotateEarth)
}

watch(isRotating, () => {
  if (isRotating.value) {
    requestID = requestAnimationFrame(rotateEarth)
  } else {
    cancelAnimationFrame(requestID)
  }
})

onMounted(() => {
  startRotate()
  map.value.flyTo({
    zoom: 1,
    pitch: 0,
  })
})
onUnmounted(() => {
  stopRotate()
  cancelAnimationFrame(requestID)
})
</script>

<style lang="scss" scoped></style>

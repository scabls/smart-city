<template>
  <div class="measure-view"></div>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { DrawLine, DrawCircle, DrawRect, DrawPolygon } from '@antv/l7-draw'

let drawer

const route = useRoute()
const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())

watch(
  () => route.params.type,
  type => {
    if (drawer) {
      drawer.destroy()
      initDrawer(type)
    }
  },
)

const initDrawer = type => {
  switch (type) {
    case 'polyline':
      drawer = new DrawLine(scene.value, { distanceOptions: {} })
      break
    case 'rectangle':
      drawer = new DrawRect(scene.value, {
        distanceOptions: {
          distanceOptions: {},
          areaOptions: {},
          liveUpdate: true,
        },
      })
      break
    case 'polygon':
      drawer = new DrawPolygon(scene.value, {
        distanceOptions: {},
        areaOptions: {},
        liveUpdate: true,
      })
      break
    case 'circle':
      drawer = new DrawCircle(scene.value, {
        distanceOptions: {},
        areaOptions: {},
        liveUpdate: true,
      })
      break
  }
  drawer.enable()
}

onMounted(() => {
  console.log('挂载')
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  initDrawer(route.params.type)
})
onUnmounted(() => {
  drawer.destroy()
})
</script>

<style scoped></style>

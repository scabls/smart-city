<template>
  <div class="measure-view"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { DrawLine, DrawCircle, DrawRect, DrawPolygon } from '@antv/l7-draw'

let drawer

const route = useRoute()
const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())

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
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  initDrawer(route.params.type)
})
onBeforeRouteUpdate(to => {
  if (drawer) drawer.destroy()
  initDrawer(to.params.type)
})
onUnmounted(() => {
  if (drawer) drawer.destroy() //当draw实例存在时销毁实例,防止bug
})
</script>

<style scoped></style>

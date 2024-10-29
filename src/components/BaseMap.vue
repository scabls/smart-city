<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import mapboxgl from 'mapbox-gl'
import { Scene, Mapbox } from '@antv/l7'
import useControl from '@/hooks/useControl'

mapboxgl.accessToken = import.meta.env.VITE_TOKEN

let map, scene, requestID

const { isRotating } = storeToRefs(useMapStore())

const rotateEarth = () => {
  const center = map.getCenter()
  // 旋转地球并考虑经度边界(-180, 180)
  center.lng = ((center.lng + 180 + 0.1) % 360) - 180
  map.setCenter(center)
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
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [114.293, 30.588],
    zoom: 1,
    projection: 'globe',
  })
  scene = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: map,
    }),
    logoVisible: false,
  })
  map.on('load', () => {
    fog()
  })
  map.on('move', () => {
    fog()
  })
  scene.on('loaded', () => {
    useControl(scene, map)
  })
  const fog = () => {
    const center = map.getCenter()
    // 添加雾化效果
    // 将效果跟中心点经度关联起来
    // 使用hsl格式的颜色，明度随中心点经度变化
    map.setFog({
      color: `hsl(0, 0%, ${Math.abs(center.lng) / 360})`,
      'high-color': `hsl(0, 0%, ${Math.abs(center.lng) / 360})`,
    })
  }
})
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  inset: 0;
}
</style>

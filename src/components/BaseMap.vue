<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMapStore } from '@/stores/map'
import mapboxgl from 'mapbox-gl'
import { Scene, Mapbox } from '@antv/l7'
import useControl from '@/hooks/useControl'

mapboxgl.accessToken = import.meta.env.VITE_TOKEN

const { setMap, setScene } = useMapStore()

onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [114.293, 30.588],
    zoom: 1,
    projection: 'globe',
  })
  const scene = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: map,
    }),
    logoVisible: false,
  })
  map.on('style.load', () => {
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
  setMap(map)
  setScene(scene)
})
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  inset: 0;
}
</style>

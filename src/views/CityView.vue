<template>
  <div class="city-view"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { getBuildings, getRoads } from '@/api/city'
import { CityBuildingLayer, LineLayer, LayerSwitch } from '@antv/l7'

const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())

let buildingsLayer, roadsLayer, layerSwitch

const zoom = map.value.getZoom()
const pitch = map.value.getPitch()

onMounted(async () => {
  map.value.flyTo({
    // 武汉
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })

  const buildingsData = await getBuildings()
  const roadsData = await getRoads()

  buildingsLayer = new CityBuildingLayer({ name: '建筑' })
    .source(buildingsData)
    .size('Elevation', h => h)
    .filter('Elevation', h => h >= 20)
    .active(true)
    .animate(true)
    .style({
      opacity: 0.8,
      baseColor: 'rgb(16,16,16)' /*颜色*/,
      windowColor: 'rgb(30,60,89)' /*窗口颜色*/,
      brightColor: 'rgb(255,176,38)' /*亮度颜色*/,
      sweep: {
        enable: true,
        sweepRadius: 10,
        sweepCenter: targetCenter.value,
        sweepColor: '#1990FF' /*扫光颜色*/,
        sweepSpeed: 0.5 /*扫光速度*/,
      },
    })
  roadsLayer = new LineLayer({ name: '道路' })
    .source(roadsData)
    .shape('line')
    .size(1)
    .color('type', type => {
      switch (type) {
        case 'motorway':
          return '#F9D371'
        case 'motorway_link':
          return '#3DB2FF'
        case 'trunk':
          return 'green'
        case 'trunk_link':
          return '#6E85B2'
        case 'primary':
          return '#F47340'
        case 'primary_link':
          return '#F6A9A9'
        case 'secondary':
          return '#EF2F88'
        case 'secondary_link':
          return '#5F7A61'
        case 'tertiary':
          return '#1ee3cf'
        case 'tertiary_link':
          return '#C2F784'
        case 'pedestrian':
          return '#FFF89A'
        case 'residential':
          return 'rgba(22, 119, 255, .5)'
        case 'road':
          return '#93FFD8'
        case 'path':
          return '#BAFFB4'
        case 'unclassified':
          return '#D3DEDC'
        case 'service':
          return '#AEFEFF'
        case 'living_street':
          return '#9B0000'
        case 'track':
          return '#F5F5F5'
        case 'highway':
          return 'red'
        case 'rail':
          return '#08ffc8'
        default:
          return '#FFE3E3'
      }
    })
    .active(true)
    .animate({
      interval: 1, // 间隔
      duration: 1, // 持续时间，延时
      trailLength: 2, // 流线长度
    })
    .style({
      opcity: 0.5,
    })
  scene.value.addLayer(buildingsLayer)
  scene.value.addLayer(roadsLayer)

  layerSwitch = new LayerSwitch({
    layers: [buildingsLayer, roadsLayer],
  })
  scene.value.addControl(layerSwitch)
})

onUnmounted(() => {
  map.value.flyTo({
    zoom,
    pitch,
  })

  scene.value.removeLayer(buildingsLayer)
  scene.value.removeLayer(roadsLayer)

  scene.value.removeControl(layerSwitch)
})
</script>

<style lang="scss" scoped></style>

<template>
  <div class="bridge-view"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { LineLayer, LayerPopup } from '@antv/l7'
import { getBridges } from '@/api/bridge'

const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())

let bridgeLayer, popupLayer

const zoom = map.value.getZoom()
const pitch = map.value.getPitch()

onMounted(async () => {
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  const bridgesData = await getBridges()
  bridgeLayer = new LineLayer({ name: '桥梁' })
    .source(bridgesData)
    .shape('arc3d')
    .size(5)
    .color('name', ['red', 'blue', 'green', 'orange'])
    .animate({
      duration: 4,
      interval: 0.2,
      trailLength: 4,
    })
    .style({
      thetaOffset: 1.5,
    })
    .active(true)
    .select(true)
  scene.value.addLayer(bridgeLayer)
  popupLayer = new LayerPopup({
    items: [
      {
        layer: bridgeLayer,
        title: f => f.name,
        fields: [
          {
            field: 'info',
            formatField: () => '桥梁信息',
          },
        ],
      },
    ],
    trigger: 'click',
  })
  scene.value.addPopup(popupLayer)
})
onUnmounted(() => {
  scene.value.removeLayer(bridgeLayer)
  scene.value.removePopup(popupLayer)
})
</script>

<style scoped></style>

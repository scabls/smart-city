<template>
  <div class="search-view">
    <el-table
      :data="tableData"
      class="table"
      max-height="240"
      v-show="tableData.length"
      @row-dblclick="handleRowClick"
    >
      <el-table-column prop="event_num" label="事故编号" align="center" />
      <el-table-column
        prop="level"
        label="事故等级"
        align="center"
        width="80"
      />
      <el-table-column prop="name" label="事故类型" align="center" />
      <el-table-column prop="car_num" label="车牌编号" />
      <el-table-column prop="area" label="区域" align="center" width="70" />
      <el-table-column prop="phone" label="手机号" align="center" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Control, PointLayer } from '@antv/l7'
import { DrawEvent, DrawRect } from '@antv/l7-draw'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { pointsWithinPolygon } from '@turf/turf'
import { getEvents } from '@/api/search'

const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())

// 点击拉框按钮, 可以绘制矩形, 在矩形中查找范围内数据, 绘制点图层, 并用表格展示数据
const tableData = ref([])
const isDrawing = ref(false)

const layers = []

const zoom = map.value.getZoom()
const pitch = map.value.getPitch()

const draw = new DrawRect(scene.value, {})
const drawControl = new Control()

drawControl.onAdd = () => {
  const container = document.createElement('div')
  container.textContent = '拉框查询'
  container.classList.add('l7-button-control')
  container.addEventListener('click', () => {
    isDrawing.value = !isDrawing.value
    if (isDrawing.value) {
      draw.enable()
    } else {
      draw.clear()
      draw.disable()
      removePreviousLayer()
      tableData.value = []
    }
  })
  return container
}

const removePreviousLayer = () => {
  layers.forEach(layers => scene.value.removeLayer(layers.pointLayer))
  layers.length = 0
}
const handleRowClick = ({ center }) => {
  map.value.flyTo({
    center: center,
    zoom: 18,
    pitch: 0,
  })
  isDrawing.value = false
  draw.clear()
  draw.disable()
}

onMounted(async () => {
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  scene.value.addControl(drawControl)
  const data = await getEvents()
  draw.on(DrawEvent.Add, feature => {
    renderLayer(feature)
  })
  draw.on(DrawEvent.DragEnd, feature => {
    const index = layers.findIndex(layer => layer.id === feature.properties.id)
    scene.value.removeLayer(layers[index].pointLayer)
    layers.splice(index, 1)
    renderLayer(feature)
  })
  const renderLayer = feature => {
    const points = pointsWithinPolygon(data, feature)
    const pointLayer = new PointLayer({ name: `交通事故${Date.now()}` })
      .source(points)
      .shape('circle')
      .animate(true)
      .size(40)
      .color('#ffa842')
      .active(true)
    scene.value.addLayer(pointLayer)
    layers.push({ id: feature.properties.id, pointLayer })
    tableData.value.push(
      ...points.features.map(f => ({
        ...f.properties,
        center: f.geometry.coordinates,
      })),
    )
  }
})
onUnmounted(() => {
  map.value.flyTo({
    zoom,
    pitch,
  })
  scene.value.removeControl(drawControl)
  removePreviousLayer()
  draw.destroy()
})
</script>

<style lang="scss" scoped>
.search-view {
  .table {
    position: fixed;
    left: 20%;
    bottom: 90px;
    width: 60%;
    z-index: 10;
  }
}
</style>

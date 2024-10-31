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
  draw.clear()
  draw.disable()
}

onMounted(async () => {
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  const data = await getEvents() //获取数据, 获取数据之后再执行功能的实现
  scene.value.addControl(drawControl)
  draw.on(DrawEvent.Add, feature => {
    renderLayer(feature) //获取到绘制的图层, 根据绘制图层筛选点数据并渲染
  })
  draw.on(DrawEvent.Edit, feature => {
    clearRecords(feature) //清除之前的绘制范围内的点数据和表格内的记录
    renderLayer(feature) //重新渲染当前绘制筛选出的点图层
  })
  const renderLayer = feature => {
    const drawId = feature.properties.id //获取本次draw的feature的id
    const points = pointsWithinPolygon(data, feature) //根据绘制的矩形范围筛选出数据
    const pointLayer = new PointLayer({ name: `交通事故${Date.now()}` })
      .source(points)
      .shape('circle')
      .animate(true)
      .size(40)
      .color('#ffa842')
      .active(true)
    scene.value.addLayer(pointLayer)
    layers.push({ drawId, pointLayer }) //存储绘制id和筛选出的点图层,方便在拖动draw图层时移除并重新筛选
    points.features
      .map(f => ({
        ...f.properties,
        center: f.geometry.coordinates,
        drawId, //给表格记录的点数据添加drawId属性, 方便在拖动draw图层时更新表格记录的当前范围内的点数据
      }))
      .forEach(item => {
        if (tableData.value.some(d => d.id === item.id)) return
        tableData.value.push(item)
      }) //将筛选出的点数据格式化后添加到表格数据中, 并保证表格数据不重复
  }
  const clearRecords = feature => {
    const drawId = feature.properties.id //获取拖动的draw图层的id
    const index = layers.findIndex(layer => layer.drawId === drawId) //根据绘制id找到之前筛选并渲染的点图层
    if (index === -1) return //如果没有找到对应的点图层, 则直接返回
    scene.value.removeLayer(layers[index].pointLayer) //在scene中移除找到的点图层
    layers.splice(index, 1) //移除点图层在数组中的记录
    tableData.value = tableData.value.filter(d => d.drawId !== drawId) //要保证表格数据只包含绘制范围内的点, 所以移除draw图层上次筛选范围内的表格数据
  }
})
onUnmounted(() => {
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
    background-color: transparent;
    z-index: 10;
    cursor: pointer;
    :deep(.el-table__inner-wrapper) {
      .el-table__header-wrapper {
        tr {
          background-color: transparent;
          .el-table__cell {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          &:hover {
            .el-table__cell {
              background-color: rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>

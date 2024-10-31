import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const map = ref(null)
  const scene = ref(null)
  const isRotating = ref(false)
  const targetCenter = ref([114.3162, 30.5255])
  const targetZoom = ref(14)
  const targetPitch = ref(45)

  const setMap = m => (map.value = m)
  const setScene = s => (scene.value = s)
  const startRotate = () => (isRotating.value = true)
  const stopRotate = () => (isRotating.value = false)

  return {
    map,
    scene,
    isRotating,
    targetCenter,
    targetZoom,
    targetPitch,
    setMap,
    setScene,
    startRotate,
    stopRotate,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}

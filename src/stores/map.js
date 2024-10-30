import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const map = ref(null)
  const scene = ref(null)
  const isRotating = ref(false)

  const setMap = m => (map.value = m)
  const setScene = s => (scene.value = s)
  const startRotate = () => (isRotating.value = true)
  const stopRotate = () => (isRotating.value = false)

  return {
    map,
    scene,
    isRotating,
    setMap,
    setScene,
    startRotate,
    stopRotate,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}

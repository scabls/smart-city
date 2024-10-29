import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const isRotating = ref(false)

  const startRotate = () => (isRotating.value = true)
  const stopRotate = () => (isRotating.value = false)

  return { isRotating, startRotate, stopRotate }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}

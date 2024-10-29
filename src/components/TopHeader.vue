<template>
  <header class="top-header">
    <section class="date-time">
      <div class="date">{{ date }}</div>
      <div class="time">{{ time }}</div>
    </section>
    <section class="title">智慧城市-武汉</section>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const date = ref('')
const time = ref('')
setInterval(() => {
  const now = new Date()
  date.value = `${now.getFullYear()}-${addZero(now.getMonth() + 1)}-${addZero(now.getDate())}`
  time.value = `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(
    now.getSeconds(),
  )}`
}, 1000)
const addZero = num => num.toString().padStart(2, '0')
</script>

<style lang="scss" scoped>
.top-header {
  position: fixed;
  inset: 0;
  aspect-ratio: 1922/105;
  background-image: url('@/assets/images/header.png');
  background-size: contain;
  background-repeat: no-repeat;
  color: white;
  .date-time {
    position: absolute;
    left: 2rem;
    top: 1.8rem;
    display: grid;
    gap: 0.2rem;
  }
  .title {
    padding-top: 1rem;
    text-align: center;
    font-size: 1.5rem;
  }
}
</style>

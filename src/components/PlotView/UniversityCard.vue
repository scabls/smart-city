<template>
  <CommonCard title="武汉市高校学生统计">
    <div class="list">
      <div v-for="item in data" :key="item.title" class="item">
        <p>{{ item.title + item.value + item.quantifier }}</p>
        <img :src="item.src" />
      </div>
    </div>
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { ref } from 'vue'

const data = ref([
  {
    title: '高校',
    value: '130',
    quantifier: '家',
    src: './icons/学校.png',
  },
  {
    title: '在校大学生',
    value: '100',
    quantifier: '万',
    src: './icons/学生.png',
  },
])
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  padding-top: 1.3rem;
  font-size: 0.8rem;
  .item {
    flex: 1;
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 1rem;
    img {
      display: block;
    }
  }
}
</style>

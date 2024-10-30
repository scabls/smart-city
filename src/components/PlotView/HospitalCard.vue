<template>
  <CommonCard title="武汉三甲医院">
    <div class="list">
      <div v-for="item in data" :key="item.title" class="item">
        <p>{{ item.title + item.value + item.quantifier }}</p>
        <img :src="item.src" :width="item.size" :height="item.size" />
      </div>
    </div>
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { ref } from 'vue'

import hospitalIcon from '@/assets/images/icons/医院.png'
import hospitalBedIcon from '@/assets/images/icons/病床.png'
import hospitalDepartmentIcon from '@/assets/images/icons/门诊.png'

const data = ref([
  {
    title: '医院',
    value: '30',
    quantifier: '家',
    src: hospitalIcon,
    size: 65,
  },
  {
    title: '门诊部',
    value: '300',
    quantifier: '个',
    src: hospitalDepartmentIcon,
    size: 40,
  },
  {
    title: '病床',
    value: '3000',
    quantifier: '张',
    src: hospitalBedIcon,
    size: 50,
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
    // align-content: center;
    gap: 1rem;
    img {
      display: block;
    }
  }
}
</style>

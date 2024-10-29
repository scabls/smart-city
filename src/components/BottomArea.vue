<template>
  <footer class="bottom-area">
    <div class="groups">
      <span
        class="item"
        v-for="tab in tabs"
        :key="tab.text"
        @click="handleTabClick(tab.path)"
      >
        <router-link :to="tab.path">
          <i :class="[tabClass(tab.icon), 'icon']"></i>
          <p class="text">{{ tab.text }}</p>
        </router-link>
      </span>
      <span class="item">
        <el-popover placement="top" trigger="hover">
          <template #reference>
            <div>
              <i class="iconfont icon-chizi icon"></i>
              <p class="text">测量距离</p>
            </div>
          </template>
          <template #default>
            <span class="item" v-for="tab in measureTabs" :key="tab.text">
              <router-link :to="`/measure${tab.path}`">
                <i :class="[tabClass(tab.icon), 'icon']"></i>
              </router-link>
            </span>
          </template>
        </el-popover>
      </span>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'

const { isRotating } = storeToRefs(useMapStore())
const { startRotate, stopRotate } = useMapStore()

const tabs = ref([
  {
    icon: 'icon-ditu_diqiu',
    text: '自转',
    path: '/rotate',
  },
  {
    icon: 'icon-kongzhitai',
    text: '控制台',
    path: '/plot',
  },
  {
    icon: 'icon-feiji',
    text: '城市视图',
    path: '/city',
  },
  {
    icon: 'icon-Magnifier',
    text: '查询',
    path: '/search',
  },
  {
    icon: 'icon-qiaoliang',
    text: '桥梁',
    path: '/bridge',
  },
])
const measureTabs = ref([
  {
    icon: 'icon-line',
    path: '/line',
  },
  {
    icon: 'icon-zhexiantu',
    path: '/polyline',
  },
  {
    icon: 'icon-juxing',
    path: '/rectangle',
  },
  {
    icon: 'icon-xingzhuang-tuoyuanxing',
    path: '/circle',
  },
])

const tabClass = computed(() => icon => `iconfont ${icon}`)

const handleTabClick = path => {
  switch (path) {
    case '/rotate':
      if (isRotating.value) {
        stopRotate()
      } else {
        startRotate()
      }
      break
  }
}
</script>

<style lang="scss" scoped>
@import '//at.alicdn.com/t/c/font_4725884_2wuqhpt2bmu.css';
.bottom-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  aspect-ratio: 1920/109;
  background-image: url('@/assets/images/xzd-header.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(180deg);
  .groups {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
    padding-top: 1rem;
    transform: rotate(180deg);
    .item {
      width: 3rem;
      cursor: pointer;
      a,
      :deep(.el-tooltip__trigger) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: white;
        text-decoration: none;
        .icon {
          width: 2rem;
          aspect-ratio: 1;
          background-color: #0f325c;
          align-content: center;
          text-align: center;
          border-radius: 50%;
        }
        .text {
          font-size: 0.7rem;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-popover {
  &.el-popper {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: max-content;
    .item {
      width: 1rem;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>

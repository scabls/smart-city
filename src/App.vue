<template>
  <BaseMap />
  <TopHeader />
  <BottomArea />
  <router-view></router-view>
</template>

<script setup>
import TopHeader from './components/TopHeader.vue'
import BottomArea from './components/BottomArea.vue'
import BaseMap from './components/BaseMap.vue'
</script>

<style lang="scss"></style>

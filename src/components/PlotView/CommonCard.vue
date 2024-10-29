<template>
  <article class="card">
    <header class="card-header">{{ title }}</header>
    <section class="card-body">
      <slot></slot>
    </section>
  </article>
</template>

<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: 18rem;
  min-height: 10rem;
  color: #eee;
  font-weight: 500;
  border-radius: 1rem;
  // overflow: hidden;
  // border: 1px solid #eee;
  .card-header {
    width: 100%;
    aspect-ratio: 480/47;
    background-image: url('@/assets/images/chart-item.png');
    background-size: contain;
    background-repeat: no-repeat;
    text-align: center;
    align-content: center;
  }
  .card-body {
    position: relative;
    min-height: 8rem;
    margin-top: 0.5rem;
    background-image: linear-gradient(
      to right bottom,
      rgba(19, 56, 82, 0.5),
      rgba(26, 35, 64, 0.5)
    );
    border-radius: 1rem;
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 104%;
      background-image: url('@/assets/images/border.png');
      background-position: right bottom;
      background-repeat: no-repeat;
      transform: translateY(-2%);
      pointer-events: none;
    }
    &::before {
      transform: translateY(-2%) rotate(180deg);
    }
  }
}
</style>

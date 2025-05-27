<script setup>
import { ref, onMounted, inject } from 'vue'
import Rocket from '../svgs/Rocket.vue';
const goTop = inject('backToTop')

const isVisible = ref(true)

const backToTop = () => {
  goTop()
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isVisible.value = window.scrollY > 300
  })
})

</script>

<template>
  <div class="back-to-top" v-show="isVisible" @click="backToTop">
    <Rocket />
  </div>
</template>

<style scoped></style>
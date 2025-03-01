<template>
    <div v-loading.fullscreen.lock="isLoading"></div>
</template>

<script setup>
import { ref, inject } from 'vue'

const isLoading = inject('isLoading')
// onMounted(() => {
//     isLoading.value = false
// })
</script>
<template>
    <div v-loading.fullscreen.lock="isLoading">loading</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const isLoading = ref(true)
onMounted(() => {
    isLoading.value = false
})
</script>
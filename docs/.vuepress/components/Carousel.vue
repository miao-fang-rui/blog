<template>
    <el-carousel motion-blur  :height="props.height" indicator-position="outside">
        <el-carousel-item v-for="item in props.pictures" :key="item" :label="item.label">
            <img :alt="item.name" :src="item.src" style="width: 100%; height: 100%; object-fit: contain;"/>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>

const props = defineProps(['height','pictures'])

</script>
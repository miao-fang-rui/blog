<script setup>
import ELImage from './ELImage.vue'
const props = defineProps(['height', 'pictures', 'motionBlur'])

</script>

<template>
    <el-carousel :motion-blur="props.motionBlur"  :height="props.height" indicator-position="outside" class="carousel">
        <el-carousel-item v-for="item in props.pictures" :key="item" :label="item.label">
            <ELImage 
                :src="item.src" 
                :alt="item.name"
                :title="item.name"
                width="100%"
                height="100%"
                previewTeleported
            />
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
.carousel .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
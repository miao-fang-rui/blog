<template>
    <el-carousel motion-blur  :height="props.height" indicator-position="outside">
        <el-carousel-item v-for="item in props.pictures" :key="item" :label="item.label">
            <!-- <img :alt="item.name" :src="item.src" style="width: 100%; height: 100%; object-fit: contain;"/> -->
            <el-image 
                :src="item.src" 
                :alt="item.name"
                :title="item.name"
                fit="contain" 
                style="width: 100%; height: 100%"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="[item.src,]"
                :z-index="100000"
                hide-on-click-modal
                preview-teleported
            >
                <template #error>
                    <div class="image-slot">
                        <el-icon><Picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>

const props = defineProps(['height','pictures'])

</script>
<template>
    <el-carousel motion-blur  :height="props.height" indicator-position="outside">
        <el-carousel-item v-for="item in props.pictures" :key="item" :label="item.label">
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
                    <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: var(--el-fill-color-light);color: var(--el-text-color-secondary);font-size: 14px;">
                        <span>加载失败</span>
                    </div>
                </template>
                <template #placeholder>
                    <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: var(--el-fill-color-light);color: var(--el-text-color-secondary);font-size: 14px;">
                        <el-icon class="is-loading">
                            <Loading />
                        </el-icon>    
                        <span style="margin: 0 4px">加载中</span>
                        <span style="animation: dot 2s infinite steps(3, start);overflow: hidden;">...</span>
                    </div>
                </template>
            </el-image>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>

const props = defineProps(['height','pictures'])

</script>
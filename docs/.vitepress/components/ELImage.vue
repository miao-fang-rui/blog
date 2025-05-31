<script setup>
import { withBase } from 'vitepress';
import { computed } from 'vue';
import { Loading } from '@element-plus/icons-vue';
const props = defineProps({
    type: {
        type: String,
        default: 'default'
    },
    src: {
        type: String,
        required: true
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    },
    alt: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    previewTeleported: {
        type: Boolean,
        default: false
    },
    fit: {
        type: String,
        default: 'contain'
    },
    lazy: {
        type: Boolean,
        default: false
    },
    zIndex: {
        type: Number,
        default: 2000
    }
})

const getErrorStyle = computed(() => {
    const baseStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--el-fill-color-light)',
        color: 'var(--el-text-color-secondary)',
        fontSize: '14px'
    };

    return {
        ...baseStyle,
        width: props.width?? '400px',
        height: props.height?? '400px'
    }
       
});
</script>

<template>
    <el-image
        :src="withBase(src)" 
        :alt="alt ?? title" 
        :title="alt ?? title"
        :fit="fit" 
        :lazy="lazy" 
        :preview-src-list="[withBase(src),]" 
        :z-index="zIndex" 
        :zoom-rate="1.2" 
        :max-scale="7" 
        :min-scale="0.2" 
        hide-on-click-modal 
        :preview-teleported="props.previewTeleported"
        :style="{ 'max-width': width, 'height': height }"
        class="my-el-image"
    >
        <template #placeholder>
            <div
                style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: var(--el-fill-color-light);color: var(--el-text-color-secondary);font-size: 14px;">
                <el-icon class="is-loading">
                    <Loading />
                </el-icon>
                <span style="margin: 0 4px;color:var(--el-text-color-placeholder);">加载中</span>
                <span style="animation: dot 2s infinite steps(3, start); overflow: hidden;">...</span>
            </div>
        </template>
        <template #error>
            <div :style="getErrorStyle">
                <span>加载失败</span>
            </div>
        </template>
    </el-image>
</template>

<style scoped>
.my-el-image {
    max-height: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: block;
}
</style>
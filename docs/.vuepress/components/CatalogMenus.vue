<script setup>
import CatalogIcon from '../icons/CatalogIcon.vue'
import GoBackIcon from '../icons/GoBackIcon.vue'

const catalogIsShow = defineModel('title')

const goBack = () => {
    window.history.back();
}

const { editor } = defineProps({
    editor: {
        type: Object
    }
})

</script>

<template>
    <div class="catalog-buttons">
        <div class="button-item">
            <el-tooltip effect="dark" :content="catalogIsShow ? '关闭目录' : '打开目录'" placement="top">
                <el-button link @click="catalogIsShow = !catalogIsShow">
                    <el-icon size="16">
                        <CatalogIcon />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="返回上级" placement="top">
                <el-button link @click="goBack">
                    <el-icon size="16">
                        <GoBackIcon />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <span class="count">全文：{{ editor.storage.characterCount.characters() }} 字</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.catalog-buttons {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .button-item {
        padding: 6px;
    }

    .count {
        margin-left: 20px;
        font-size: 13px;
    }
}
</style>
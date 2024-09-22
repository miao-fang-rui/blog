<template>
<el-row :gutter="20">
    <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" v-for="p in props.product" class="product">
        <el-card shadow="hover">
            <el-image :src="p.src" fit="contain" style="width: 100%; height: 100px">
                <template #error>
                    <div class="image-slot">
                        <el-icon><Picture /></el-icon>
                    </div>
                </template>
            </el-image>
            <template #footer>
                <router-link :to="p.link" class="product_name">{{ p.name }}</router-link> 
            </template>
        </el-card>
        <div class="tag-container">
            <span class="tag" v-if="p.date">{{ p.date }}</span>
            <span class="tag" v-if="p.stop" :class="{ 'stop-production': p.stop }">{{ p.stop? '已停产': '正常' }}</span>
        </div>
        
    </el-col>
</el-row>
</template>

<script setup>

const props = defineProps(['product'])

</script>

<style lang="scss" scoped>

.el-col{
    margin: 10px 0;
}

.product_name{
    text-decoration: none !important;
    width: 100%;
    text-align: center;
    display: inline-block;
    color: var(--vp-c-text-1);

    &:hover {
        color: var(--vp-c-accent);
        text-decoration: underline !important;
    }
}

[data-theme='dark'] {
    .product_name{
        color: white;
        &:hover {
            color: var(--vp-c-accent);
            text-decoration: underline !important;
        }
    }
}


.product {
    position: relative;
}

.tag-container {
    position: absolute;
    bottom: 65px;
    left: 0;
    width: 100%;

    .tag {
        margin: 0 4px;
        padding: 2px 4px;
        font-size: 12px;
        color: white;
        border-radius: 2px;
        background-color: rgba($color: #3243ff, $alpha: 0.5);

        &:first-child {
            margin-left: 20px;
        }
    }
}

.stop-production {
    background-color: rgba($color: #ff0000, $alpha: 0.5) !important;
}

.product .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--vp-c-bg);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.product .image-slot .el-icon {
  font-size: 30px;
}

</style>
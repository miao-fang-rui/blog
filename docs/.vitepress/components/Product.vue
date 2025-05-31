<script setup>
import { withBase } from 'vitepress'
import ELImage from './ELImage.vue';
const { products } = defineProps({
    products: {
        type: Array,
        required: true
    }
})

</script>

<template>

<el-row :gutter="20">
    <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="(product, index) in products" :key="index">
        <el-card shadow="never">
            <!-- <el-image 
                :src="withBase(product.src)" 
                fit="contain" 
                :zoom-rate="1.2" 
                :max-scale="7" 
                :min-scale="0.2" 
                hide-on-click-modal 
                :preview-src-list="[withBase(product.src),]"
                :style='{width:"100%", height:"100px"}'
            /> -->
            <ELImage 
                :src="product.src" 
                :alt="product.name"
                :width="'100%'"
                :height="'100px'"
            />
            <template #footer>
                <a :href="withBase(product.link)" class="card-footer">{{ product.name }}</a> 
            </template>
        </el-card>
    </el-col>
</el-row>

</template>

<style scoped>
.el-col {
    margin: 10px 0;
}

.card-footer {
    text-align: center;
    color: var(--vp-c-text-1);
    text-decoration: none;
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 14px;
}

.card-footer:hover {
    color: var(--vp-c-brand);
    text-decoration: underline;
}
</style>
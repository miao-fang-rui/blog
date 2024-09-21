<template>
<el-row :gutter="20">
    <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="p in props.product">
        <el-card shadow="hover">
            <img :src="p.src" class="image" />
            <template #footer>
                <router-link :to="p.link" class="product_name">{{ p.name }}</router-link> 
            </template>
        </el-card>
    </el-col>
</el-row>
</template>

<script setup>

const props = defineProps(['product'])

</script>

<style lang="scss" scoped>
.image {
    width: 100%;
    height: 100px;
    object-fit: contain;
}

.el-col{
    margin: 10px 0;
}

.product_name{
    text-decoration: none !important;
    width: 100%;
    text-align: center;
    display: inline-block;
    color: var(--vp-c-text);

    &:hover {
        color: var(--vp-c-accent);
        text-decoration: underline !important;
    }
}
</style>
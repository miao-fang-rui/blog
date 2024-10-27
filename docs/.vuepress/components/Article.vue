<script setup>
const { articles } = defineProps(['articles'])

</script>

<template>
    <div class="article-container">
        <a :href="article.link" class="link" v-for="(article, index) in articles" :key="article.link">
            <span class="node">{{ index + 1 }}</span>
            <span>{{ `${article.name}` }}</span>
        </a>
    </div>

</template>

<style lang="scss" scoped>
.article-container {
    padding: 20px 0;

    .node {
        background-color: var(--vp-c-accent);
        color: white;
        padding: 0px 7px;
        border-radius: 2px;
        margin-right: 10px;
    }

    .link {
        text-decoration: none;
        color: var(--vp-c-text);
        padding: 10px;
        display: block;
        margin: 0px 20px;

        &:hover {
            color: var(--vp-c-accent);
            cursor: pointer;
            // box-shadow: var(--el-box-shadow-lighter);
        }

    }
}
</style>
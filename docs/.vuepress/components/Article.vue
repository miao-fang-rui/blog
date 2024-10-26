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
        // background-color: var(--vp-c-accent);
        background-color: lightcoral;
        color: white;
        padding: 0px 7px;
        border-radius: 2px;
        margin-right: 10px;
    }

    .link {
        text-decoration: none;
        color: var(--vp-c-text);
        border-width: 1px 1px 0px 1px;
        border-style: dashed;
        border-color: var(--vp-c-gutter);
        border-radius: 4px;
        padding: 20px;
        display: block;
        margin: 0 20px;
        // background-color: rgb(240, 241, 255);

        &:last-child {
            border-width: 1px 1px 1px 1px;
        }

        &:hover {
            color: var(--vp-c-accent);
            cursor: pointer;
            // box-shadow: var(--el-box-shadow-lighter);
        }

    }
}
</style>
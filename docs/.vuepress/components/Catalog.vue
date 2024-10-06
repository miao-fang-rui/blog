<script setup>

const { catalogHeadings } = defineProps({
    catalogHeadings: {
        type: Array
    }
})
</script>

<template>
    <div class="catalog-container">
        <div class="title">目录导航</div>
        <el-scrollbar class="catalogs">
            <div v-for="heading in catalogHeadings" class="level">
                <div v-if="heading.node.attrs.level === 1" class="level-1"><a href="#">{{
                        heading.textContent }}</a></div>
                <div v-if="heading.node.attrs.level === 2" class="level-2"><a href="#">{{
                        heading.textContent }}</a></div>
                <div v-if="heading.node.attrs.level === 3" class="level-3"><a href="#">{{
                        heading.textContent }}</a></div>
                <div v-if="heading.node.attrs.level === 4" class="level-4"><a href="#">{{
                        heading.textContent }}</a></div>
                <div v-if="heading.node.attrs.level === 5" class="level-5"><a href="#">{{
                        heading.textContent }}</a></div>
                <div v-if="heading.node.attrs.level === 6" class="level-6"><a href="#">{{
                        heading.textContent }}</a></div>
            </div>
        </el-scrollbar>
    </div>

</template>

<style lang="scss" scoped>
.catalog-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 36px);

    .title {
        border-bottom: 1px solid #dbdbdb;
        font-weight: bold;
        font-size: 18px;
        padding: 12px;
        margin: 0 10px;
        color: #5c5c5c;
        box-sizing: border-box;
        flex-grow: 0;
    }

    .catalogs {
        flex-grow: 1;
        overflow: auto;
        padding: 10px;

        .level {

            .level-1 {
                padding-left: 0;
            }

            .level-2 {
                padding-left: 20px;
            }

            .level-3 {
                padding-left: 40px;
            }

            .level-4 {
                padding-left: 60px;
            }

            .level-5 {
                padding-left: 80px;
            }

            .level-6 {
                padding-left: 100px;
            }

            a {
                color: rgb(48, 48, 48);
                font-size: 13px;

                &:hover {
                    color: #5e71ff;
                }
            }

        }
    }
}
</style>
<script setup>
const { catalogHeadings } = defineProps({
    catalogHeadings: {
        type: Array
    }
})
</script>

<template>
    <div  class="catalog-contarner">
        <div class="title">目录导航</div>
        <div class="catalog">
            <div v-for="heading in catalogHeadings" class="level">
                <div v-if="heading.element.nodeName === 'H1'" class="level-1"><a href="#">{{ heading.textContent}}</a></div>
                <div v-if="heading.element.nodeName === 'H2'" class="level-2"><a href="#">{{ heading.textContent}}</a></div>
                <div v-if="heading.element.nodeName === 'H3'" class="level-3"><a href="#">{{ heading.textContent}}</a></div>
                <div v-if="heading.element.nodeName === 'H4'" class="level-4"><a href="#">{{ heading.textContent}}</a></div>
                <div v-if="heading.element.nodeName === 'H5'" class="level-5"><a href="#">{{ heading.textContent}}</a></div>
                <div v-if="heading.element.nodeName === 'H6'" class="level-6"><a href="#">{{ heading.textContent}}</a></div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.catalog {
    box-sizing: border-box;

    .title {
        border-bottom: 1px solid #dbdbdb;
        font-weight: bold;
        font-size: 18px;
        padding: 12px;
        margin: 0 10px 10px 10px;
        color: #5c5c5c;
        box-sizing: border-box;
    }

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
</style>
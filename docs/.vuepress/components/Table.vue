<template>
<table class="table">
    <tbody>
        <tr class="head">
            <th v-for="h in table.head" :align='h.align' :width='h.width'>{{ h.label }}</th>
        </tr>
        <tr v-for="list in table.body" class="body" >
            <td v-for="item in list" :rowspan='item.rowspan' :colspan='item.colspan'  :align='item.align' :style="item.style">
                <div v-if="item.content">{{ item.content }}</div>
                <div v-else v-html="item.html"></div>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script setup>
    const props = defineProps(['table'])
</script>

<style lang="scss" scoped>
.table {
    width: 100%;

    .head{
        font-size: 15px;
    }
    .body{
        font-size: 14px;
    }

}
</style>
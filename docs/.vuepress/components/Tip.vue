<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },

    props: nodeViewProps,

    data() {
        return {
            options: [
                {
                    value: 'tip',
                    label: '提示信息',
                },
                {
                    value: 'warning',
                    label: '警告信息',
                },
                {
                    value: 'danger',
                    label: '危险信息',
                },
                {
                    value: 'info',
                    label: '普通信息',
                },
                {
                    value: 'important',
                    label: '重要信息',
                },
                {
                    value: 'note',
                    label: '备注信息',
                },
            ],
        }
    },

    computed: {
        selectTipType: {
            get() {
                return this.node.attrs.tipType
            },
            set(tipType) {
                this.updateAttributes({ tipType })
            },
        },
        inputTipContent: {
            get() {
                return this.node.attrs.tipContent
            },
            set(tipContent) {
                this.updateAttributes( { tipContent })
            },
        },
    },
}
</script>

<template>
    <node-view-wrapper class="vue-component"
        :style="{ backgroundColor: selectTipType === 'warning' ? '#efda81' : selectTipType === 'danger' ? '#ef8181' : selectTipType === 'info' ? '#aad6f8' : selectTipType === 'important' ? '#a5abf6' : selectTipType === 'note' ? '#eee' : '#81efad' }">
        <!-- <label contenteditable="false">提示文本</label> -->
        <el-input v-model="inputTipContent" style="width: 100%;" placeholder="输入标题内容" clearable class="input-with-select">
            <template #prepend>
                <el-select v-model="selectTipType" style="min-width: 100px; max-width: 300px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </template>
        </el-input>
        <node-view-content class="content" />
    </node-view-wrapper>
</template>

<style lang="scss" scoped>
.vue-component {
    border: 4px solid #eeeeee;
    padding: 20px;
    margin: 10px 0;
    display: block;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    color: rgb(88, 88, 88);

    .content {
        padding: 10px;
    }
}
</style>
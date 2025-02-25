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
                    label: '提示',
                },
                {
                    value: 'warning',
                    label: '警告',
                },
                {
                    value: 'danger',
                    label: '危险',
                },
                {
                    value: 'info',
                    label: '消息',
                },
                {
                    value: 'important',
                    label: '重要',
                },
                {
                    value: 'note',
                    label: '备注',
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
    methods:{
        getBackgroundColor() {
            switch(this.selectTipType) {
                case 'tip': return 'rgb(224.6, 242.8, 215.6)';
                case 'warning': return 'rgb(250, 236.4, 216)';
                case 'danger': return 'rgb(253, 225.6, 225.6)';
                case 'important': return '#d9dcff';
                case 'info': return 'rgb(216.8, 235.6, 255)';
                case 'note': return '#eaeaea';
                default: return '#dfdfdf';
            }
        }
    },
}
</script>

<template>
    <node-view-wrapper class="vue-component" :style="{backgroundColor: getBackgroundColor()}">
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
    border: 1px dashed #eee;
    padding: 10px;
    margin: 10px 0;
    display: block;
    border-radius: 4px;
    box-shadow: 0 2px 16px 0px rgba($color: #000000, $alpha: .1);
    color: rgb(88, 88, 88);

    .content {
        padding: 0px 10px;
        border: 1px dashed #a6a6a6;
        margin-top: 10px;
        border-radius: 4px;
    }
}
</style>
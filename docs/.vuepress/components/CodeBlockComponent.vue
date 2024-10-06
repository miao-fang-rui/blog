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
            languages: this.extension.options.lowlight.listLanguages(),
        }
    },

    computed: {
        selectedLanguage: {
            get() {
                return this.node.attrs.language
            },
            set(language) {
                this.updateAttributes({ language })
            },
        },
    },
}
</script>

<template>
    <node-view-wrapper class="code-block">
        <span class="code-title">代码语言</span>
        <el-select class="el-select" contenteditable="false" v-model="selectedLanguage" clearable filterable placeholder="请选择">
            <el-option v-for="(language, index) in languages" :value="language" :key="index" :label="language" />
        </el-select>
        <pre><code><node-view-content /></code></pre>
    </node-view-wrapper>
</template>

<style lang="scss" scoped>

.code-block {
    position: relative;

    .code-title {
        position: absolute;
        right: 7rem;
        top: 0.72rem;
        color: white;
        font-size: 13px;
    }

    :deep(.el-select) {
        position: absolute !important;
        right: 0.5rem;
        top: 0.3rem;
        border-radius: 4px;
        height: 20px;
        width: 100px;
        display: inline-block;

        .el-select__wrapper{
            // background-color: rgba($color: #000000, $alpha: 0.5);
            background-color: transparent;
            // box-shadow: 0 0 0 1px black inset;
            box-shadow: none;
            color: white;

            &:hover {
                background-color: rgba($color: #000000, $alpha: 1);
                cursor: pointer;
            }

            .el-select__placeholder {
                color: white;
                font-size: 13px;
            }
        }

        .el-select__wrapper.is-focused {
            box-shadow: none;
        }
    }
}
</style>
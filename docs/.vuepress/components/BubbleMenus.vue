<script setup>
import { BubbleMenu } from '@tiptap/vue-3'
import Bold from '../icons/Bold.vue'
import Italic from '../icons/Italic.vue'
import StrikeIcon from '../icons/StrikeIcon.vue'
import Underline from '../icons/Underline.vue'
import LinkIcon from '../icons/LinkIcon.vue'
import Subscript from '../icons/Subscript.vue'
import Superscript from '../icons/Superscript.vue'
import CodeIcon from '../icons/CodeIcon.vue'
import Highlight from '../icons/Highlight.vue'
import CodeBlockIcon from '../icons/CodeBlockIcon.vue'
import LeftTextAlign from '../icons/LeftTextAlign.vue'
import CenterTextAlign from '../icons/CenterTextAlign.vue'
import RightTextAlign from '../icons/RightTextAlign.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import InsetTableLeft from '../icons/InsetTableLeft.vue'
import InsetTableRight from '../icons/InsetTableRight.vue'
import DeleteColumn from '../icons/DeleteColumn.vue'
import AddRowBefore from '../icons/AddRowBefore.vue'
import AddRowAfter from '../icons/AddRowAfter.vue'
import DeleteRow from '../icons/DeleteRow.vue'
import MergeCells from '../icons/MergeCells.vue'
import SplitCell from '../icons/SplitCell.vue'

const { editor } = defineProps({
    editor: {
        type: Object
    }
})

const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
        return
    }

    // empty
    if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const deleteSelectHandle = () => {
    editor.chain().focus().deleteSelection().run()
}

</script>

<template>
    <bubble-menu :editor="editor" :tippy-options="{ duration: 0 }" v-if="editor">

        <div class="bubble-menu" v-if="editor.isActive('ResizableImage')">
            <el-tooltip content="元素块" :show-after="200">
                <button class="button" @click="editor.chain().focus().setDisplay('inline-block').run()">
                    <el-icon size="18">
                        <DeleteIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="删除" :show-after="200">
                <button class="button" @click="deleteSelectHandle">
                    <el-icon size="18">
                        <DeleteIcon />
                    </el-icon>
                </button>
            </el-tooltip>
        </div>
        <div class="bubble-menu" v-else-if="editor.isActive('table')">
            <el-tooltip content="向左插入一列" :show-after="200">
                <button class="button" @click="editor.chain().focus().addColumnBefore().run()">
                    <el-icon size="18">
                        <InsetTableLeft />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="向右插入一列" :show-after="200">
                <button class="button" @click="editor.chain().focus().addColumnAfter().run()">
                    <el-icon size="18">
                        <InsetTableRight />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="删除列" :show-after="200">
                <button class="button" @click="editor.chain().focus().deleteColumn().run()">
                    <el-icon size="18">
                        <DeleteColumn />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="向上添加一行" :show-after="200">
                <button class="button" @click="editor.chain().focus().addRowBefore().run()">
                    <el-icon size="18">
                        <AddRowBefore />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="向下添加一行" :show-after="200">
                <button class="button" @click="editor.chain().focus().addRowAfter().run()">
                    <el-icon size="18">
                        <AddRowAfter />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="删除行" :show-after="200">
                <button class="button" @click="editor.chain().focus().deleteRow().run()">
                    <el-icon size="18">
                        <DeleteRow />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="合并单元格" :show-after="200">
                <button class="button" @click="editor.chain().focus().mergeCells().run()">
                    <el-icon size="18">
                        <MergeCells />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="拆分单元格" :show-after="200">
                <button class="button" @click="editor.chain().focus().splitCell().run()">
                    <el-icon size="18">
                        <SplitCell />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="删除表格" :show-after="200">
                <button class="button" @click="editor.chain().focus().deleteTable().run()">
                    <el-icon size="18">
                        <DeleteIcon />
                    </el-icon>
                </button>
            </el-tooltip>
        </div>
        <div class="bubble-menu" v-else>
            <el-tooltip content="粗体" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('bold') }"
                    @click="editor.chain().focus().toggleBold().run()">
                    <el-icon size="18">
                        <Bold />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="斜体" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('italic') }"
                    @click="editor.chain().focus().toggleItalic().run()">
                    <el-icon size="18">
                        <Italic />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="下划线" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('underline') }"
                    @click="editor.chain().focus().toggleUnderline().run()">
                    <el-icon size="18">
                        <Underline />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="删除线" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('strike') }"
                    @click="editor.chain().focus().toggleStrike().run()">
                    <el-icon size="18">
                        <StrikeIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="高亮" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('highlight') }"
                    @click="editor.chain().focus().toggleHighlight({ color: '#ff8066' }).run()">
                    <el-icon size="18">
                        <Highlight />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="链接" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('link') }" @click="setLink">
                    <el-icon size="18">
                        <LinkIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="下标" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('subscript') }"
                    @click="editor.chain().focus().toggleSubscript().run()">
                    <el-icon size="18">
                        <Subscript />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="上标" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('superscript') }"
                    @click="editor.chain().focus().toggleSuperscript().run()">
                    <el-icon size="18">
                        <Superscript />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="行内代码" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('code') }"
                    @click="editor.chain().focus().toggleCode().run()">
                    <el-icon size="18">
                        <CodeIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="代码块" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('codeBlock') }"
                    @click="editor.chain().focus().toggleCodeBlock().run()">
                    <el-icon size="18">
                        <CodeBlockIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="删除" :show-after="200">
                <button class="button" @click="deleteSelectHandle">
                    <el-icon size="18">
                        <DeleteIcon />
                    </el-icon>
                </button>
            </el-tooltip>
        </div>

    </bubble-menu>
</template>

<style lang="scss" scoped>
.bubble-menu {
    background-color: white;
    border: 1px solid #eee;
    box-shadow: var(--el-box-shadow-light);
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
        background-color: transparent;
        outline: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        margin-right: 6px;

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            background-color: #eee;
        }
    }
}

.is-active {
    background-color: #eee !important;
}
</style>
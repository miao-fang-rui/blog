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
import H1Icon from '../icons/H1Icon.vue'
import H2Icon from '../icons/H2Icon.vue'
import H3Icon from '../icons/H3Icon.vue'
import H4Icon from '../icons/H4Icon.vue'
import H5Icon from '../icons/H5Icon.vue'
import H6Icon from '../icons/H6Icon.vue'

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

</script>

<template>
    <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <div class="bubble-menu">
            <el-tooltip content="标题1" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                    @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
                    <el-icon size="18">
                        <H1Icon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="标题1" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                    @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
                    <el-icon size="18">
                        <H2Icon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="标题1" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                    @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
                    <el-icon size="18">
                        <H3Icon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="标题1" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
                    @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
                    <el-icon size="18">
                        <H4Icon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="标题1" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
                    @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
                    <el-icon size="18">
                        <H5Icon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="标题6" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
                    @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
                    <el-icon size="18">
                        <H6Icon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
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
            <el-tooltip content="高亮" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('highlight') }" 
                    @click="editor.chain().focus().toggleHighlight({ color: '#ff8066' }).run()">
                    <el-icon size="18">
                        <Highlight />
                    </el-icon>
                </button>
            </el-tooltip>

        </div>
    </bubble-menu>
</template>

<style lang="scss" scoped>

.bubble-menu{
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
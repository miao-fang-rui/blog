<script setup>
import { FloatingMenu } from '@tiptap/vue-3'
import FloatMenuIcon from '../icons/FloatMenuIcon.vue';
import Paragraph from '../icons/Paragraph.vue'
import H1Icon from '../icons/H1Icon.vue'
import H2Icon from '../icons/H2Icon.vue'
import H3Icon from '../icons/H3Icon.vue'
import H4Icon from '../icons/H4Icon.vue'
import H5Icon from '../icons/H5Icon.vue'
import H6Icon from '../icons/H6Icon.vue'
import HorizontalRule from '../icons/HorizontalRule.vue'
import Blockquote from '../icons/Blockquote.vue'
import HardBreak from '../icons/HardBreak.vue'


const { editor } = defineProps({
    editor: {
        type: Object
    }
})
const heading = defineModel('title')

const handleFloatCommand = (command) => {
    switch (command) {
        case 'Paragraph':
            heading.value = '正文'
            editor.chain().focus().setParagraph().run()
            break;
        case 'heading1':
            heading.value = '标题1'
            editor.chain().focus().toggleHeading({ level: 1 }).run()
            break;
        case 'heading2':
            heading.value = '标题2'
            editor.chain().focus().toggleHeading({ level: 2 }).run()
            break;
        case 'heading3':
            heading.value = '标题3'
            editor.chain().focus().toggleHeading({ level: 3 }).run()
            break;
        case 'heading4':
            heading.value = '标题4'
            editor.chain().focus().toggleHeading({ level: 4 }).run()
            break;
        case 'heading5':
            heading.value = '标题5'
            editor.chain().focus().toggleHeading({ level: 5 }).run()
            break;
        case 'heading6':
            heading.value = '标题6'
            editor.chain().focus().toggleHeading({ level: 6 }).run()
            break;
        case 'HorizontalRule':
            editor.chain().focus().setHorizontalRule().run()
            break;
        case 'Blockquote':
            editor.chain().focus().toggleBlockquote().run()
            break;
        case 'HardBreak':
            editor.chain().focus().setHardBreak().run()
            break;
    }
}
</script>

<template>
    <floating-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <div class="floating-menu">
            <el-dropdown popper-class="el-dropdown" @command="handleFloatCommand">
                <span class="el-dropdown-link">
                    <el-icon size="20" color="black">
                        <FloatMenuIcon />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="el-dropdown-menu">
                        <el-dropdown-item class="el-dropdown-menu-item" command="Paragraph">
                            <el-icon size="18"><Paragraph /></el-icon>
                            <span>正文</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="heading1" divided>
                            <el-icon size="18"><H1Icon /></el-icon>
                            <span>标题1</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="heading2">
                            <el-icon size="18"><H2Icon /></el-icon>
                            <span>标题2</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="heading3">
                            <el-icon size="18"><H3Icon /></el-icon>
                            <span>标题3</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="heading4">
                            <el-icon size="18"><H4Icon /></el-icon>
                            <span>标题4</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="heading5">
                            <el-icon size="18"><H5Icon /></el-icon>
                            <span>标题5</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="heading6">
                            <el-icon size="18"><H6Icon /></el-icon>
                            <span>标题6</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="HorizontalRule" divided>
                            <el-icon size="18"><HorizontalRule /></el-icon>
                            <span>分割线</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="Blockquote">
                            <el-icon size="18"><Blockquote /></el-icon>
                            <span>引用</span>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-menu-item" command="HardBreak">
                            <el-icon size="18"><HardBreak /></el-icon>
                            <span>换行</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </floating-menu>
</template>

<style lang="scss" scoped>
.floating-menu {
    transform: translate3d(-40px, 0px, 0px);

    .el-dropdown {

        .el-dropdown-link {
            outline: none;
        }
    }
}

:deep(.el-dropdown-menu__item) {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #eee;
        color: black;
    }
}

.is-active {
    background-color: #eee !important;
}
</style>
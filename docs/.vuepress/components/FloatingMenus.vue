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
import BulletList from '../icons/BulletList.vue'
import OrderedList from '../icons/OrderedList.vue'
import TaskItem from '../icons/TaskItem.vue'
import LinkIcon from '../icons/LinkIcon.vue'
import CodeBlockIcon from '../icons/CodeBlockIcon.vue'
import TableIcon from '../icons/TableIcon.vue'



const { editor } = defineProps({
    editor: {
        type: Object
    },
    heading :{
        type: String
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
    <floating-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <div class="nav-wrapper">
            <div class="nav-item">
                <el-icon size="20" class="nav-link">
                    <FloatMenuIcon />
                </el-icon>
                <div class="nav-drop-down-wrapper">
                    <div class="nav-drop-down">
                        <div class="down-item-wrapper">
                            <el-button class="down-button" :class="{ 'is-active': heading==='正文' }"
                            @click="editor.chain().focus().setParagraph().run()">
                                <el-icon size="18">
                                    <Paragraph />
                                </el-icon>
                                <span>正文</span>
                            </el-button>
                        </div>
                        <div class="divider-x"></div>
                        <div class="down-item-wrapper">
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
                                <el-icon size="18">
                                    <H1Icon />
                                </el-icon>
                                <span>标题1</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
                                <el-icon size="18">
                                    <H2Icon />
                                </el-icon>
                                <span>标题2</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
                                <el-icon size="18">
                                    <H3Icon />
                                </el-icon>
                                <span>标题3</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
                            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
                                <el-icon size="18">
                                    <H4Icon />
                                </el-icon>
                                <span>标题4</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
                            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
                                <el-icon size="18">
                                    <H5Icon />
                                </el-icon>
                                <span>标题5</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
                            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
                                <el-icon size="18">
                                    <H6Icon />
                                </el-icon>
                                <span>标题6</span>
                            </el-button>
                        </div>
                        <div class="divider-x"></div>
                        <div class="down-item-wrapper">
                            <el-button class="down-button" @click="editor.chain().focus().setHorizontalRule().run()">
                                <el-icon size="18">
                                    <HorizontalRule />
                                </el-icon>
                                <span>分割线</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('blockquote') }"
                            @click="editor.chain().focus().toggleBlockquote().run()">
                                <el-icon size="18">
                                    <Blockquote />
                                </el-icon>
                                <span>引用</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('bulletList') }"
                            @click="editor.chain().focus().toggleBulletList().run()">
                                <el-icon size="18" >
                                    <BulletList />
                                </el-icon>
                                <span>无序列表</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('orderedList') }"
                            @click="editor.chain().focus().toggleOrderedList().run()">
                                <el-icon size="18">
                                    <OrderedList />
                                </el-icon>
                                <span>有序列表</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('taskList') }"
                            @click="editor.chain().focus().toggleTaskList().run()">
                                <el-icon size="18" >
                                    <TaskItem />
                                </el-icon>
                                <span>任务列表</span>
                            </el-button>
                        </div>
                        <div class="divider-x"></div>
                        <div class="down-item-wrapper">
                            <el-button class="down-button"  :class="{ 'is-active': editor.isActive('link') }" @click="setLink">
                                <el-icon size="18">
                                    <LinkIcon />
                                </el-icon>
                                <span>链接</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button" :class="{ 'is-active': editor.isActive('codeBlock') }"
                            @click="editor.chain().focus().toggleCodeBlock().run()">
                                <el-icon size="18">
                                    <CodeBlockIcon />
                                </el-icon>
                                <span>代码块</span>
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button class="down-button"  @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
                                <el-icon size="18">
                                    <TableIcon />
                                </el-icon>
                                <span>表格</span>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </floating-menu>
</template>

<style lang="scss" scoped>
.divider-x {
    border-bottom: 1px dashed var(--el-border-color);
    margin: 4px 0;
}

.nav-wrapper {
    transform: translate3d(-40px, 0, 0px);

    &:hover {
        cursor: pointer;
    }

    &:hover .nav-drop-down-wrapper {
        display: block;
    }

    .nav-link {
        padding: 3px;
        color: #676767;
        border-radius: 6px;

        &:hover {
            background-color: #eee;
        }
    }

    .nav-drop-down-wrapper {
        background-color: white;
        box-shadow: var(--el-box-shadow-light);
        display: none;
        padding: 10px;
        margin-top: 10px;
    }

    .down-item-wrapper {
        display: flex;
        align-items: center;

        .down-button {
            display: flex;
            align-items: center;
            border: none;
            padding: 0 4px;

            &:hover {
                background-color: #eee;
                color: black;
            }
        }
    }
}

.is-active {
    background-color: #eee !important;
    color: black;
}
</style>
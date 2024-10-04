<script setup>
import { ref, onMounted, h } from 'vue'
import { ElMessage } from 'element-plus'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Markdown } from 'tiptap-markdown'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Menubar from './Menubar.vue'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import BubbleMenus from './BubbleMenus.vue'
import FloatingMenus from './FloatingMenus.vue'


const editor = ref(null)
const content = ref()
const heading = ref('正文')

onMounted(() => {
    editor.value = new Editor({
        autofocus: true,
        extensions: [
            StarterKit,
            Markdown,
            Underline,
            Subscript,
            Superscript,
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({
                placeholder: '开始写文章吧 . . .',
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Image.configure({
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                defaultProtocol: 'https',
            }),
        ],
        content: '',
        onUpdate: () => {
            // content.value = editor.value.getHTML()
            const markdownOutput = editor.value.storage.markdown.getMarkdown();
            // console.log(content.value)
            console.log(markdownOutput)
        },
        onTransaction({ editor, transaction }) {
            if (editor.isActive('heading', { level: 1 })) {
                heading.value = '标题1'
            } else if (editor.isActive('heading', { level: 2 })) {
                heading.value = '标题2'
            } else if (editor.isActive('heading', { level: 3 })) {
                heading.value = '标题3'
            } else if (editor.isActive('heading', { level: 4 })) {
                heading.value = '标题4'
            } else if (editor.isActive('heading', { level: 5 })) {
                heading.value = '标题5'
            } else if (editor.isActive('heading', { level: 6 })) {
                heading.value = '标题6'
            } else {
                heading.value = '正文'
            }
        },
    })
})


</script>

<template>
    <ClientOnly>
        <div class="editor-container">
            <Menubar :editor="editor" v-model:title="heading" />
            <BubbleMenus :editor="editor" v-model:title="heading" />
            <FloatingMenus :editor="editor" />
            <div class="editor">
                <editor-content :editor="editor" />
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="scss" scoped>
.editor-container {
    background-color: #eee;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.editor {
    width: 100%;
}

:deep(.tiptap) {
    margin: 60px auto;
    padding: 60px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #eee;
    background-color: white;
    width: 60%;
    min-height: 800px;
    border: 1px solid #eee;

    table {
        border-collapse: collapse;
        margin: 0;
        overflow: hidden;
        table-layout: fixed;
        width: 100%;

        td,
        th {
            border: 1px solid rgba(61, 37, 20, .12);
            box-sizing: border-box;
            min-width: 1em;
            padding: 0px 8px;
            position: relative;
            vertical-align: top;

            >* {
                display: flex;
                align-items: center;
                margin: 6px;
            }
        }

        th {
            background-color: rgba(61, 37, 20, .05);
            font-weight: bold;
            text-align: left;
        }

        .selectedCell:after {
            background: rgba(61, 37, 20, .08);
            content: "";
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
        }

        .column-resize-handle {
            background-color: #837aff;
            bottom: -2px;
            pointer-events: none;
            position: absolute;
            right: -8px;
            top: -4px;
            width: 2px;
            height: 40px;
        }
    }

    .tableWrapper {
        margin: 1.5rem 0;
        overflow-x: auto;
    }

    &.resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
    }

    /* Task list specific styles */
    ul[data-type="taskList"] {
        list-style: none;
        margin-left: 0;
        padding: 0;

        li {
            align-items: flex-start;
            display: flex;
            align-items: center;

            >label {
                flex: 0 0 auto;
                margin-right: 0.5rem;
                user-select: none;
            }

            >div {
                flex: 1 1 auto;

                >p {
                    margin: 0;
                }
            }
        }

        input[type="checkbox"] {
            cursor: pointer;
        }

        ul[data-type="taskList"] {
            margin: 0;
        }
    }

    img {
        display: block;
        height: auto;
        margin: 1.5rem 0;
        max-width: 100%;

        &.ProseMirror-selectednode {
            outline: 3px solid var(--purple);
        }
    }

    a {
        color: var(--vp-c-accent);
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }

        &::before {
            content: '[ ';
        }

        &::after {
            content: ' ]';
        }
    }

    p.is-editor-empty:first-child::before {
        color: #adb5bd;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }
}

:deep(.tippy-box) {
    max-width: 1200px !important;
}
</style>
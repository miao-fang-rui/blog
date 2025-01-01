<script setup>
import { ref, onMounted, h, onUnmounted } from 'vue'
import 'element-plus/theme-chalk/display.css'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Menubar from './Menubar.vue'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import BubbleMenus from './BubbleMenus.vue'
import FloatingMenus from './FloatingMenus.vue'
import Catalog from './Catalog.vue'
import CatalogMenus from './CatalogMenus.vue'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
import CharacterCount from '@tiptap/extension-character-count'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockComponent from './CodeBlockComponent.vue'
import Indent from '../extension/indent'
import ResizableImage from '../extension/image'
import MarkdownOutputExtension from '../extension/makedown'

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const editor = ref(null)
const content = ref()
const heading = ref('正文')
const catalogIsShow = ref(true)
const catalogHeadings = ref()
const textAlign = ref('left')


window.addEventListener('scroll', (e) => {
    let header = document.getElementById('menu-bar');
    let catalog = document.getElementById('catalog');
    let headerHeight = header?.offsetHeight;
    catalog?.style?.top = headerHeight + 'px';
    catalog.style.height = `calc(100vh - ${headerHeight}px)`
})

onMounted(() => {

    editor.value = new Editor({
        autofocus: true,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
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
            ResizableImage.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'custom-image'
                }
            }),
            Link.configure({
                openOnClick: false,
                defaultProtocol: 'https',
            }),
            CodeBlockLowlight.extend({
                addNodeView() {
                    return VueNodeViewRenderer(CodeBlockComponent)
                },
            }).configure({ lowlight }),
            CharacterCount,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Indent,
            MarkdownOutputExtension,
        ],
        content: '',
        onUpdate: () => {
            content.value = editor.value.getJSON()
            localStorage.setItem('editor-content', JSON.stringify(content.value))
        },
        onTransaction({ editor, transaction }) {

            catalogHeadings.value = editor.$nodes('heading')

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

            if (editor.isActive({ textAlign: 'center' })) {
                textAlign.value = 'center'
            } else if (editor.isActive({ textAlign: 'right' })) {
                textAlign.value = 'right'
            } else if (editor.isActive({ textAlign: 'justify' })) {
                textAlign.value = 'justify'
            } else {
                textAlign.value = 'left'
            }
        },
    })

    if (editor.value) {
        const getJson = JSON.parse(localStorage.getItem('editor-content'))
        editor.value.commands.setContent(getJson)
    }

})

onUnmounted(() => {
    editor.value.destroy()
})

</script>

<template>
    <ClientOnly>
        <CatalogMenus class="no-print" v-model:title="catalogIsShow" :editor="editor" />
        <div class="editor-container">
            <div class="catalog no-print hidden-sm-and-down" id="catalog" v-if="catalogIsShow">
                <Catalog :catalogHeadings="catalogHeadings" />
            </div>
            <editor-content :editor="editor" class="editor" id="editor" />
        </div>
        <div class="no-print">
            <Menubar :editor="editor" :content="content" v-model:heading="heading" v-model:textAlign="textAlign" />
            <BubbleMenus class="bubbleMenus" :editor="editor" v-model:title="heading" />
            <FloatingMenus :editor="editor" :heading="heading" />
        </div>
    </ClientOnly>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 576px) {
    .editor {
        width: 100% !important;
        margin: 0 !important;
        :deep(.tiptap){ 
            padding: 60px 20px !important;
            margin-bottom: 0 !important;
        }
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    .editor {
        width: 90% !important;
    }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
    .editor {
        width: 90% !important;
    }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
    .editor {
        width: 860px !important;
    }
}

@media screen and (min-width: 1200px) {
    .editor {
        width: 860px !important;
    }
}


@media print {
    body * {
        visibility: hidden;
    }

    .no-print {
        visibility: hidden;
        display: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    :deep(.tiptap) * {
        visibility: visible;
    }

    :deep(.tiptap) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }
}

.editor-container {
    background-color: var(--vp-c-grey-bg);
    height: 100%;
    display: flex;

    .catalog {
        // display: none;
        height: calc(100vh - 48px);
        width: 260px;
        position: sticky;
        // flex: none;
        overflow: auto;
        top: 48px;
        border-right: 1px solid var(--vp-c-border);
        // padding: 10px 20px;
        box-sizing: border-box;
    }

    .editor {
        width: 64%;
        margin: 60px auto;
    }
}

:deep(.tiptap) {
    padding: 60px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid var(--vp-c-gutter);
    background-color: var(--vp-c-bg);
    // width: 70%;
    margin: 60px 0;
    min-height: 1200px;

    pre {
        background: #2E2B29;
        border-radius: 0.5rem;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 2rem 1rem 1rem 1rem;
        overflow: auto !important;

        code {
            background: none;
            color: inherit;
            font-size: 15px;
            line-height: 30px;
            overflow-x: auto;
            width: 100%;
            word-wrap: none;
            word-break: break-all;
        }

        /* Code styling */
        .hljs-comment,
        .hljs-quote {
            color: #616161;
        }

        .hljs-variable,
        .hljs-template-variable,
        .hljs-attribute,
        .hljs-tag,
        .hljs-name,
        .hljs-regexp,
        .hljs-link,
        .hljs-name,
        .hljs-selector-id,
        .hljs-selector-class {
            color: #f98181;
        }

        .hljs-number,
        .hljs-meta,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-literal,
        .hljs-type,
        .hljs-params {
            color: #fbbc88;
        }

        .hljs-string,
        .hljs-symbol,
        .hljs-bullet {
            color: #b9f18d;
        }

        .hljs-title,
        .hljs-section {
            color: #faf594;
        }

        .hljs-keyword,
        .hljs-selector-tag {
            color: #70cff8;
        }

        .hljs-emphasis {
            font-style: italic;
        }

        .hljs-strong {
            font-weight: 700;
        }
    }

    table {
        border-collapse: collapse;
        margin: 0;
        overflow: hidden;
        table-layout: fixed;
        width: 100%;
        border-radius: 3px;

        td,
        th {
            border: 1px solid var(--vp-c-grey-hover);
            box-sizing: border-box;
            min-width: 1em;
            padding: 0px 8px;
            position: relative;
            vertical-align: top;

            >* {
                margin: 6px 6px 6px 0;
            }
        }

        th {
            background-color: rgba(61, 37, 20, .05);
            font-weight: bold;
            text-align: left;
        }

        .selectedCell:after {
            background: rgba(105, 105, 105, 0.3);
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
            top: -6px;
            width: 2px;
            height: 100%;
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

    img {
        display: block;
        height: auto;
        max-width: 100%;

        &.ProseMirror-selectednode {
            outline: 2px solid var(--vp-c-accent);
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
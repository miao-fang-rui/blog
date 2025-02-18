<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import Bold from '../icons/Bold.vue'
import Italic from '../icons/Italic.vue'
import Blockquote from '../icons/Blockquote.vue'
import BulletList from '../icons/BulletList.vue'
import HardBreak from '../icons/HardBreak.vue'
import Check from '../icons/Check.vue'
import HorizontalRule from '../icons/HorizontalRule.vue'
import OrderedList from '../icons/OrderedList.vue'
import TableIcon from '../icons/TableIcon.vue'
import InsetTable from '../icons/InsetTable.vue'
import InsetTableLeft from '../icons/InsetTableLeft.vue'
import InsetTableRight from '../icons/InsetTableRight.vue'
import DeleteColumn from '../icons/DeleteColumn.vue'
import AddRowBefore from '../icons/AddRowBefore.vue'
import AddRowAfter from '../icons/AddRowAfter.vue'
import DeleteRow from '../icons/DeleteRow.vue'
import MergeCells from '../icons/MergeCells.vue'
import SplitCell from '../icons/SplitCell.vue'
import TaskItem from '../icons/TaskItem.vue'
import ImageIcon from '../icons/ImageIcon.vue'
import StrikeIcon from '../icons/StrikeIcon.vue'
import LinkIcon from '../icons/LinkIcon.vue'
import Underline from '../icons/Underline.vue'
import Subscript from '../icons/Subscript.vue'
import Superscript from '../icons/Superscript.vue'
import CodeIcon from '../icons/CodeIcon.vue'
import Highlight from '../icons/Highlight.vue'
import CodeBlockIcon from '../icons/CodeBlockIcon.vue'
import UndoIcon from '../icons/UndoIcon.vue'
import RedoIcon from '../icons/RedoIcon.vue'
import LeftTextAlign from '../icons/LeftTextAlign.vue'
import CenterTextAlign from '../icons/CenterTextAlign.vue'
import RightTextAlign from '../icons/RightTextAlign.vue'
import JustifyTextAlign from '../icons/JustifyTextAlign.vue'
import SourceCodeIcon from '../icons/SourceCodeIcon.vue'
import PrintIcon from '../icons/PrintIcon.vue'
import SettingIcon from '../icons/SettingIcon.vue'
import DownloadIcon from '../icons/DownloadIcon.vue'
import EraserIcon from '../icons/EraserIcon.vue'
import MarkdownIcon from '../icons/MarkdownIcon.vue'
import PdfIcon from '../icons/PdfIcon.vue'
import IndentIcon from '../icons/IndentIcon.vue'
import OutdentIcon from '../icons/OutdentIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'


const { editor } = defineProps({
    editor: {
        type: Object
    }
})

const fileList = ref([])
const heading = defineModel('heading')
const textAlign = defineModel('textAlign')
const sourceCode = ref('')
const activeTabName = ref('')
const sourceCodeHtml = ref('')
const sourceCodeMarkdown = ref('')
const dialogConfig = reactive({
    visible: false,
    id: '',
    title: '',
    width: '60%',
    draggable: true
})

const article = reactive({
    prev: {
        text: '',
        link: '',
    },
    next: {
        text: '',
        link: '',
    },
    title: '',
    imgSrc: '',
})

const handleTextAlignCommand = (command) => {
    switch (command) {
        case 'left':
            textAlign.value = 'left'
            editor.chain().focus().setTextAlign('left').run()
            break;
        case 'center':
            textAlign.value = 'center'
            editor.chain().focus().setTextAlign('center').run()
            break;
        case 'right':
            textAlign.value = 'right'
            editor.chain().focus().setTextAlign('right').run()
            break;
        case 'justify':
            textAlign.value = 'justify'
            editor.chain().focus().setTextAlign('justify').run()
            break;
    }
}

const handleCommand = (command) => {
    switch (command) {
        case 'text':
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
    }
}

const handleTableCommand = (command) => {
    switch (command) {
        case 'insertTable':
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            break;
        case 'addColumnBefore':
            editor.chain().focus().addColumnBefore().run()
            break;
        case 'addColumnAfter':
            editor.chain().focus().addColumnAfter().run()
            break;
        case 'deleteColumn':
            editor.chain().focus().deleteColumn().run()
            break;
        case 'addRowBefore':
            editor.chain().focus().addRowBefore().run()
            break;
        case 'addRowAfter':
            editor.chain().focus().addRowAfter().run()
            break;
        case 'deleteRow':
            editor.chain().focus().deleteRow().run()
            break;
        case 'mergeCells':
            editor.chain().focus().mergeCells().run()
            break;
        case 'splitCell':
            editor.chain().focus().splitCell().run()
            break;
        case 'deleteTable':
            editor.chain().focus().deleteTable().run()
            break;
    }
}

const uploadImg = (uploadFile) => {

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64String = e.target.result;

        editor.chain().focus().setImage({
            src: base64String,
            alt: uploadFile.name,
            title: uploadFile.name,
        }).run()
    }
    reader.readAsDataURL(uploadFile.raw);
    
}

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

const eraserFormat = () => {
    editor.commands.selectAll()
    editor.commands.clearNodes()
    editor.commands.unsetAllMarks()
}

const dialogHandle = (id) => {
    dialogConfig.id = id
    switch (id) {
        case 'sourceCode':
            dialogConfig.title = '查看源代码';
            sourceCode.value = editor.getHTML()
            dialogConfig.visible = true
            break;
        case 'print':
            dialogConfig.title = '打印';
            window.print();
            break;
        case 'setting':
            dialogConfig.title = '设置';
            dialogConfig.visible = true
            break;
        case 'download':
            dialogConfig.title = '下载';
            dialogConfig.visible = true
            break;
    }
}

const dialogCloseHandle = () => {
    if (dialogConfig.id === 'setting') {
        settingSaveHandle()
    } else {
        dialogConfig.visible = false
    }
}

const converseImages = (makedownText) => {
    const regex = /!\[(.*?)\]\((data:.*?\")(.*?)"(.*?)\)/g;
    const replacedText = makedownText.replace(regex, (_, alt, blob, title, size) => {
        if(size.split('x')[0] === ' =100%'){
            return `![${alt}](${article.imgSrc}${title})`
        }else{
            return `![${alt}](${article.imgSrc}${title}${size})`
        }
    })
    return replacedText
}


const getMarkdownFile = () => {

    if (article.title !== '') {
        ElMessageBox.confirm('确认下载本页面文档 - [ ' + article.title + '.md' + ' ], 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            plain: true,
        })
            .then(() => {
                const content = converseImages(editor.commands.outputMarkdown())
                const frontpage =
                    `---
sidebar: heading
prev:
  text: ${article.prev.text? article.prev.text: '无'}
  link: ${article.prev.link? article.prev.link: '无'}
next:
  text: ${article.next.text? article.next.text: '无'}
  link: ${article.next.link? article.next.link: '无'}
---

`
                // 创建一个 Blob 对象，它表示了一段不可变的原始数据
                const blob = new Blob([frontpage + content], { type: 'text/plain' });
                // 创建一个指向 Blob 的 URL
                const url = URL.createObjectURL(blob);
                // 创建一个下载链接元素
                const downloadLink = document.createElement('a');
                // 设置下载链接的 href 属性为 Blob 的 URL
                downloadLink.href = url;
                // 设置下载文件的名称
                downloadLink.download = article.title + '.md';
                // 触发下载
                document.body.appendChild(downloadLink);
                downloadLink.click();
                // 清理
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(url);

                ElMessage.success({
                    message: '导出成功，请等待浏览器下载！',
                    type: 'success',
                    plain: true,
                })
                dialogConfig.visible = false

            }).catch(() => {
                ElMessage({
                    message: '取消下载!',
                    type: 'error',
                    plain: true,
                })

            })
    } else {
        ElMessage({
            message: '请先设置文章标题!',
            type: 'error',
            plain: true,
        })
    }

}

const getPdfFile = () => {
    console.log('getPdf')
    // const markdown = editor.commands.outputMarkdown()
    const markdown = converseImages(editor.commands.outputMarkdown())
    console.log(markdown)
}

const settingSaveHandle = () => {
    if (article.title) {
        dialogConfig.visible = false
        localStorage.setItem('editor-blog', JSON.stringify({
            'title': article.title,
            'imgSrc': article.imgSrc,
            'prev': { 'text': article.prev.text, 'link': article.prev.link },
            'next': { 'text': article.next.text, 'link': article.next.link },
        }))
    } else {
        ElMessage({
            message: '请先设置文章标题!',
            type: 'error',
            plain: true,
        })
    }
}

const handleTabsChange = (TabPaneName) => {
    
    if (TabPaneName === 'Html') {
        sourceCodeHtml.value = editor.getHTML()

    }

    if (TabPaneName === 'Markdown') {
        const markdown =  editor.commands.outputMarkdown()
        const converseMarkdown = converseImages(markdown)
        sourceCodeMarkdown.value = converseMarkdown
    }
}

onMounted(() => {
    if (localStorage.getItem('editor-blog')) {
        const articleLocalStorage = JSON.parse(localStorage.getItem('editor-blog'))
        article.title = articleLocalStorage.title
        article.imgSrc = articleLocalStorage.imgSrc
        article.prev.text = articleLocalStorage.prev.text
        article.prev.link = articleLocalStorage.prev.link
        article.next.text = articleLocalStorage.next.text
        article.next.link = articleLocalStorage.next.link
        article.content = articleLocalStorage.content
    }
})
</script>

<template>
    <div class="menu-bar" id="menu-bar">
        <div class="menu-buttons">
            <el-tooltip content="撤销" :show-after="200">
                <button class="button" :disabled="!editor.can().undo()" @click="editor.chain().focus().undo().run()">
                    <el-icon size="18">
                        <UndoIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="恢复" :show-after="200">
                <button class="button" :disabled="!editor.can().redo()" @click="editor.chain().focus().redo().run()">
                    <el-icon size="18">
                        <RedoIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="清除格式" :show-after="200">
                <button class="button" @click="eraserFormat">
                    <el-icon size="18">
                        <EraserIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-dropdown class="drop-down" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ heading }}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="el-dropdown-menu">
                        <el-dropdown-item command="heading1">
                            <div class="el-icon">
                                <el-icon v-show="heading === '标题1'">
                                    <Check />
                                </el-icon>
                            </div>
                            <h1>标题1</h1>
                        </el-dropdown-item>
                        <el-dropdown-item command="heading2">
                            <div class="el-icon">
                                <el-icon v-show="heading === '标题2'">
                                    <Check />
                                </el-icon>
                            </div>
                            <h2>标题2</h2>
                        </el-dropdown-item>
                        <el-dropdown-item command="heading3">
                            <div class="el-icon">
                                <el-icon v-show="heading === '标题3'">
                                    <Check />
                                </el-icon>
                            </div>
                            <h3>标题3</h3>
                        </el-dropdown-item>
                        <el-dropdown-item command="heading4">
                            <div class="el-icon">
                                <el-icon v-show="heading === '标题4'">
                                    <Check />
                                </el-icon>
                            </div>
                            <h4>标题4</h4>
                        </el-dropdown-item>
                        <el-dropdown-item command="heading5">
                            <div class="el-icon">
                                <el-icon v-show="heading === '标题5'">
                                    <Check />
                                </el-icon>
                            </div>
                            <h5>标题5</h5>
                        </el-dropdown-item>
                        <el-dropdown-item command="heading6">
                            <div class="el-icon">
                                <el-icon v-show="heading === '标题6'">
                                    <Check />
                                </el-icon>
                            </div>
                            <h6>标题6</h6>
                        </el-dropdown-item>
                        <el-dropdown-item class="el-dropdown-text" command="text">
                            <div class="el-icon">
                                <el-icon v-show="heading === '正文'">
                                    <Check />
                                </el-icon>
                            </div>
                            正文
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
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
            <el-divider direction="vertical" />
            <el-dropdown class="textalign-dropdown" @command="handleTextAlignCommand">
                <span class="el-dropdown-link">
                    <el-icon size="18" v-show="textAlign === 'left'">
                        <LeftTextAlign />
                    </el-icon>
                    <el-icon size="18" v-show="textAlign === 'center'">
                        <CenterTextAlign />
                    </el-icon>
                    <el-icon size="18" v-show="textAlign === 'right'">
                        <RightTextAlign />
                    </el-icon>
                    <el-icon size="18" v-show="textAlign === 'justify'">
                        <JustifyTextAlign />
                    </el-icon>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="el-dropdown-menu">
                        <el-dropdown-item command="left">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'left'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon>
                                    <LeftTextAlign />
                                </el-icon>左对齐</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="center">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'center'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon>
                                    <CenterTextAlign />
                                </el-icon>居中对齐</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="right">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'right'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon>
                                    <RightTextAlign />
                                </el-icon>右对齐</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="justify">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'justify'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon>
                                    <JustifyTextAlign />
                                </el-icon>两端对齐</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-tooltip content="高亮" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('highlight') }"
                    @click="editor.chain().focus().toggleHighlight({ color: '#ff8066' }).run()">
                    <el-icon size="18">
                        <Highlight />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="分割线" :show-after="200">
                <button class="button" @click="editor.chain().focus().setHorizontalRule().run()">
                    <el-icon size="18">
                        <HorizontalRule />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="引用" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('blockquote') }"
                    @click="editor.chain().focus().toggleBlockquote().run()">
                    <el-icon size="18">
                        <Blockquote />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="无序列表" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('bulletList') }"
                    @click="editor.chain().focus().toggleBulletList().run()">
                    <el-icon size="18">
                        <BulletList />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="有序列表" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('orderedList') }"
                    @click="editor.chain().focus().toggleOrderedList().run()">
                    <el-icon size="18">
                        <OrderedList />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="任务列表" :show-after="200">
                <button class="button" :class="{ 'is-active': editor.isActive('taskList') }"
                    @click="editor.chain().focus().toggleTaskList().run()">
                    <el-icon size="18">
                        <TaskItem />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="增加缩进" :show-after="200">
                <button class="button" @click="editor.chain().focus().indent().run()">
                    <el-icon size="18">
                        <IndentIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="减少缩进" :show-after="200">
                <button class="button" @click="editor.chain().focus().outdent().run()">
                    <el-icon size="18">
                        <OutdentIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="换行" :show-after="200">
                <button class="button" @click="editor.chain().focus().setHardBreak().run()">
                    <el-icon size="18">
                        <HardBreak />
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
            <el-dropdown class="table-dropdown" @command="handleTableCommand">
                <span class="el-dropdown-link">
                    <el-icon size="18">
                        <TableIcon />
                    </el-icon>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="el-dropdown-menu">
                        <el-dropdown-item command="insertTable">
                            <el-icon size="18">
                                <InsetTable />
                            </el-icon>
                            <span>插入表格</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="addColumnBefore">
                            <el-icon size="18">
                                <InsetTableLeft />
                            </el-icon>
                            <span>向左插入一列</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="addColumnAfter">
                            <el-icon size="18">
                                <InsetTableRight />
                            </el-icon>
                            <span>向右插入一列</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="deleteColumn">
                            <el-icon size="18">
                                <DeleteColumn />
                            </el-icon>
                            <span>删除列</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="addRowBefore">
                            <el-icon size="18">
                                <AddRowBefore />
                            </el-icon>
                            <span>向上面添加一行</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="addRowAfter">
                            <el-icon size="18">
                                <AddRowAfter />
                            </el-icon>
                            <span>向下面添加一行</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="deleteRow">
                            <el-icon size="18">
                                <DeleteRow />
                            </el-icon>
                            <span>删除行</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="mergeCells">
                            <el-icon size="18">
                                <MergeCells />
                            </el-icon>
                            <span>合并单元格</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="splitCell">
                            <el-icon size="18">
                                <SplitCell />
                            </el-icon>
                            <span>分割单元格</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="deleteTable">
                            <el-icon size="18">
                                <DeleteIcon />
                            </el-icon>
                            <span>删除表格</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- <el-divider direction="vertical" /> -->
            <el-upload v-model:file-list="fileList" ref="uploadRef" action="#" :auto-upload="false"
                :on-change="uploadImg">
                <el-tooltip content="插入图片" :show-after="200">
                    <button class="button">
                        <el-icon size="18">
                            <ImageIcon />
                        </el-icon>
                    </button>
                </el-tooltip>
            </el-upload>
            <el-divider direction="vertical" />
            <el-tooltip content="HTML源代码" :show-after="200">
                <button class="button" @click="dialogHandle('sourceCode')">
                    <el-icon size="18">
                        <SourceCodeIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="打印" :show-after="200">
                <button class="button" @click="dialogHandle('print')">
                    <el-icon size="18">
                        <PrintIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="设置" :show-after="200">
                <button class="button" @click="dialogHandle('setting')">
                    <el-icon size="18">
                        <SettingIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="下载" :show-after="200">
                <button class="button" @click="dialogHandle('download')">
                    <el-icon size="18">
                        <DownloadIcon />
                    </el-icon>
                </button>
            </el-tooltip>
        </div>

        <el-dialog v-model="dialogConfig.visible" :draggable="dialogConfig.draggable" :show-close="false"
            :width="dialogConfig.width" :before-close="dialogCloseHandle">
            <template #header>
                <div class="dialog-header">
                    <span class="dialog-title">{{ dialogConfig.title }}</span>
                    <el-button link @click="dialogConfig.visible = false">
                        <el-icon class="el-icon--left">
                            <Close />
                        </el-icon>
                    </el-button>
                </div>
            </template>
            <div v-show="dialogConfig.id === 'sourceCode'" class="sourceCode">
                <el-tabs v-model="activeTabName" class="sourceCodeTabs" @tab-change="handleTabsChange">
                    <el-scrollbar height="400px">
                        <el-tab-pane label="Html" name="Html">{{ sourceCodeHtml }}</el-tab-pane>
                        <el-tab-pane label="Markdown" name="Markdown">{{ sourceCodeMarkdown }}</el-tab-pane>
                    </el-scrollbar>
                </el-tabs>
            </div>
            <div v-show="dialogConfig.id === 'setting'" class="setting">
                <el-form :model="article" labelPosition="top">
                    <el-form-item label="文章标题">
                        <el-input v-model="article.title" />
                    </el-form-item>
                    <el-form-item label="图片路径">
                        <el-input v-model="article.imgSrc" />
                        <el-alert show-icon type="info" :closable="false" style="margin-top: 6px"
                            title="例: /产品/车载调度/车载机/TM8730/" />
                    </el-form-item>
                    <el-form-item label="上一篇文章">
                        <el-row :gutter="20" style="width:100%">
                            <el-col :span="12"><el-input v-model="article.prev.text" placeholder="标题" /></el-col>
                            <el-col :span="12"><el-input v-model="article.prev.link" placeholder="链接" /></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="下一篇文章">
                        <el-row :gutter="20" style="width:100%">
                            <el-col :span="12"><el-input v-model="article.next.text" placeholder="标题" /></el-col>
                            <el-col :span="12"><el-input v-model="article.next.link" placeholder="链接" /></el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="dialogConfig.id === 'download'">
                <div class="download-buttons">
                    <el-button class="download-btn" color="#626aef" plain @click="getMarkdownFile">
                        <el-icon size="60" class="download-icon">
                            <MarkdownIcon />
                        </el-icon>
                        <span>MarkDown</span>
                    </el-button>
                    <el-button class="download-btn" color="#626aef" plain @click="getPdfFile">
                        <el-icon size="60" class="download-icon">
                            <PdfIcon />
                        </el-icon>
                        <span>PDF</span>
                    </el-button>
                </div>
            </div>
            <template #footer v-if="dialogConfig.id === 'setting'">
                <div class="dialog-footer">
                    <el-button type="primary" color="#626aef" @click="settingSaveHandle">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dialog-title {
        font-weight: bold;
    }
}

.sourceCode {

    .el-scrollbar {
        padding: 0 10px;
    }

    .sourceCodeTabs {

        :deep(.el-tabs__content) {
            color: #6b778c;
            line-height: 30px;
        }

    }
}

.download-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;
    box-sizing: border-box;

    .download-btn {
        height: 200px;
        width: 50%;

        :deep(span) {
            display: flex;
            flex-direction: column;

            .download-icon {
                margin-bottom: 10px;
            }
        }
    }
}

.setting {
    padding: 20px;

    :deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px #626aef inset !important;
    }
}

.menu-bar {
    position: fixed;
    top: 0;
    background-color: var(--vp-c-bg);
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    // border: 1px solid #eee;
    border-bottom: 1px solid var(--vp-c-gutter);
    flex-wrap: wrap;

    .menu-buttons {
        display: flex;
        justify-items: center;
        align-items: center;
        padding: 10px;
        margin: 0 auto;
        flex-wrap: wrap;
    }

    .button {
        border: none;
        padding: 4px;
        margin: 0 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        color: var(--vp-c-text);

        &:hover {
            background-color: var(--vp-c-border);
            // background-color: #eee;
        }
    }

    .drop-down {
        width: 60px;
        height: 26px;
        padding: 0 6px;

        &:hover {
            background-color: var(--vp-c-border);
        }

        .el-dropdown-link {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            outline: none;
            color: var(--vp-c-text);
        }
    }
}

:deep(.el-dropdown-menu__item) {
    padding-left: 30px !important;
    padding-right: 30px !important;

    .el-dropdown-text {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
        color: var(--vp-c-text) !important;

    }

    .el-icon {
        margin-right: 4px;
    }

    &:hover {
        background-color: #eee !important;
        color: var(--el-text-color-regular);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0 !important;
    }
}

.table-dropdown {
    height: 26px;
    padding: 0 6px;

    &:hover {
        background-color: var(--vp-c-border);
    }

    .el-dropdown-link {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        outline: none;
        color: var(--vp-c-text);
    }
}

.textalign-dropdown {
    // margin-right: 10px;
    padding: 0 6px;
    height: 26px;

    &:hover {
        background-color: var(--vp-c-border);
    }

    .el-dropdown-link {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        outline: none;
        color: var(--vp-c-text);
    }
}

:deep(.el-upload-list--text) {
    display: none;
}

.is-active {
    background-color: var(--vp-c-grey-bg) !important;
}
</style>
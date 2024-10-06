<script setup>
import { ref } from 'vue'
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
import DeleteTableIcon from '../icons/DeleteTableIcon.vue'
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


const { editor } = defineProps({
    editor: {
        type: Object
    }
})

const fileList = ref([])
const heading = defineModel('heading')
const textAlign = defineModel('textAlign')

const handleTextAlignCommand =(command) => {
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
        case 'deleteTable':
            editor.chain().focus().deleteTable().run()
            break;
        case 'mergeCells':
            editor.chain().focus().mergeCells().run()
            break;
        case 'splitCell':
            editor.chain().focus().splitCell().run()
            break;
    }
}

const uploadImg = (uploadFile) => {
    console.log(uploadFile)
    const imageUrl = URL.createObjectURL(uploadFile.raw)
    console.log(imageUrl)

    if (imageUrl) {
        editor.chain().focus().setImage({
            src: imageUrl,
            alt: uploadFile.name,
            title: uploadFile.name,
        }).run()
    }
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
                    <el-icon size="18" v-show="textAlign === 'left'"><LeftTextAlign /></el-icon>
                    <el-icon size="18" v-show="textAlign === 'center'"><CenterTextAlign /></el-icon>
                    <el-icon size="18" v-show="textAlign === 'right'"><RightTextAlign /></el-icon>
                    <el-icon size="18" v-show="textAlign === 'justify'"><JustifyTextAlign /></el-icon>
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
                            <span><el-icon><LeftTextAlign /></el-icon>左对齐</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="center">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'center'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon><CenterTextAlign /></el-icon>居中对齐</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="right">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'right'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon><RightTextAlign /></el-icon>右对齐</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="justify">
                            <div class="el-icon">
                                <el-icon v-show="textAlign === 'justify'">
                                    <Check />
                                </el-icon>
                            </div>
                            <span><el-icon><JustifyTextAlign /></el-icon>两端对齐</span>
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
                        <el-dropdown-item command="deleteTable">
                            <el-icon size="18">
                                <DeleteTableIcon />
                            </el-icon>
                            <span>删除表格</span>
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
            <el-tooltip content="源代码" :show-after="200">
                <button class="button" @click="">
                    <el-icon size="18">
                        <SourceCodeIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="打印" :show-after="200">
                <button class="button" @click="">
                    <el-icon size="18">
                        <PrintIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip content="设置" :show-after="200">
                <button class="button" @click="">
                    <el-icon size="18">
                        <SettingIcon />
                    </el-icon>
                </button>
            </el-tooltip>
            <el-tooltip content="下载" :show-after="200">
                <button class="button" @click="">
                    <el-icon size="18">
                        <DownloadIcon />
                    </el-icon>
                </button>
            </el-tooltip>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu-bar {
    position: fixed;
    top: 0;
    background-color: var(--vp-c-bg);
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    border: 1px solid #eee;
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

        &:hover {
            background-color: #eee;
        }
    }

    .drop-down {
        width: 60px;
        height: 26px;
        padding: 0 6px;

        &:hover {
            background-color: #eee;
        }

        .el-dropdown-link {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            outline: none;
            color: black;
        }
    }
}

:deep(.el-dropdown-menu__item) {
    padding-left: 30px !important;
    padding-right: 30px !important;

    .el-dropdown-text {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
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
        background-color: #eee;
    }

    .el-dropdown-link {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        outline: none;
        color: black;
    }
}

.textalign-dropdown {
    // margin-right: 10px;
    padding: 0 6px;
    height: 26px;

    &:hover {
        background-color: #eee;
    }

    .el-dropdown-link {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        outline: none;
        color: black;
    }
}

:deep(.el-upload-list--text) {
    display: none;
}

.is-active {
    background-color: #eee !important;
}
</style>
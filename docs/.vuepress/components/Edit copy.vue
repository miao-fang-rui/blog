<script setup>
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref, reactive } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/display.css'
import htmlDocx from 'html-docx-fixed/dist/html-docx';
import saveAs from 'file-saver';

const dialogVisible = ref(false)
const dialogDownloadVisible = ref(false)
const divRef = ref();
let aiEditor = null;
const catalog = ref()
const catalogIsShow = ref(false)
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
    imgSrc: ''
})

window.addEventListener('scroll', (e) => {
    let header = document.getElementById('containerHeader');
    let stickyDiv = document.getElementById('containerCatalog');
    let headerHeight = header.offsetHeight;
    stickyDiv.style.top = headerHeight + 'px';
    stickyDiv.style.height = `calc(100vh - ${headerHeight}px)`
})

onMounted(() => {

    if(localStorage.getItem('ai-editor-set')){
        const articleLocalStorage = JSON.parse(localStorage.getItem('ai-editor-set'))
        article.title = articleLocalStorage.title
        article.imgSrc = articleLocalStorage.imgSrc
        article.prev.text = articleLocalStorage.prev.text
        article.prev.link = articleLocalStorage.prev.link
        article.next.text = articleLocalStorage.next.text
        article.next.link = articleLocalStorage.next.link
    }


    import('aieditor').then(({ AiEditor }) => {
        aiEditor = new AiEditor({
            element: divRef.value,
            placeholder: "开始写文章. . .",
            content: '',
            contentRetention: true,
            draggable: false,
            toolbarKeys: ["undo", "redo", "eraser",
                "|", "heading", "font-family", "font-size",
                "|", "bold", "italic", "underline", "strike", "link", "code", "subscript", "superscript", "hr", "todo",
                "|", "highlight", "font-color",
                "|", "align",
                "|", "bullet-list", "ordered-list", "indent-decrease", "indent-increase", "break",
                "|", "image", "quote", "code-block", "table",
                "|", "source-code", "printer",
                "|",
                {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"></path></svg>',
                    onClick: (event, editor) => settingHandle(event, editor),
                    tip: "设置",
                },
                {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path></svg>',
                    onClick: (event, editor) => saveHandle(event, editor),
                    tip: "保存",
                },
            ],
            // toolbarExcludeKeys: ["emoji", "brush", "font-family", "font-size", "line-height", "fullscreen", "ai"],
            textSelectionBubbleMenu: {
                enable: true,
                items: ["Bold", "Italic", "Underline", "Strike", "code"],
            },
            image: {
                allowBase64: true,
                defaultSize: 350,
                uploaderEvent: {
                    onSuccess: (file, response) => {
                        //监听图片上传成功
                        //注意：
                        // 1、如果此方法返回 false，则图片不会被插入到编辑器
                        // 2、可以在这里返回一个新的 json 给编辑器
                        console.log(file, response)
                        const code = {
                            "errorCode": 0,
                            "data": {
                                "src": article.imgSrc + file.name,
                                "alt": file.name,
                                "loading": false,
                                // "align": "center",
                                "width": "80%",
                                "height": "auto",
                                "class": "image-class",
                                // "data-src": `/public/产品/车载调度/报站器/TM5805/${file.name}`
                                "data-src": response.data.src
                            }
                        }
                        return code
                    },
                },
                bubbleMenuItems: ["AlignLeft", "AlignCenter", "AlignRight", 'Resize', "delete"]
            },
            onChange: (aiEditor) => {
                // 监听到用编辑器内容发生变化了，控制台打印编辑器的 html 内容...
                catalog.value = aiEditor.getOutline()
                // console.log(catalog.value)
            }
        })
    })
})

onUnmounted(() => {
    aiEditor && aiEditor.destroy()
})

const saveHandle = async(event, editor) => {
    if(article.title){
        dialogDownloadVisible.value = true
        // const content = aiEditor.getMarkdown();
        // console.log(content)
    }else{
        ElMessage({
            message: '请先设置文章标题!',
            type: 'error',
            plain: true,
        })
    }
    
}

const getMarkdownFile = () => {

    ElMessageBox.confirm('确认下载本页面文档 - [ ' + article.title + '.md'+ ' ], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        plain: true,
    })
        .then(() => {
            const content = aiEditor.getMarkdown();
            const frontpage = 
`---
sidebar: heading
prev:
  text: ${article.prev.text} 
  link: ${article.prev.link}
next:
  text: ${article.next.text} 
  link: ${article.next.link} 
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
            dialogVisible.value = false

        })
        .catch(() => {
            ElMessage({
                message: '取消下载!',
                type: 'error',
                plain: true,
            })

        })
}


const getWordFile = () => {
    
    ElMessageBox.confirm('确认下载本页面文档 - [ ' + article.title + '.docx'+ ' ], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        plain: true,
    })
        .then(() => {

            const html = aiEditor.getHtml();
            var converted = htmlDocx.asBlob(html);
            saveAs(converted, article.title + '.docx');

            ElMessage.success({
                message: '导出成功，请等待浏览器下载！',
                type: 'success',
                plain: true,
            })
            dialogVisible.value = false

        })
        .catch(() => {
            ElMessage({
                message: '取消下载!',
                type: 'error',
                plain: true,
            })

        })
}

const settingHandle = (event, editor) => {
    dialogVisible.value = true
}

const saveArticleSetting = () => {
    try{
        if(article.title !== ''){
            localStorage.setItem('ai-editor-set', JSON.stringify({
                'title': article.title,
                'imgSrc': article.imgSrc, 
                'prev':{ 'text': article.prev.text, 'link': article.prev.link },
                'next':{ 'text': article.next.text, 'link': article.next.link },
            }))
        }
        dialogVisible.value = false
    }catch{
        ElMessage({
            message: '文章参数设置失败!',
            type: 'warning',
            plain: true,
        })
    }

}

const goBack = () => {
    window.history.back();
}
</script>

<template>
    <ClientOnly>
        <div class="menuButtons">
            <div class="menu-item">
                <el-tooltip effect="dark" :content="catalogIsShow ? '打开目录' : '关闭目录'" placement="top">
                    <el-button link @click="catalogIsShow = !catalogIsShow">
                        <el-icon size="16">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20 22H6.5C4.567 22 3 20.433 3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM10 4V12L13.5 10L17 12V4H10Z">
                                </path>
                            </svg>
                        </el-icon>
                    </el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="返回上级" placement="top">
                    <el-button link @click="goBack">
                        <el-icon size="16">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z">
                                </path>
                            </svg>
                        </el-icon>
                    </el-button>
                </el-tooltip>
            </div>
        </div>
        <div ref="divRef">
            <div class="aie-container">
                <div class="aie-container-header" id="containerHeader"></div>
                <div class="aie-main">
                    <div class="aie-container-catalog hidden-sm-and-down" id="containerCatalog" v-show="!catalogIsShow">
                        <el-scrollbar class="catalog-contarner">
                            <div class="title">目录导航</div>
                            <div class="catalog">
                                <div v-for="c in catalog" class="level">
                                    <div v-if="c.level === 1" class="level-1"><a :href="`#${c.id}`">{{ c.text }}</a>
                                    </div>
                                    <div v-if="c.level === 2" class="level-2"><a :href="`#${c.id}`">{{ c.text }}</a>
                                    </div>
                                    <div v-if="c.level === 3" class="level-3"><a :href="`#${c.id}`">{{ c.text }}</a>
                                    </div>
                                    <div v-if="c.level === 4" class="level-4"><a :href="`#${c.id}`">{{ c.text }}</a>
                                    </div>
                                    <div v-if="c.level === 5" class="level-5"><a :href="`#${c.id}`">{{ c.text }}</a>
                                    </div>
                                    <div v-if="c.level === 6" class="level-6"><a :href="`#${c.id}`">{{ c.text }}</a>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                    <div class="main-container">
                        <div class="aie-container-main"></div>
                    </div>
                </div>
                <div class="aie-container-footer"></div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" draggable title="文章设置" width="600">
            <el-form :model="article" labelPosition="top">
                <el-form-item label="文章标题">
                    <el-input v-model="article.title" />
                </el-form-item>
                <el-form-item label="图片路径">
                    <el-input v-model="article.imgSrc" />
                    <el-alert show-icon type="info" :closable="false" style="margin-top: 6px" title="例: /产品/车载调度/车载机/TM8730/" />
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
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveArticleSetting">保存</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogDownloadVisible" draggable title="选择下载格式" width="600">
            <div class="download-buttons">
                <el-button class="download-btn" color="#626aef" plain @click="getMarkdownFile">
                    <el-icon size="20" class="download-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 13V18.585L14.8284 16.7574L16.2426 18.1716L12 22.4142L7.75736 18.1716L9.17157 16.7574L11 18.585V13H13ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"></path></svg>
                    </el-icon>
                    <span>下载makedown格式文件</span>
                </el-button>
                <el-button class="download-btn" color="#626aef" plain @click="getWordFile">
                    <el-icon size="20" class="download-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 13V18.585L14.8284 16.7574L16.2426 18.1716L12 22.4142L7.75736 18.1716L9.17157 16.7574L11 18.585V13H13ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"></path></svg>
                    </el-icon>
                    <span>下载word格式文件</span>
                </el-button>
            </div>
        </el-dialog>
    </ClientOnly>
</template>

<style lang="scss" scoped>
.download-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;

    .download-btn {
        height: 100px;
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.menuButtons {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;

    .menu-item {
        padding: 6px;
    }
}

:deep(.aie-container) {
    background-color: #eee;
    border: none;

    .aie-container-header {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid var(--aie-container-border);

        div {
            border-bottom: none;
        }
    }

    .aie-main {
        display: flex;
    }

    .aie-container-main {
        margin: 60px 0;
        min-height: 1200px;
        width: 80%;
        background-color: white;
        border: 1px solid #e0e0e0;
        padding: 40px;
        box-sizing: border-box;
    }

    .main-container {
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }

    .aie-container-catalog {
        width: 260px;
        position: sticky;
        flex: none;
        top: 0;
        overflow: auto;
        border-right: 1px solid #dbdbdb;

        .catalog-contarner {
            box-sizing: border-box;

            .title {
                border-bottom: 1px solid #dbdbdb;
                font-weight: bold;
                font-size: 18px;
                padding: 12px;
                margin: 0 10px;
                color: #5c5c5c;
            }

            .catalog {
                width: 100%;
                font-size: 14px;
                padding-left: 20px;
                padding-bottom: 20px;
                box-sizing: border-box;

            }

            .level {
                margin: 10px 0;

                &:last-child {
                    margin-bottom: 0;
                }

                a {
                    color: rgb(48, 48, 48);

                    &:hover {
                        color: #5e71ff;
                    }
                }

                .level-1 {
                    padding-left: 0;
                }

                .level-2 {
                    padding-left: 20px;
                }

                .level-3 {
                    padding-left: 40px;
                }

                .level-4 {
                    padding-left: 60px;
                }

                .level-5 {
                    padding-left: 80px;
                }

                .level-6 {
                    padding-left: 100px;
                }
            }


        }
    }

    .aie-container-footer {
        display: none;
    }
}
</style>
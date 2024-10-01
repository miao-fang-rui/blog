<script setup>
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus'

const divRef = ref();
let aiEditor = null;

onMounted(() => {
    //for ssr
    import('aieditor').then(({ AiEditor }) => {
        aiEditor = new AiEditor({
            element: divRef.value,
            placeholder: "输入内容...",
            content: '',
            draggable: false,
            toolbarKeys: ["undo", "redo", "eraser",
                "|", "heading",
                "|", "bold", "italic", "underline", "strike", "link", "code", "subscript", "superscript", "hr", "todo", "emoji",
                "|", "highlight", "font-color",
                "|", "align",
                "|", "bullet-list", "ordered-list", "indent-decrease", "indent-increase", "break",
                "|", "image", "video", "attachment", "quote", "code-block", "table",
                "|", "source-code", "printer",
                "|",
                {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"></path></svg>',
                    onClick: (event, editor) => {
                        //点击事件
                        console.log('setting')
                    },
                    tip: "设置",
                },
                {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path></svg>',
                    onClick: (event, editor) => saveHandle(event, editor),
                    tip: "保存",
                },
            ],
            toolbarExcludeKeys: ["emoji", "brush", "font-family", "font-size", "line-height", "fullscreen", "ai"],
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
                        // console.log(file)
                        const code = {
                            "errorCode": 0,
                            "data": {
                                "src": `/public/产品/车载调度/报站器/TM5805/${file.name}`,
                                "alt": file.name
                            }
                        }
                        return code
                    },
                },
                bubbleMenuItems: ["AlignLeft", "AlignCenter", "AlignRight", "delete"]
            },
        })
    })
})

onUnmounted(() => {
    aiEditor && aiEditor.destroy()
})

const saveHandle = (event, editor) => {

    const content = aiEditor.getMarkdown();
    console.log(content)

    ElMessageBox.confirm('确认下载本页面文档, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        plain: true,
    })
        .then(() => { })
        .catch(() => { })

}

// const getContent = () => {
//     const html = aiEditor.getMarkdown();
//     console.log(html)
// }
</script>

<template>
    <ClientOnly>
        <div ref="divRef" style="">
            <div class="aie-container">
                <div class="aie-container-header"></div>
                <div class="aie-container-main"></div>
                <div class="aie-container-footer"></div>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="scss" scoped>
:deep(.aie-container) {
    background-color: #eee;
    border: none;

    .aie-container-header {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: white;
        width: 100%;
    }

    .aie-container-main {
        min-height: 700px;
        width: 80%;
        background-color: white;
        margin: 40px auto;
        border: 1px solid #e0e0e0;
        padding: 40px;
        box-sizing: border-box;
    }

    .aie-container-footer {
        display: none;
    }
}
</style>
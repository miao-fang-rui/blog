<script setup>
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref } from "vue";

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
            toolbarExcludeKeys: ["emoji", "ai"],
            textSelectionBubbleMenu: {
                enable: true,
                items: ["Bold", "Italic", "Underline", "Strike", "code"],
            },
        })
    })
})

onUnmounted(() => {
    aiEditor && aiEditor.destroy()
})

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
        margin: 20px auto;
        border: 1px solid #e0e0e0;
        padding: 40px;
        box-sizing: border-box;
    }

    .aie-container-footer {
        display: none;
    }
}
</style>
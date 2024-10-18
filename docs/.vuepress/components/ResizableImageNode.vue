<script setup>
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
    updateAttributes: {
        type: Function,
        required: true,
    },
})

const isResizing = ref(false)
const resizableImg = ref(null)
const startX = ref(0)
const startY = ref(0)
const storeWidth = ref(0)
const storeHeight = ref(0)
const position = ref('')

const isDraggable = computed(() => {
    return this.node?.attrs?.isDraggable
})


onMounted(() => {

    resizableImg.value.addEventListener('mousedown', (e) => {
        startX.value = e.clientX
        startY.value = e.clientY
        storeWidth.value = e.target.clientWidth
        storeHeight.value = e.target.clientHeight
        isResizing.value = true;
    });

    // On mouse move, resize
    document.addEventListener('mousemove', (e) => {

        if (isResizing.value) {
            let x = e.clientX
            let y = e.clientY
            let distanceX = x - startX.value
            let distanceY = y - startY.value
            let width = 0
            let height = 0

            if (!position.value) return

            if (position.value === 'bottom right') {
                //右下角  
                width = storeWidth.value + distanceX
                height = storeHeight.value + distanceY
            } else if (position.value === 'top left') {
                //左上角
                width = storeWidth.value - distanceX
                height = storeHeight.value - distanceY
            } else if (position.value === 'top right') {
                //右上角
                width = storeWidth.value + distanceX
                height = storeHeight.value - distanceY
            } else if (position.value === 'bottom left') {
                //左下角
                width = storeWidth.value - distanceX
                height = storeHeight.value + distanceY
            }

            let imageWidth = 0,
                imageHeight = 0
            const ratio = storeWidth.value / storeHeight.value
            // // 选择移动距离大的方向
            if (Math.abs(distanceX) > Math.abs(distanceY)) {
                // 宽度变化为主
                imageWidth = width;
                imageHeight = width / ratio;
            } else {
                // 高度变化为主
                imageHeight = height;
                imageWidth = height * ratio;
            }

            requestAnimationFrame(() => {
                props.updateAttributes({ width: Math.round(imageWidth), height: Math.round(imageHeight) });
            });
        }

        else {
            let x = e.clientX
            let y = e.clientY
            //改变鼠标光标样式
            if (resizableImg.value) {
                const { top, left, bottom, right } = resizableImg.value?.getBoundingClientRect()

                if ((bottom - y < 20 && right - x < 20) || (x - left < 20 && y - top < 20)) {
                    resizableImg.value.style.cursor = 'nwse-resize'
                    if (bottom - y < 20) {
                        position.value = 'bottom right'
                        return
                    }
                    position.value = 'top left'


                    //左下角或右上角
                } else if ((y - top < 20 && right - x < 20) || (bottom - y < 20 && x - left < 20)) {
                    resizableImg.value.style.cursor = 'nesw-resize'
                    if (y - top < 20) {
                        position.value = 'top right'
                        return
                    }
                    position.value = 'bottom left'

                    //若都不是，鼠标光标为默认箭头样式
                } else {
                    resizableImg.value.style.cursor = ''
                    position.value = ''
                }
            }

        }
    });

    resizableImg.value.addEventListener('mouseup', (e) => {
        isResizing.value = false;
    });

    document.onmouseup = () => {
        //鼠标抬起时，重置isResizeing变量
        isResizing.value = false;
    }

})
</script>

<template>
    <node-view-wrapper class="img-container" :style="{ display: node.attrs.display || 'block' }">
        <img v-bind="node.attrs" :draggable="isDraggable" :data-drag-handle="isDraggable" ref="resizableImg" />
    </node-view-wrapper>
</template>

<style lang="scss" scoped>
.img-container {

    position: relative;
    // display: inline-block;


    // /* 使容器大小适应图片 */

    img {
        display: block;
        /* 防止图片下方有空隙 */
        resize: both;
        border: 3px solid transparent;
    }

    &.ProseMirror-selectednode img {
        border-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%235468FF' d='M2.5 2.5h25v25h-25z'/%3E%3Cpath d='M0 0v12h2V2h10V0H0zM0 30V18h2v10h10v2H0zM30 0H18v2h10v10h2V0zM30 30H18v-2h10V18h2v12z' fill='%235468FF'/%3E%3C/svg%3E") 12 / 12px / 0;
    }
}
</style>
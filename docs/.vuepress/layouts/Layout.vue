<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { ref } from 'vue'

const sideIsShow = ref(true)

const handleSide = () => {
  sideIsShow.value = !sideIsShow.value
  const vpThemeContainer = document.querySelector('.vp-theme-container')
  if(vpThemeContainer){
    vpThemeContainer.classList.toggle('no-sidebar')
  }
}
</script>

<template>
  <ParentLayout>
    <template #page-top>
      <div class="sidebar-btn">
        <el-icon class="btn" @click='handleSide'>
          <arrow-left-bold v-show="sideIsShow" />
          <arrow-right-bold v-show="!sideIsShow" />
        </el-icon>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="scss" scoped>
.sidebar-btn {
  position: fixed;
  display: flex;
  align-items: center;
  height: 100vh;

  .btn {
    padding: 5px;
    margin-left: 2px;
    color: var(--vp-c-border);
    border: 1px solid var(--vp-c-border);
    border-radius: 50%;

    &:hover {
      color: #5468ff;
      border-color: #5468ff;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 720px) {
  .sidebar-btn {
    display: none;
  }
}
</style>
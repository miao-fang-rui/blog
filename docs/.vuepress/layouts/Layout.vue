<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { ref } from 'vue'
import SettingIcon from '../icons/SettingIcon.vue'

const sideIsShow = ref(true)

const handleSide = () => {
  sideIsShow.value = !sideIsShow.value
  const vpThemeContainer = document.querySelector('.vp-theme-container')
  if(vpThemeContainer){
    vpThemeContainer.classList.toggle('no-sidebar')
  }
}

const handleTop = () => {
  const navbarContainer = document.querySelector('.theme-container')
    const vpNavbarContainer = document.querySelector('.vp-theme-container')
    if (navbarContainer) {
        navbarContainer.classList.toggle('no-navbar');
        const navbar = document.querySelector('.navbar')
        navbar.style.display = navbar.style.display === 'none' ? '' : 'none'
    }

    if (vpNavbarContainer) {
        vpNavbarContainer.classList.toggle('no-navbar');
        const vpNavbar = document.querySelector('.vp-navbar')
        vpNavbar.style.display = vpNavbar.style.display === 'none' ? '' : 'none'
    }
}

const handlePrint = () => {
  let printContent = document.querySelector('.theme-default-content')
  let windowContent = document.querySelector('#app');
  windowContent.innerHTML = printContent.innerHTML;
  window.print();
  window.location.reload();
}

const handleCommand = (command) => {
  
  switch(command){
    case 'print': handlePrint() ;break;
    case 'topMenu': handleTop();break;
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
    <template #page-bottom>
      <div class="right-btn">
        <el-dropdown placement="top" @command="handleCommand">
          <el-button class="more-btn" text bg circle><el-icon :size="20"><SettingIcon /></el-icon> </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="print">打印</el-dropdown-item>
              <el-dropdown-item command="topMenu">顶部菜单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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

.right-btn {
  position: fixed;
  bottom: 130px;
  right: 16px;

  .more-btn {
    padding: 24px;
  }
}

:deep(.el-button.is-text:not(.is-disabled):focus-visible){
  outline: none;
}

@media screen and (max-width: 720px) {
  .sidebar-btn {
    display: none;
  }
  .right-btn {
    display: none;
  }
}

@media screen and (min-width: 720px) and (max-width: 960px){
  .right-btn {
    bottom: 120px;
    .more-btn {
      padding: 20px;
    }
  }
}
</style>
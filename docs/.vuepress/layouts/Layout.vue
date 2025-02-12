<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { ref } from 'vue'
import SettingIcon from '../icons/SettingIcon.vue'
import Topbar from '../icons/Topbar.vue'
import Print from '../icons/Print.vue'

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
  const printContent = document.querySelector('.theme-default-content')
  const windowContent = document.querySelector('#app');
  if(printContent) {
    windowContent.innerHTML = printContent.innerHTML;
    window.print();
    window.location.reload();
  }
}

// const handleCommand = (command) => {
  
//   switch(command){
//     case 'print': handlePrint() ;break;
//     case 'topMenu': handleTop();break;
//   }
// }

const toggleTopBar = () => {
  handleTop()
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
        <!-- <el-dropdown placement="top" @command="handleCommand">
          <el-button class="more-btn" text bg circle><el-icon :size="20"><SettingIcon /></el-icon> </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="hidden-xs-only" command="print">打印</el-dropdown-item>
              <el-dropdown-item command="topMenu">顶部菜单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <el-popover placement="top"
          popper-style="min-width:20px; width:auto; border-radius: 10px; padding: 10px 2px;"
        >
          <template #reference>
            <el-button class="more-btn" text bg circle><el-icon :size="20"><SettingIcon /></el-icon> </el-button>
          </template>
          <template #default>
            <div>
              <el-tooltip content="显示/隐藏顶部菜单栏" placement="left" :show-after="300">
                <el-button class="tip-btn" text><el-icon :size="20" @click="toggleTopBar"><Topbar /></el-icon></el-button>
              </el-tooltip>
            </div>
            <div>
              <el-tooltip content="打印本页面文档" placement="left" :show-after="300">
                <el-button class="tip-btn" text><el-icon :size="20" @click=""><Print /></el-icon></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-popover>
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
    background-color: white !important;

    &:hover {
      color: #5468ff;
      border-color: #5468ff;
      cursor: pointer;
    }
  }
}


.tip-btn.is-text:not(.is-disabled){
  padding: 14px;
}

.tip-btn.is-text:not(.is-disabled):hover {
  color: #5468ff;
}

[data-theme='dark'] {
  .more-btn {
    background-color: rgb(36, 36, 36) !important;
  }

  .tip-btn.is-text:not(.is-disabled):hover {
    background-color: rgb(36, 36, 36);
    color: #5468ff;
  }
}

@media screen and (max-width: 720px) {
  .sidebar-btn {
    display: none;
  }

  .right-btn {
    bottom: 120px;

    .more-btn {
      padding: 18px;
    }
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
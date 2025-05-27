// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import './style.css'
import Login from '../components/Login.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { auth } from '../lib/auth'
import Product from '../components/Product.vue'
import ELImage from '../components/ELImage.vue'
import Carousel from '../components/Carousel.vue'
import BackTop from '../components/BackTop.vue'
import './css/style.css'
import './css/custom.css'


export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(BackTop)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Login', Login)
    app.component('Product', Product)
    app.component('ELImage', ELImage)
    app.component('Carousel', Carousel)
    app.component('BackTop', BackTop)
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // app.component('Layout', Layout)

    const backToTop = () => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      })
    }
    app.provide('backToTop', backToTop)

    // 路由守卫
    router.onBeforeRouteChange = (to) => {

      if (to === '/blog/login.html') return true

      auth.check()

      if (!auth.check()) {
        // 如果用户未登录，跳转到登录页面
        router.go('/blog/login.html')
        return false // 阻止路由跳转
      }

      // 如果用户已登录，允许路由跳转
      return true
    }

  }
} satisfies Theme

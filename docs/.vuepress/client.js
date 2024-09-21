import { defineClientConfig } from 'vuepress/client'
import Login from './components/Login.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { provide, reactive } from 'vue'
import Products from './components/Products.vue'
import Table from './components/Table.vue'
import Carousel from './components/Carousel.vue'


export default defineClientConfig({
    enhance({ app, router, siteData }) {

        // app.component("Login", Login)
        app.component('Products', Products)
        app.component('Table', Table)
        app.component('Carousel', Carousel)

        app.use(ElementPlus)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }

        if (typeof window !== "undefined") {
            // 在浏览器环境下执行 sessionStorage 相关操作

            router.beforeEach((to, from, next) => {
                const isLoggedIn = sessionStorage.getItem('token');
                if (to.path === '/login.html') {
                    if (isLoggedIn) {
                        return next(from.fullPath)
                    } else {
                        sessionStorage.removeItem('token')
                        return next()
                    }
                }

                if (!isLoggedIn) {
                    sessionStorage.removeItem('token')
                    return next({ path: '/login.html', replace: true })
                }

                next()
            
            })
        }
    },
    setup() {
        const lS = reactive({ u: 'admin', p: 'tmkj@123456' })
        provide('lS', lS)
    },
    rootComponents: [],
    layouts: {
        Login,
    }
})
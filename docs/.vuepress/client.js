import { defineClientConfig } from 'vuepress/client'
import Login from './components/Login.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { provide, reactive, ref } from 'vue'
import Products from './components/Products.vue'
import Article from './components/Article.vue'
import Table from './components/Table.vue'
import Carousel from './components/Carousel.vue'
import Edit from './components/Edit.vue'
import Layout from './layouts/Layout.vue'
import NotFound from './components/NotFound.vue'
//import Loading from './components/Loading.vue'


export default defineClientConfig({
    enhance({ app, router, siteData }) {

        app.component('Products', Products)
        app.component('Article', Article)
        app.component('Table', Table)
        app.component('Carousel', Carousel)

        app.use(ElementPlus)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }

        if (typeof window !== "undefined") {
            // 在浏览器环境下执行 sessionStorage 相关操作
            // const isLoading = ref(true)
            router.beforeEach((to, from, next) => {
                const token = sessionStorage.getItem('token');
                const isLoggedIn = !!token;
                if (to.path === '/login.html') {
                    if (isLoggedIn) {
                        // isLoading.value = false
                        return next(from.fullPath)
                    } else {
                        sessionStorage.removeItem('token')
                        // isLoading.value = false
                        return next()
                    }
                }

                if (!isLoggedIn && to.path !== '/login.html') {
                    sessionStorage.removeItem('token')
                    // isLoading.value = false
                    return next({ path: '/login.html', replace: true })
                }
                // isLoading.value = false
                next()
            
            })

            //router.afterEach(() => {
             //   isLoading.value = false 
            //})

            //app.provide('isLoading', isLoading)
        }
    },
    setup() {
        const lS = reactive({ u: 'admin', p: 'tmkj@123456' })
        provide('lS', lS)
    },
    //rootComponents: [Loading],
    layouts: {
        Login,
        Edit,
        Layout,
        NotFound
    }
})

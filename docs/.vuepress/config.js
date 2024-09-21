import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    base: '/blog/',
    
    docsRepo: 'https://github.com/miao-fang-rui/blog',
    docsBranch: 'main',
    docsDir: 'docs',
    head: [
        ['link', { rel: 'icon', href: '/images/logo.png' }],
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Tiamaes',
            description: 'Tiamaes Document center',
            selectLanguageName: 'English',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: '天迈科技',
            description: '天迈文档中心',
            selectLanguageName: '简体中文',
        },
    },
    theme: defaultTheme({
        // 默认主题配置
        hostname: 'https://tiamaes.blog.com',
        logo: '/images/logo.png',
        logoAlt: 'Tiamaes-logo',
        repo: 'https://github.com/miao-fang-rui/blog',
        locales: {
            '/': {
                selectLanguageName: 'English',
                selectLanguageText: 'Languages',
                toggleColorMode: 'day / night',
                navbar: [
                    {
                        text: 'Home',
                        link: '/',
                    },
                ],
                sidebar: {
                    '/': [
                        {
                            text: 'All Products',
                            children: ['/product/车载调度产品.md', '/product/智慧收银产品.md']
                        }
                    ],
                },
            },
            '/zh/': {
                selectLanguageName: '简体中文',
                selectLanguageText: '选择语言',
                toggleColorMode: '白天 / 黑夜',
                backToHome: '返回首页',
                prev: '上一篇文章',
                next: '下一篇文章',
                editLinkText: '编辑此页',
                lastUpdatedText: '最近更新',
                contributorsText: '贡献者列表',
                navbar: [
                    {
                        text: '首页',
                        link: '/zh/',
                    },
                    {
                        text: '产品列表',
                        link: '/zh/456.md'
                    },
                    {
                        text: '技术文档',
                        link: '/zh/123.md'
                    },
                    {
                        text: '文档列表',
                        children: [
                            {
                                text: '测试1',
                                link: '/zh/测试1.md'
                            }, 
                            {
                                text: '测试2',
                                link: '/zh/测试2.md'
                            }, 
                        ],
                    }
                ],
                sidebar: {
                    '/zh/': [
                        {
                            text: '所有产品',
                            children: ['/product/车载调度产品.md', '/product/智慧收银产品.md']
                        }
                    ],
                },
            }
        }
    })
})
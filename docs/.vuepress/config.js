import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
    bundler: viteBundler(),
    base: '/blog/',
    head: [
        ['link', { rel: 'icon', href: 'favicon.ico' }],
    ],
    plugins: [
        markdownImagePlugin({
            // 启用 figure
            figure: true,
            // 启用图片懒加载
            lazyload: true,
            // 启用图片标记
            mark: true,
            // 启用图片大小
            size: true,
        }),
        mdEnhancePlugin({
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 启用任务列表
            tasklist: true,
            // 启用导入支持
            include: true,
            // 开启组件支持
            component: true,
            // 启用脚注
            footnote: true,
            // 开启剧透
            spoiler: true,
            // Enable attrs support
            attrs: true,
            // 开启标记
            mark: true,
            // 启用自定义对齐
            align: true,
        }),
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
        logo: '/images/logo.png',
        logoAlt: 'Tiamaes-logo',
        docsRepo: 'https://github.com/miao-fang-rui/blog',
        docsBranch: 'main',
        docsDir: 'docs',
        sidebarDepth: 4,
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
                    {
                        text: 'Product List',
                        link: '/product/车载调度产品.md'
                    },
                    {
                        text: 'Technical Document',
                        link: '/article/车载调度产品.md'
                    },
                    {
                        text: 'Write Article',
                        link: '/zh/edit.md'
                    },
                ],
                sidebar: {
                    '/': [
                        {
                            text: 'All Products',
                            children: ['/product/车载调度产品.md', '/product/主动安全产品.md', '/product/智慧收银产品.md']
                        }
                    ],
                    '/article/': [
                        {
                            text: 'Technical Document',
                            children: [
                                {
                                    text: 'Vehicle Scheduling Products',
                                    link: '/zh/article/车载调度产品.md',
                                },
                                {
                                    text: 'Active Safety Product',
                                    link: '/zh/article/主动安全产品.md',
                                },
                                {
                                    text: 'Smart Cash Register Products',
                                    link: '/zh/article/智慧收银产品.md',
                                },
                            ]
                        }
                    ]
                },
            },
            '/zh/': {
                selectLanguageName: '简体中文',
                selectLanguageText: '选择语言',
                toggleColorMode: '白天 / 黑夜',
                notFound: [
                    '生活不易，我也叹气，要不刷新一下再继续？',
                    '如果我能够看到自己的内容，我想它一定充满忧伤，因为我把快乐都给了其他页面。',
                    '请给我点时间，我会想开的！',
                    '本想走到你心里，一不小心迷路了。',
                    '从前有座山，山里有座庙， 庙里有个页面，现在找不到了. . .',
                    '大师兄，页面被妖怪抓走了. . .',
                    '我生病了~正在诊断哦~乖乖等我!',
                ],
                backToHome: '返回首页',
                prev: '返回',
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
                        link: '/zh/product/车载调度产品.md'
                    },
                    {
                        text: '调试及维修',
                        link: '/zh/article/车载调度产品.md'
                    },
                    {
                        text: '写文章',
                        link: '/zh/edit.md'
                    },
                ],
                sidebar: {
                    '/zh/': [
                        {
                            text: '所有产品',
                            children: [
                                {
                                    text: '车载调度产品',
                                    link: '/zh/product/车载调度产品.md',
                                },
                                {
                                    text: '主动安全产品',
                                    link: '/zh/product/主动安全产品.md',
                                },
                                {
                                    text: '智慧收银产品',
                                    link: '/zh/product/智慧收银产品.md',
                                },
                            ]
                            
                        },
                    ],
                    '/zh/article/': [
                        {
                            text: '调试及维修',
                            children: [
                                {
                                    text: '车载调度产品',
                                    link: '/zh/article/车载调度产品.md',
                                },
                                {
                                    text: '主动安全产品',
                                    link: '/zh/article/主动安全产品.md',
                                },
                                {
                                    text: '智慧收银产品',
                                    link: '/zh/article/智慧收银产品.md',
                                },
                            ]
                        }
                    ]
                },
            }
        }
    })
})
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
    bundler: viteBundler(),
    base: '/blog/',
    plugins: [
        markdownImagePlugin({
            // 启用 figure
            // figure: true,
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
            head: [
                ['link', { rel: 'icon', href: 'favicon.ico' }],
            ],
        },
        '/zh/': {
            lang: 'zh-CN',
            title: '天迈科技',
            description: '天迈文档中心',
            selectLanguageName: '简体中文',
            head: [
                ['link', { rel: 'icon', href: 'favicon.ico' }],
            ],
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
                    '生活或许充满挑战，但请相信，每一次跌倒都是为了更好地站起，每一次泪水都是成长的洗礼。',
                    '特别生气的时候也不要跟亲人、爱人说那些恶毒的话，说过的话是收不回的。',
                    '生活就像坐过山车，有高峰，也有低谷，这意味着，无论眼下是好是坏，都只是暂时的。',
                    '自由不是想干什么就干什么，而是不想干什么，就有能力不干什么。',
                    '无论正在经历什么，都请不要轻言放弃，因为从来没有一种坚持会被辜负。',
                    '与其嫉妒别人，不如用实际行动超越别人。',
                    '去见你想见的人，去做你想做的事，趁阳光正好，趁微风不燥，趁繁华还未开至荼靡，趁我们都还年轻。',
                    '在人生的舞台上，我们都是自己故事的主角。有时欢笑如歌，有时泪水涟涟，但正是这些情感的交织，构成了丰富多彩的人生画卷。',
                    '每天多一点点的努力，不为别的，只为了日后能够多一些选择，选择云卷云舒的小日子，选择自己喜欢的人。',
                    '若美好迟迟未发生也不要着急，最好的总会在不经意间出现，你的幸福只是姗姗来迟。而你只需努力，剩下的交给时光。'
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
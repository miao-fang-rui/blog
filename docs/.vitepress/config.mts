import { defineConfig } from 'vitepress'
import { generateSidebar } from './lib/sidebarGenerator'
import path from 'path'
import markdownItImsize from 'markdown-it-imsize'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ["link", { rel: "icon", href: "favicon.ico" }]
  ],
  base: "/blog/",
  title: "天迈科技",
  description: "Document Center",
  ignoreDeadLinks: true,
  // 国际化配置-未启用
  // locales: {
  //   root: {
  //     label: 'Eng-lish',
  //     lang: 'en',
  //     title: "Tiamaes",
  //   },
  //   zh: {
  //     label: '简体中文',
  //     lang: 'zh-CN', 
  //     link: '/zh/',
  //     title: "天迈科技", 
  //   }
  // },
  markdown: {
    config(md) {
      md.renderer.rules.image = (tokens, idx) => {
        const token = tokens[idx]
        const src = token.attrGet("src")
        const alt = token.content
        const width = token?.attrGet('width')? token?.attrGet('width')+ 'px' : '100%';
        const height = token?.attrGet('height')? token?.attrGet('height')+ 'px' : '100%';
        
        return `<ELImage 
                  src="${src}" 
                  alt="${alt}" 
                  title="${alt}"
                  width="${width}"
                  height="${height}"
                />`
      }
      md.use(markdownItImsize)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo/logo.png",
    outline: {
      level: [2, 6],
      label: "目录",
    },

    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // 主题
    darkModeSwitchLabel: "主题",
    // 悬停时切换主题的提示
    lightModeSwitchTitle: "切换为浅色模式",
    darkModeSwitchTitle: "切换为深色模式",
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    // 搜索
    search: {
      provider: "local",
    },
    // 页脚
    footer: {
      message: "本文档内容版权归 Mr.miao 所有，保留所有权利。",
      copyright: "Copyright © 2025-present Mr.miao.",
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '编辑此页'
    },
    // 文档的最后更新时间
    lastUpdated: {
      text: "最近更新",
      formatOptions: {
          dateStyle: "full",
          timeStyle: "medium",
        },
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '产品列表', link: '/产品列表/车载调度' },
      { text: '技术文档', link: '/api-examples' },
    ],
    // 侧边栏
    sidebar: generateSidebar(path.resolve(__dirname, '../产品列表')) || [],

    // sidebar: [
    //     {
    //       text: '产品列表',
    //       collapsed: false,
    //       items: [
    //         { 
    //           text: '车载调度', 
    //           link: '/产品列表/车载调度', 
    //           items: [
    //             { 
    //               text: '报站器', 
    //               items: [
    //                 { text: 'TM5805', link: '/产品列表/车载调度/报站器/TM5805' },
    //               ]
    //             },
    //             { 
    //               text: '车载机', 
    //               items: [
    //                 { text: 'TM8706', link: '/产品列表/车载调度/车载机/TM8706' },
    //                 { text: 'TM8707', link: '/产品列表/车载调度/车载机/TM8707' },
    //               ]
    //             },
    //           ]
    //         },
    //         { text: '主动安全', collapsed: true, link: '/产品列表/主动安全', items: []},
    //         { text: '智慧收银', link: '/产品列表/车载调度/TM8707', items: []},
    //       ]
    //     },
    //   ],

    notFound:{ // 404页
      title: '未找到页面，迷路了~',
      quote: '请检查地址是否正确，或当前页面未开通，点击下方按钮返回首页',
      linkText: '返回首页'
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})

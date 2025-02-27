export const imgToElImgPlugin = (options) => (app) => ({
    name: 'vuepress-plugin-imgToElImg',
    extendsMarkdown: (md) => {
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const src = '/blog/'+ token.attrGet('src')
            const width = token?.attrGet('width') + 'px'
            const height = token?.attrGet('height') + 'px'
            const alt = token.content

            return `<el-image src="${src}" 
                alt="${alt}" 
                title="${alt}"
                lazy
                :style="{width: '${width}', height: '${height}'}"
                :zoom-rate="1.2" 
                :max-scale="7" 
                :min-scale="0.2"
                hide-on-click-modal
                :preview-src-list="['${src}']" />`
        }
    }
})
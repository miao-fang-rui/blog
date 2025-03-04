export const imgToElImgPlugin = (options) => (app) => ({
    name: 'vuepress-plugin-imgToElImg',
    extendsMarkdown: (md) => {
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const src = '/blog/'+ token.attrGet('src')
            const width = token?.attrGet('width')? token?.attrGet('width')+ 'px' : '100%';
            const height = token?.attrGet('height')? token?.attrGet('height')+ 'px' : '100%';
            const alt = token.content

            return `<ElImageI18n 
                        src="${src}" 
                        alt="${alt}"
                        title="${alt}"
                        width="${width}"
                        height="${height}"
                    />`

            // return `<el-image src="${src}" 
            //     alt="${alt}" 
            //     title="${alt}"
            //     fit="contain" 
            //     :z-index="100000"
            //     :style="{maxWidth: '${width}', height: '${height}'}"
            //     :zoom-rate="1.2" 
            //     :max-scale="7" 
            //     :min-scale="0.2"
            //     hide-on-click-modal
            //     :preview-src-list="['${src}']">
            //         <template #placeholder>
            //             <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;background: var(--el-fill-color-light);color: var(--el-text-color-secondary);font-size: 14px;">
            //                 <el-icon class="is-loading">
            //                     <Loading />
            //                 </el-icon>    
            //                 <span style="margin: 0 4px;color:var(--el-text-color-placeholder);">加载中</span>
            //                 <span style="animation: dot 2s infinite steps(3, start); overflow: hidden;">...</span>
            //             </div>
            //         </template>
            //         <template #error>
            //             <div :style="{ width: '200px', height: '${height === '100%'? '200px': height}' }" style="display: flex;justify-content: center;align-items: center;background: var(--el-fill-color-light);color: var(--el-text-color-secondary);font-size: 14px;">
            //                 <span>加载失败</span>
            //             </div>
            //         </template>
            //     </el-image>`
        }
    }
})

import fs from 'fs'
import path from 'path'

export function generateSidebar(rootPath) {

    const pathParts = rootPath.split(path.sep)
    const pathHead = pathParts.slice(pathParts.length - 1, ).join(path.sep)


    const processDirectory = (dirPath) => {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true })
            .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))

        return entries.reduce((acc, entry) => {
            const fullPath = path.join(dirPath, entry.name)
            const relPath = path.relative(rootPath, fullPath)

            if (entry.isDirectory()) {
                const children = processDirectory(fullPath)
  
                if (children.length > 0) {
                    acc.push({
                        text: entry.name,
                        collapsed: true,
                        items: children
                    })
                }
            } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
                const isHave = acc.filter(item => item.text === entry.name.replace('.md', ''))

                if (isHave.length > 0) {
                    acc.forEach(item => {
                        if (item.text === entry.name.replace('.md', '')) {
                            item.link = `/${pathHead}/${relPath.replace(/\\/g, '/').replace('.md', '')}`
                            item.collapsed = true
                        }
                    })
                }else{
                    
                    acc.push({
                        text: entry.name.replace('.md', ''),
                        link: `/${pathHead}/${relPath.replace(/\\/g, '/').replace('.md', '')}`
                    })
                }
            }
            
            return acc
        }, [])
    }

    return [{
        text: '产品列表',
        collapsed: false,
        items: processDirectory(rootPath)
    }]
}

import Image from '@tiptap/extension-image'

export const CustomImage = Image.extend({
    addNodeView() {
        return () => {
            const container = document.createElement('div')

            container.addEventListener('click', (event) => {
                alert('clicked on the container')
            })

            const content = document.createElement('div')
            container.append(content)

            return {
                dom: container,
                contentDOM: content,
            }
        }
    },
})
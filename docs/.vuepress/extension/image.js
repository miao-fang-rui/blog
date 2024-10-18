import Image from '@tiptap/extension-image';
import { Node, mergeAttributes } from '@tiptap/core'
import ResizableImageNode from '../components/ResizableImageNode.vue';
import { VueNodeViewRenderer } from '@tiptap/vue-3'

const ResizableImage = Node.create({
    name: 'ResizableImage',
    group: 'block',
    draggable: true,

    addOptions() {
        return {
            types: ["image"],
            HTMLAttributes: {},
            width: '',
            height: '',
            display: ''
        }
    },

    addAttributes() {
        return {
            src: {},
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                // default: '100%',
                renderHTML: (attributes) => {
                    return {
                        width: attributes.width
                    };
                }
            },
        
            height: {
                // default: 'auto',
                renderHTML: (attributes) => {
                    return {
                        height: attributes.height
                    };
                }
            },
        
            isDraggable: {
                default: true,
                // We don't want it to render on the img tag
                renderHTML: (attributes) => {
                    return {};
                }
            },
            display: {
                // default: 'null',
                renderHTML: (attributes) => {
                    return {
                        display: attributes.display
                    };
                }
            }
        }
    },

    renderHTML({ node, HTMLAttributes }) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addCommands() {
        return {
            setImage: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
            setDisplay: inlineOrBlock => ({ commands }) => {
                return commands.updateAttributes({ display: inlineOrBlock })
            },
            toggleResizable:() => ({ tr }) => {
                const { node } = tr?.selection;
                if (node?.type?.name === 'ResizableImage') {
                    node.attrs.isDraggable = !node.attrs.isDraggable;
                }
            }
        }
    },


    addNodeView() {
        return VueNodeViewRenderer(ResizableImageNode)
    },
})

export default ResizableImage

// export default Image.extend({
//     name: 'ResizableImage',

//     addAttributes() {
//         return {
//             ...this.parent?.(),

//             width: {
//                 // default: '100%',
//                 renderHTML: (attributes) => {
//                     return {
//                         width: attributes.width
//                     };
//                 }
//             },
    
//             height: {
//                 // default: 'auto',
//                 renderHTML: (attributes) => {
//                     return {
//                         height: attributes.height
//                     };
//                 }
//             },
    
//             // We'll use this to tell if we are going to drag the image
//             // through the editor or if we are resizing it
//             isDraggable: {
//                 default: true,
//                 // We don't want it to render on the img tag
//                 renderHTML: (attributes) => {
//                     return {};
//                 }
//             }
//         }
//     },


//     addCommands() {
//         return {
//             ...this.parent?.(),
    
//             // New command that is going to be called like:
//             // this.editor.chain().focus().toggleResizable().run();
//             toggleResizable:
//                 () =>
//                 ({ tr }) => {
//                     const { node } = tr?.selection;
    
//                     if (node?.type?.name === 'ResizableImage') {
//                         node.attrs.isDraggable = !node.attrs.isDraggable;
//                     }
//                 }
//         }
//     },

//     addNodeView() {
//         return VueNodeViewRenderer(ResizableImageNode);
//     }
// })
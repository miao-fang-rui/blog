import { Extension } from '@tiptap/core'
import { MarkdownSerializer } from 'prosemirror-markdown'
import {
    blockquote,
    codeBlock,
    heading,
    horizontalRule,
    bulletList,
    orderedList,
    listItem,
    paragraph,
    image,
    ResizableImage,
    hardBreak,
    text,
    taskList,
    taskItem,
    table,

    italic,
    bold,
    underline,
    strike,
    link,
    code,
    subscript,
    superscript,
    highlight
} from './markdown/index'


const myMarkdownSerializer = new MarkdownSerializer({
    blockquote,
    codeBlock,
    heading,
    horizontalRule,
    bulletList,
    orderedList,
    listItem,
    paragraph,
    image,
    ResizableImage,
    hardBreak,
    text,
    taskList,
    taskItem,
    table
}, {
    italic,
    bold,
    underline,
    strike,
    link,
    code,
    subscript,
    superscript,
    highlight
});

const MarkdownOutputExtension = Extension.create({
    name: 'markdownOutput',

    addCommands() {
        return {
            outputMarkdown: () => ({ state, dispatch }) => {
                const markdown = myMarkdownSerializer.serialize(state.doc)
                return markdown
            }
        }
    }
})

export default MarkdownOutputExtension
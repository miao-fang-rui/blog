import { Extension } from '@tiptap/core'

const Indent = Extension.create({
  name: "indent",

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      minIndent: 0,
      maxIndent: 10,
    }
  },

  addStorage() {
    return {
      indent: 0,
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textIndent: {
            default: this.options.minIndent,
            parseHTML: element => {
              const textIndent = element.getAttribute('textIndent');
              // const indent = parseInt((element.style.textIndent).match(/\d+/), 10)
              // return indent
              return (textIndent ? parseInt((textIndent).match(/\d+/), 10) : 0) || 0;
            },
            renderHTML: attributes => {
              if (attributes.textIndent <= this.options.minIndent) {
                return {}
              }

              return { style: `text-indent: ${attributes.textIndent}em` }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent: () => ({ commands }) => {
        if(this.storage.indent < 10){
          this.storage.indent += 2
        }
        return this.options.types
        .map(type => commands.updateAttributes(type, { textIndent: `${this.storage.indent}` }))
        .every(response => response)  
      },

      outdent: () => ({ commands }) => {
        if(this.storage.indent > 0){
          this.storage.indent -= 2
        }
        return this.options.types
        .map(type => commands.updateAttributes(type, { textIndent: `${this.storage.indent}` }))
        .every(response => response) 
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent(),
    };
  },
})

export { Indent }

export default Indent
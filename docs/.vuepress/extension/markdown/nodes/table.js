export default function table(state, node) {
    state.inTable = true;
    node.forEach((row, p, i) => {
        state.write('| '); 
        row.forEach((col, p, j) => {
            if (j) {
                state.write(' | ');
            }

            col.content.content.forEach(item => {
                if(item.type.name === "ResizableImage"){
                    let widthHeight = ''
                    if(item.attrs?.width || item.attrs?.height){
                        widthHeight = `=${item.attrs?.width? item.attrs?.width: ''}x${item.attrs?.height? item.attrs?.height: ''}` 
                    }else{
                        widthHeight = ''
                    }
                    
                    state.write("![" + state.esc(item.attrs.alt || "") + "](" + item.attrs.src.replace(/[\(\)]/g, "\\$&") +
                        (item.attrs.title ? ' "' + item.attrs.title.replace(/"/g, '\\"') + '"' : "") + " "+ widthHeight + ")");
                }else{
                    if(item.textContent.trim()){
                        state.renderInline(item);
                    }
                }
            })
        });
        state.write(' |')
        state.ensureNewLine();
        if (!i) {
            const delimiterRow = Array.from({ length: row.childCount }).map(() => '---').join(' | ');
            state.write(`| ${delimiterRow} |`);
            state.ensureNewLine();
        }
    });
    state.closeBlock(node);
    state.inTable = false;
}
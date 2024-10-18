export default function table(state, node) {
    state.inTable = true;
    node.forEach((row, p, i) => {
        state.write('| ');
        row.forEach((col, p, j) => {
            if (j) {
                state.write(' | ');
            }
            const cellContent = col.firstChild;
            if (cellContent.type.name === "paragraph") {
                if(cellContent.textContent.trim()){
                    state.renderInline(cellContent);
                }
            }
            if(cellContent.type.name === "ResizableImage"){
                let widthHeight = ''
                if(cellContent.attrs?.width || cellContent.attrs?.height){
                    widthHeight = `=${cellContent.attrs?.width? cellContent.attrs?.width: ''}x${cellContent.attrs?.height? cellContent.attrs?.height: ''}` 
                }else{
                    widthHeight = ''
                }
                
                state.write("![" + state.esc(cellContent.attrs.alt || "") + "](" + cellContent.attrs.src.replace(/[\(\)]/g, "\\$&") +
                    (cellContent.attrs.title ? ' "' + cellContent.attrs.title.replace(/"/g, '\\"') + '"' : "") + " "+ widthHeight + ")");
            }
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
export default function ResizableImage(state, node, extension) {

    let widthHeight = ''
    if(node.attrs?.width || node.attrs?.height){
        widthHeight = `=${node.attrs?.width? node.attrs?.width: ''}x${node.attrs?.height? node.attrs?.height: ''}` 
    }else{
        widthHeight = ''
    }

    state.write("![" + state.esc(node.attrs.alt || "") + "](" + node.attrs.src.replace(/[\(\)]/g, "\\$&") +
                    (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : "") + " "+ widthHeight + ")" + "\n");

    // state.write("![" + state.esc(node.attrs.alt || "") + "](" + node.attrs.src.replace(/[\(\)]/g, "\\$&") +
    //     (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : "") + ")" + "\n");

    state.write("\n");
}
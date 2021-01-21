ehhAppOutput = document.createElement('ehhOutput');

var temp = new Entity(actionEditor, ehhAppOutput);
//newBlock = Entity.create(actionEditor.actionEditorBlock,temp.entity)
//console.log(newBlock)
//console.log(temp.entity)
document.getElementsByTagName('body')[0].appendChild(temp.entity);
console.log("all set and done");
//console.log(temp.output);

window.onload = () => {
    const model = new Entity(temp, null),
        view = new EntityView(model, {
            'buttons': document.getElementsByTagName('toolbar')[0].children,
            'editor': document.getElementsByTagName('ehhoutput')[0].children[1],
            'document': document,
            'bottom': document.getElementsByTagName('bottombar')[0].children
        }),
        controller = new process(view, model);
}


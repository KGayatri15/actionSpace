// all the json definations / object to be save in seperate folder called Json. Hence this to be moved.
var actionEditor = {
    style: '/*min-height : 200px;*/ width: max-content; border-top: 0px; padding: 21px; overflow: auto; display:grid',
    toolBar: [
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-right"></i>',
            'data-cmd': 'justifyRight'
        },
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-left"></i>',
            'data-cmd': 'justifyLeft'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-center"></i>',
            'data-cmd': 'justifyCenter'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-align-justify"></i>',
            'data-cmd': 'justifyFull'
        },
        {
            name: 'button',
            type: 'button',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-bold"></i>',
            'data-cmd': 'Bold'
        },
        {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-italic"></i>',
            "data-cmd": 'italic'

        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-underline"></i>',
            "data-cmd": 'underline'

        },
        {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-list-ul"></i>',
            "data-cmd": 'insertUnorderedList'

        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-list-ol"></i>',
            "data-cmd": 'insertOrderedList'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-link"></i>',
            "data-cmd": 'createLink'
        }, {

            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-code"></i>',
            "data-cmd": 'showCode'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-redo"></i>',
            "data-cmd": 'redo'
        }, {
            name: 'button',
            type: "button",
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-undo"></i>',
            "data-cmd": 'undo'
        }
    ],
    actionEditorBlock: [
        {
            name: 'div',
            class: 'actionEditor-block',
            id: 'actionEditor-block',
            lineNumbers: true,
            //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
            //output: ['self', 'output'],
            state: 'idle',
            divBlock: [
                {
                    name: 'div',
                    contentEditable: true,
                    class: 'div-block ',
                    lineNumbers: true,
                    innerText: "Write whatever you can think of...",
                    //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
                    //output: ['self', 'output'],
                    state: 'idle',
                },
            ]

        }

    ],
    bottomBar: [
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-heading  "></i>',
            'data-cmd': 'addHeading'
        },
        {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-paragraph"></i>',
            'data-cmd': 'para'
        }, {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-save"></i>',
            'data-cmd': 'save'
        }, {
            name: 'button',
            type: 'div',
            class: 'topbar-button',
            'innerHTML': '<i class="fas fa-sync"></i>',
            'data-cmd': 'reload'
        },{
        name:"input",
            accept:"application/json",
            type: 'file',
            "data-cmd":'loadJson'
        }
    ]
}
//this to be deleted and validated with attributes of live elements on runtime
var htmlAttributesList = ['name', 'label', 'onclick', 'lineNumbers', 'class', 'id', 'text', 'title', 'content', 'value', 'type', 'data-cmd']


class process extends entityController {

    constructor(ehhView, model) {
        super(ehhView, model);
        this.ehhView = ehhView
        this.model = model

    }


    static processReq(input, output, key, value) {
        console.log(input)
        if (operate.is(input) === 'Object') {
            // console.log("obj")
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'Array') {
            // console.log("arr")
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'String') {

            console.log('String >>>', key, value);
            //Entity.set(input,this.output,key,value);
        }
        return buffer;
    }

    static iterateObj(input, output) {
        for (var key in input) {
            const value = input[key];
            // console.log("found", key, input[key])
            if (operate.is(value) === 'Object') {
                // console.log("Object", output);
                var buffer = Entity.create(input, output, key);
                process.iterateObj(input[key], buffer, key, value)
                Entity.append(buffer, output);
            } else if (operate.is(value) === 'Array') {
                // console.log("foundArray", key)


                var buffer = Entity.create(input, output, key);
                process.iterateArr(input[key], buffer, key, value)
                Entity.append(buffer, output);
                // console.log('Array',key, value, buffer);
            } else if (operate.is(value) === 'String' || operate.is(value) === 'Boolean') {
                // console.log('String',key, value);
                Entity.set(input, output, key, value);
                //Entity.set(input,this.entity,key,value);
            }

        }
        // console.log('Iterate Objoutput',output)
        return output;
    }

    static iterateArr(input, output, key, value, callback, callbackClass) {
        //  console.log("Iterating Array", input, output, key, value);

        for (var i = 0; i < input.length; i++) {
            //console.log("Object found in array", input[i]);

            if (operate.is(input[i]) === 'Object') { //console.log("Object in array",response)

                var response = Entity.create(input[i], output, input[i].name);
                process.iterateObj(input[i], response, input[i].name,)
                Entity.append(response, output);

            } else if (operate.is(input[i]) === 'Array') { // console.log("found Array", key, input[key])

            } else if (operate.is(input[i]) === 'String') { //  console.log("found property, Set Attributes in output", key, input[key])

                // Entity.set(input,output,key,input[key])
            } else {

                console.log("stray found")
            }
            //console.log(callbackClass,callback)
            //   console.log(key, input[key])
            //var response = operate.isNotEmpty(callback) ? conductor.conduct(input, output, key, input[key], callback, callbackClass) : null;
            if (operate.isNotEmpty(callback)) {

                //  var response = conductor.conduct(input, output, key, input[key], callback, callbackClass);

            }
        }
        console.log("iterator Array response", response);
        return response;
    }

}



ehhAppOutput = document.createElement('ehhOutput');
//
// if (confirm('Load Last saved document')) {
//     // Save it!
//    actionEditor=JSON.parse(localStorage.dom);
//     console.log(JSON.parse(localStorage.dom))
// }

var temp = new Entity(actionEditor, ehhAppOutput);
//newBlock = Entity.create(actionEditor.actionEditorBlock,temp.entity)
//console.log(newBlock)
//console.log(temp.entity)
document.getElementsByTagName('body')[0].appendChild(temp.entity);
console.log("all set and done")
//console.log(temp.output);

window.onload = () => {
    const model = new Entity(temp, null),
        view = new EntityView(model, {
            'buttons': document.getElementsByTagName('toolbar')[0].children,
            'editor': document.getElementsByTagName('ehhoutput')[0].children[1],
            'document': document,
            'bottom': document.getElementsByTagName('bottombar')[0].children
        }),
        controller = new process(view, model)
}


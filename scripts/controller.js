class entityController {

    constructor(ehhView, model) {
        this._model = model
        this.ehhView = ehhView
        ehhView.on("createLink", cmd => this.createLink(cmd))
        ehhView.on("showCode", () => this.showCode())
        ehhView.on("other", command => this.otherActions(command))
        ehhView.on("addHeading", () => {
            this.addHeadingBlock()
        })
        ehhView.on("addPara", () => {
            this.addParaBlock()
        })
        ehhView.on("save", () => {
            this.save()
        })
        ehhView.on("reload", () => {
            this.reload()
        })
        ehhView.on("loadJson",(event)=>{
            openFile(event)
        })
    }

    createLink(cmd) {
        console.log(cmd)
        this.ehhView.updateDomContent(cmd)
    }

    showCode() {
        //TODO(send this to backend)
        alert('check Console')
        let htmlFromEditor = this.ehhView.getDomContent()
        console.log(this.ehhView.getDomContent())
    }

    otherActions(command) {
        this.ehhView.updateDomContent(command)
        console.log(`other ${command}`)

    }

    addHeadingBlock() {
        this.ehhView.updateDom("headingBlock")
    }

    addParaBlock() {
        this.ehhView.updateDom("paraBlock")

    }

    save() {
        saveToStorage()
    }

    reload() {
        // let myObject = JSON.parse(localStorage.dom);
        // console.log(myObject)

        const temp = new Entity(actionEditor, ehhAppOutput);
        document.getElementsByTagName('body')[0].appendChild(temp.entity);
        let editor = document.getElementsByTagName('ehhoutput')[0]
        editor.children[1].innerHTML=editor.children[4].innerHTML
        while (editor.children.length>3){
            editor.removeChild(editor.lastElementChild)
        }

    }
}
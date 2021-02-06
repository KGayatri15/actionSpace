class entityController {

    constructor(ehhView, model) {
        this._model = model;
        this.ehhView = ehhView;
        ehhView.on("createLink", cmd => this.createLink(cmd));
        ehhView.on("showCode", () => this.showCode());
        ehhView.on("other", command => this.otherActions(command));
        ehhView.on("addHeading", () => {
            this.addHeadingBlock();
        })
        ehhView.on("addPara", () => {
            this.addParaBlock();
        })
        ehhView.on("save", () => {
            this.save();
        })
        ehhView.on("reload", () => {
            this.reload();
        })
        ehhView.on("loadJson", (event) => {
            this.openFile(event);
        })
        ehhView.on('signup', () => {
            this.startSignUp()
        })
        ehhView.on('login', () => {
            this.startLogin()
        })
    }

    createLink(cmd) {
        console.log(cmd);
        this.ehhView.updateDomContent(cmd);
    }

    showCode() {
        //TODO(send this to backend)
        alert('check Console');
        let htmlFromEditor = this.ehhView.getDomContent();
        console.log(htmlFromEditor);
    }

    otherActions(command) {
        this.ehhView.updateDomContent(command);
        console.log(`other ${command}`);

    }

    addHeadingBlock() {
        this.ehhView.updateDom("headingBlock");
    }

    addParaBlock() {
        this.ehhView.updateDom("paraBlock");

    }

    save() {
        let storage = new storageHelper
        storage.saveToStorage()
    }

    reload() {

        const body = document.getElementsByTagName('body')[0];
        while (body.firstChild) {
            body.removeChild(body.firstChild)
        }

        loadActionEditor()
    }


    openFile(event) {
        let storage = new storageHelper
        storage.openFile(event)
    }

    startSignUp() {
        this.ehhView.renderSignUp()

    }

    startLogin() {
        this.ehhView.renderLoginForm()
    }

}
class process extends entityController {


    static processReq(input, output, key, value) {
        console.log(input);
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
                process.iterateObj(input[i], response, input[i].name);
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
class formController {
    constructor(view, model) {
        this.view = view
        this.model = model
        this.view.on('signup', (data) => {
            this.startSignUpFlow(data)
        })
        this.view.on('login', (data) => {
            this.startLoginFlow(data)
        })
    }
    checkCredetials(data) {
        console.log(localStorage.getItem(data.username))
        if (operate.isEqualStrict(localStorage.getItem(data.username),data.password))
           return true;
        return false;
    }
    checkUsernameExists(data){
        if(operate.isEqualStrict(localStorage.getItem(data.username),null)){
            return false;
        }else{
            return true;
        }
    }
    alertAbout(data){
        if(data.exist)
            alert("Username you typed in exists");
        else
            alert("This username doesn't exist");
    }
    setUsername(data){
        localStorage.setItem(data.username,data.password);
        return true;
    }
    renderEditor() {
        const body = document.getElementsByTagName('body')[0];
        while (body.firstChild) {
            body.removeChild(body.firstChild)
        }
        loadActionEditor()
    }
    startSignUpFlow(data) {
        var flow = new ActionEngine({
              actionSteps:[
                  {
                    actionStepIndex:1,
                    method:this.checkUsernameExists,
                    state:states[0.],
                    arguments:data,
                  },
                  {
                    actionStepIndex:2,
                    method:this.alertAbout,
                    state:states[0.],
                    condition:{
                        completedActionSteps:[1],
                        compare:[
                            {
                                value:1,
                                equal:true
                            },
                        ]
                    },
                    required:{
                        "exist":1
                    }
                  },
                  {
                    actionStepIndex:3,
                    method:this.setUsername,
                    state:states[0.],
                    arguments:data,
                    condition:{
                        completedActionSteps:[1],
                        compare:[
                            {
                                value:1,
                                equal:false
                            },
                        ]
                    },
                  },
                  {
                    actionStepIndex:4,
                    method:this.renderEditor,
                    state:states[0.],
                    condition:{
                        completedActionSteps:[1,3],
                    },
                  }
              ]
        })
        
    }
    startLoginFlow(data){
        var flow = new ActionEngine({
            actionSteps:[
                {
                    actionStepIndex:1,
                    method:this.checkCredetials,
                    state:states[0.],
                    arguments:data,
                },
                {
                    actionStepIndex:2,
                    method:this.alertAbout,
                    state:states[0.],
                    condition:{
                        completedActionSteps:[1],
                        compare:[
                            {
                                value:1,
                                equal:false
                            },
                        ]
                    },
                    required:{
                        "exist":1
                    }
                },
                {
                    actionStepIndex:3,
                    method:this.renderEditor,
                    state:states[0.],
                    condition:{
                        completedActionSteps:[1],
                        compare:[
                            {
                                value:1,
                                equal:true
                            }
                        ]
                    },
                }
            ]
        })
    }
}

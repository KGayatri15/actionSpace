var actionEditor = {
    style: 'min-height : 200px; width: 400px; border-top: 0px; padding: 21px; overflow: auto;',
    actionEditorBlock:{
        name:'div',
        contentEditable: true,
        class : 'actionEditor-block',
        id: 'actionEditor-block',
        lineNumbers: true,
        innerText:"Write whatever you can think of...",
        //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
        //output: ['self', 'output'],
        state: 'idle',
        
    },
    toolBar:[
        {   name:'button',
            type: 'div',
            'innerText':'add',
            'id':'add',
            'onclick' : 'console.log("addButtonClicked")'
        },
        {   name:'button',
            type: 'div',
            'innerText':'BTN',
            'onclick' : 'console.log("i was clicked")'
        },
        {   name:'button',
            type: 'button',
            'innerText':'BTN',
            'onclick' : 'console.log("i was clicked")'
        },
        {   name:'button',
            type: 'button',
            'innerText':'BTN',
            'onclick' : 'console.log("i was clicked")'
        },
        {   name:'button',
            type: 'button',
            'innerText':'BTN',
            'onclick' : 'console.log("i was clicked")'
        },
        
    ]
}
var htmlAttributesList = [ 'name','label','onclick','lineNumbers', 'class','id','text','title','content','value','type']
//create output
        //filter keys
        //filter values
        //append to output
        // getChild

class process{

    static processReq(input,output,key,value){   
        if(operate.is(input) === 'Object'){
            var buffer = process.iterateObj(input,output,key);
        } else if(operate.is(input)=== 'Array'){
            var buffer = process.iterateObj(input,output,key);
        } else if(operate.is(input) === 'String'){
            console.log('String >>>',key, value);
            //Entity.set(input,this.output,key,value);           
        }  
      return buffer;  
    }
    static iterateObj(input,output){
        for(var key in input){ var value = input[key];
           //console.log("found",key,input[key])
        if(operate.is(value) === 'Object'){
           // console.log("Object",output);
            var buffer = Entity.create(input,output,key);           
            process.iterateObj(input[key],buffer,key,value)
            Entity.append(buffer,output);
        } else if(operate.is(value)=== 'Array'){
            console.log("foundArray",key)
            var buffer = Entity.create(input,output,key);
            process.iterateArr(input[key],buffer,key,value)
            Entity.append(buffer,output);
           // console.log('Array',key, value, buffer);
        } else if(operate.is(value) === 'String' || operate.is(value) === 'Boolean'){
           // console.log('String',key, value);
            Entity.set(input,output,key,value);
            //Entity.set(input,this.entity,key,value);           
        }

    }
   // console.log('Iterate Objoutput',output)
    return output;
}
    static iterateArr(input, output, key, value, callback, callbackClass) { 
    //  console.log("Iterating Array", input, output, key, value);

      for (var i = 0; i < input.length; i++){
         //console.log("Object found in array", input[i]);

          if (operate.is(input[i]) === 'Object') { //console.log("Object in array",response)
           
            var response = Entity.create(input[i],output,input[i].name);
            process.iterateObj(input[i],response,input[i].name,)
            Entity.append(response,output);
             
          } else if (operate.is(input[i]) === 'Array') { // console.log("found Array", key, input[key])
             
          } else if (operate.is(input[i]) == 'String') { //  console.log("found property, Set Attributes in output", key, input[key])
            
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

class Entity {
    constructor(input,output){    
       this.entity = process.processReq(input,output);
       console.log(this);
    }
    static create(input, output, key, value,callback,callbackClass) {
        //  console.log('create request for ',output,key)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
            // var response = Object.create(output.constructor.prototype)
            var response = document.createElement(key);
           // Entity.set(input, response, 'id', key + entityIndex.next().value);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
         console.log("create request for ",input,output,key,value)     
         
         response = new Object()
        
            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if(value){
            //    process.iterateObj(value,response,key,value)
            }
           // entity.set(input, response, 'id', key + index.next().value);
        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            console.log("create request for ",input,output,key,value)     
            
            response = new Object()
           
               //response = key;
               //response.set(value,key)
               //var response = document.createElement(key);
               if(value){
               //    process.iterateObj(value,response,key,value)
               }
              // entity.set(input, response, 'id', key + index.next().value);
           }

        if(!response) console.log("no response", output);
        return response;
    }
    static append(input, output, key, value, callback, callbackClass) {
   // console.log('appending', input,output)

        if (operate.is(output).includes("HTML")) { //Only HTML creation
            var response = output.appendChild(input);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
           // console.log("append request for ",input,output)     
            output[key] = input;
            var response = output;   
            //var response = document.createElement(key);
            
            }
        if (operate.is(output).includes("Array")) { //Only HTML creation
                // console.log("append request for ",input,output)     
                 output.push(input);
                 var response = output;   
                 //var response = document.createElement(key);
                 
                 }
           


   // console.log('appended',response)
        return response;
    }
    static set(input, output, key, value, callback, callbackClass) {
       // console.log("setting",key, value,"in",output)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
          
           if(operate.isIn(key,htmlAttributesList)){
               //console.log("setting",key, value,"in",output)
                  output.setAttribute(key,value)
            //console.log(output);
           } else {
            //var buffer = output;
            output[key] = input[key];
            //buffer=output;

           }
           
        }
        return output;
    }
}


ehhAppOutput = document.createElement('ehhOutput');
var temp = new Entity(actionEditor,ehhAppOutput);
//newBlock = Entity.create(actionEditor.actionEditorBlock,temp.entity)
//console.log(newBlock)
//console.log(temp.entity)
document.getElementsByTagName('body')[0].appendChild(temp.entity);
console.log("all set and done")
//console.log(temp.output);
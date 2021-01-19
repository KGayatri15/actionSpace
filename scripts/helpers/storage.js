document.addEventListener("DOMContentLoaded", function () {
    AutoSave.start();
});


const AutoSave = (function () {

    const getEditorElement = () => document.getElementsByTagName("divblock")[0]
    let timer = null;

    //Save to local storage //
    function save() {
        const editorContent = document.getElementsByTagName('divblock')[0].innerHTML;
        if (editorContent) {
            localStorage.setItem('AutoSave' + document.location, editorContent);
        }
        const dir = getEditorElement().getAttribute("dir")
        localStorage.setItem('dirIsRtl', dir === "rtl");
    }

    //Load from local storage //

    function restore() {

        //get the content from local storage
        const savedContent = localStorage.getItem('AutoSave' + document.location);

        //if it found some
        if (savedContent) {
            //grab the editor
            document.getElementsByTagName('divblock')[0].innerHTML = savedContent;

        }

        const dirIsRtl = localStorage.getItem('dirIsRtl');
        getEditorElement().setAttribute("dir", JSON.parse(dirIsRtl) ? "rtl" : "ltr")
    }

    return {

        // Start Autosave function triggered in line 2 //

        start: function () {

            const editor = document.getElementsByTagName('divblock')[0];

            if (editor)
                restore();

            if (timer != null) {
                clearInterval(timer);
                timer = null;
            }

            timer = setInterval(save, 2000);
        },

        stop: function () {

            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    };


}());

// Clear All //

function clearStorage() {
    if (confirm("Are you sure you want to create a new text? This will erase all the content.")) {
        window.localStorage.clear();
        let content=document.getElementsByTagName("divblock")[0]

        while (content.hasChildNodes()) {
            content.removeChild(content.firstChild);
        }

        // location.reload();
    }
}

function saveToStorage() {
    let divArray = document.getElementsByTagName('divblock')[0].children

    let divObjectArray = []
    for (let i = 0; i < divArray.length; ++i) {
        let singleDiv = {
            name: 'div',
            contentEditable: true,
            class: 'div-block',
            lineNumbers: true,
            innerHTML: divArray[i].innerHTML,
            state: 'idle',
        }
        divObjectArray.push(singleDiv)
    }
    console.log(divObjectArray)
    actionEditor.actionEditorBlock[0].divBlock = divObjectArray
    localStorage.dom = JSON.stringify(actionEditor)
    saveToLocal();


}
function saveToLocal() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(actionEditor, null, 2)], {
        type: "application/json"
    }));
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log(actionEditor)
}
var openFile = function(event) {
    var input = event.target;
    console.log("her")
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        actionEditor=JSON.parse(text)
        console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
};
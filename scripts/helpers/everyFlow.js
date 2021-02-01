const states = Object.freeze({
    RUNNING: Symbol("running"),
    STARTED: Symbol("started"),
    FAILED: Symbol("failed"),
    STOPPED: Symbol("stopped"),
    COMPLETED: Symbol("completed")
})

class everyFlow {

    constructor(options) {
        this.options = options;
        this.currentState = states.RUNNING
        this.result = new Map()
        this.result[0]=this.options.param
        this.LastCompletedTask=0;
    }

     start(...functions) {
        this.onStart()

        for (let i = this.LastCompletedTask; i < functions.length; ++i) {

            if (this.currentState === states.STOPPED)
                break;


            try {
                this.result[i+1] = functions[i].call(this, this.result[i]);
                this.LastCompletedTask=i
            } catch (e) {
                this.onFailure(i, e, functions)
            }

            if (i === functions.length - 1) {
                this.currentState = states.COMPLETED;
                this.onComplete(i);
            }
        }


    }

    onComplete(taskIndex) {
        this.currentState = states.COMPLETED;
        console.log("Process Completed");
        return this.result[taskIndex];
    }

    onFailure(task, exception, ...functions) {


        console.error(`Error while executing task ${task} with exception ${exception}`);

        if (this.options.canBeReStarted === true) {
            this.currentState=states.RUNNING
            console.log(`Restarting task from task ${task}`);
            this.start(functions).then(r => {
                console.log("00f" +r);
            })
        } else if (this.options.autoRestartOnFailure === true) {
            this.start(functions).then(r => {
                console.log(r);
            })

        } else {
            this.currentState = states.FAILED
            console.log("Task Failed,please manually restart the workflow");
        }
    }

    onStart() {
        this.currentState = states.STARTED

    }

    stop() {
        this.currentState = states.STOPPED
    }

}


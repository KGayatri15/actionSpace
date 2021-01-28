const states = Object.freeze({
    RUNNING: Symbol("running"),
    STARTED: Symbol("started"),
    FAILED: Symbol("failed"),
    STOPPED: Symbol("stopped"),
    COMPLETED: Symbol("completed")
})

const options = {
    param: "one",
    canBeReStarted: true,
    autoRestartOnFailure: false,
};


class everyFlow {

    constructor(options) {
        this.options = options;
        this.currentState = states.RUNNING
        this.result = new Map()
        this.result[0] = this.options.param
        this.LastCompletedTask=0
    }

    async start(...functions) {
        this.onStart()

        for (let i = this.LastCompletedTask; i < functions.length; ++i) {


            if (this.currentState === states.STOPPED || this.currentState === states.FAILED)
                break;


            try {
                if (i === 2) {Z}else {
                    this.result[i + 1] = functions[i].call(this, this.result[i]);
                    this.LastCompletedTask++;
                }


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
        this.currentState = states.FAILED

        console.error(`Error while executing task ${task} with exception ${exception}`);
        this.LastCompletedTask=task
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


function printOne(param) {
    console.log("one>" + param);
    return "1";
}

function printTwo(param) {
    console.log("2>" + param);
    return "2";
}

function printThree(param) {
    console.log("3>" + param);
    return "3";
}

function printFour(param) {
    console.log("4>" + param);
    return "4"
}

const flow = new everyFlow(options);
flow.start(printOne, printTwo, printThree, printFour)

function stop() {
    flow.currentState = states.stop;
}

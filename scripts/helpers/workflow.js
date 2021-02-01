const states = Object.freeze({
    RUNNING: Symbol("running"),
    STARTED: Symbol("started"),
    FAILED: Symbol("failed"),
    STOPPED: Symbol("stopped"),
    COMPLETED: Symbol("completed")
})

class workflow{
    constructor(options){
        this.tasks = options.tasks
        this.currentState = states.STARTED
        this.input = options.input
        this.result = new Map()
        this.CompletedTasks=[]
        this.performTasks(this.tasks)
    }
    onRunning() {
        this.currentState = states.RUNNING;
    }
    performTasks(tasks){
        this.onRunning();
        for(var i = 0 ;i < tasks.length ;i++){
                if(this.currentState === states.STOPPED)
                    break;
                if(tasks[i]['dependent'] === null ||(tasks[i]['dependent']!== null && tasks[i]['equal'] === this.result[tasks[i]['dependent']-1])){
                    console.log("Task:- " + (i+1));
                    try{
                        this.result[i] = tasks[i]['task'].call(this,this.input);
                        this.CompletedTasks.push("Task"+(i+1));
                    }catch(exception){
                        this.onFailure(i,exception);
                    }
                }
                if (i === tasks.length - 1) {
                    this.currentState = states.COMPLETED;
                    this.onComplete(i);
                }
        }
        console.log(this.CompletedTasks);
    }
    onComplete(taskIndex) {
        this.currentState = states.COMPLETED;
        console.log("Process Completed");
        return this.result[taskIndex];
    }
    onFailure(taskIndex,exception){
        this.currentState = states.FAILED;
        console.log("An exception " + exception + " while performing the task " + taskIndex);
    }
    stop() {
        this.currentState = states.STOPPED;
    }
}
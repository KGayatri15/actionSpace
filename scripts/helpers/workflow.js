const states = Object.freeze({
    RUNNING: Symbol("running"),
    STARTED: Symbol("started"),
    FAILED: Symbol("failed"),
    STOPPED: Symbol("stopped"),
    COMPLETED: Symbol("completed")
})

class workflow{
    constructor(options){
        this.actionSteps = options.actionSteps
        this.currentState = states.STARTED
        this.result = new Map()
        this.actionStepsExecuted=[]
        this.executeActionSteps(this.actionSteps)
    }
    onRunning() {
        this.currentState = states.RUNNING;
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
    executeActionSteps(actionSteps){
        this.onRunning();
        for(var actionStep of actionSteps){
            if(this.currentState === states.STOPPED)
                break;
            var conditionExists;
            actionStep['condition'] === undefined?conditionExists= true:conditionExists=false;
            var checkSubset = conditionExists|| actionStep['condition']['completedActionSteps'] === undefined || this.checkSubset(this.actionStepsExecuted , actionStep['condition']['completedActionSteps']);
            var comparisonsCorrect = conditionExists|| actionStep['condition']['compare'] === undefined|| this.compareValues(actionStep['condition']['compare']);
            if(checkSubset && comparisonsCorrect){
                    var input, noinput = false;
                    if(actionStep['arguments'] === undefined &&actionStep['required'] === undefined )
                        noinput = true;
                    else if(actionStep['arguments'] === undefined)
                        input = this.includeArguments({},actionStep['required'])
                    else if(actionStep['required'] === undefined)
                        input = this.includeArguments(actionStep['arguments'],{})
                    else
                        input = this.includeArguments(actionStep['arguments'],actionStep['required'])
                    try{
                        if(noinput)
                            this.result[actionStep['actionStepIndex']] = actionStep['method'].call(this);
                        else
                            this.result[actionStep['actionStepIndex']] = actionStep['method'].call(this,input);
                        this.actionStepsExecuted.push(actionStep['actionStepIndex']);
                    }catch(exception){
                        this.onFailure(actionStep['actionStepIndex'],exception);
                    }
            }
            if(actionSteps[actionSteps.length -1] === actionStep){
                this.currentState = states.COMPLETED;
                this.onComplete(actionStep['actionStepIndex']);
            }
        }
        console.log(this.actionStepsExecuted);
    }
    includeArguments(arg,obj){
        for(var key in obj){
            arg[key] = this.result[obj[key]];
        }
        return arg;
    }
    checkSubset(arrA,arrB){
        var check = true;
        if(arrB !== undefined && arrB.length > 0){
            console.log(arrA + "+++" + arrB);
            for(var no of arrB){
                console.log(arrA.includes(no) + ":: " + no);
               if(!arrA.includes(no))check = false;
            }
        }
        console.log(" Is completedActionSteps the subset of actionStepsExecuted " + check);
        return check;
    }
    compareValues(comparisons){
        var count = 0;
        for(let comparison of comparisons){
            //find it's equal or type or whatever compare it with value if yes increase count else not
            if(comparison.hasOwnProperty("equal")&& comparison['equal'] === this.result[comparison['value']]){
               console.log("Equal comparison done");
                count++;
            }else if(comparison.hasOwnProperty("type") && comparison['type'] === typeof(this.result[comparison['value']])){
                console.log("Type checked");
                count++;
            }
        }
        if(count === comparisons.length)
            return true;
        return false;
    }
}
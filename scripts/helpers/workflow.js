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
    onComplete() {
        this.currentState = states.COMPLETED;
        console.log("Process Completed");
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
            if(operate.isEqualStrict(this.currentState,states.STOPPED))
                break;
            var conditionExists = operate.isEqualStrict( actionStep['condition'],undefined);
            var checkSubset = conditionExists|| operate.isEqualStrict(actionStep['condition']['completedActionSteps'],undefined) || operate.hasAllof(actionStep['condition']['completedActionSteps'],this.actionStepsExecuted);
            var comparisonsCorrect = conditionExists|| operate.isEqualStrict(actionStep['condition']['compare'],undefined)|| this.compareValues(actionStep['condition']['compare']);
            if(checkSubset && comparisonsCorrect){
                    var input, noInput = false;
                    var argumentsExist = operate.isEqualStrict(actionStep['arguments'],undefined);
                    var requiredArgumentsExist = operate.isEqualStrict(actionStep['required'],undefined);
                    if(argumentsExist && requiredArgumentsExist )
                        noInput = true;
                    else if(argumentsExist)
                        input = this.includeArguments({},actionStep['required'])
                    else if(requiredArgumentsExist)
                        input = this.includeArguments(actionStep['arguments'],{})
                    else
                        input = this.includeArguments(actionStep['arguments'],actionStep['required'])
                    try{
                        if(noInput)
                            this.result[actionStep['actionStepIndex']] = actionStep['method'].call(this);
                        else
                            this.result[actionStep['actionStepIndex']] = actionStep['method'].call(this,input);
                        this.actionStepsExecuted.push(actionStep['actionStepIndex']);
                    }catch(exception){
                        this.onFailure(actionStep['actionStepIndex'],exception);
                    }
            }
            if(operate.isEqualStrict(actionSteps[actionSteps.length -1],actionStep)){
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
    compareValues(comparisons){
        var count = 0;
        for(let comparison of comparisons){
            //find it's equal or type or whatever compare it with value if yes increase count else not
            if(comparison.hasOwnProperty("equal")&& operate.isEqualStrict(comparison['equal'],this.result[comparison['value']])){
               console.log("Equal comparison done");
                count++;
            }else if(comparison.hasOwnProperty("type") && operate.isEqualStrict(comparison['type'],typeof(this.result[comparison['value']]))){
                console.log("Type checked");
                count++;
            }
        }
        if(operate.isEqualStrict(count,comparisons.length))
            return true;
        return false;
    }
}
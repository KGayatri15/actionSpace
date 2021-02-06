const states = Object.freeze({
    0.: Symbol(" ActionStep Started"),
    shunya: Symbol("Awaiting actionStep"),
    dot: Symbol("ActionStep in process"),
    e: Symbol("Error"),
    1: Symbol("ActionStep done")
})
class ActionEngine{
    constructor(options){
        this.actionSteps = options.actionSteps
        this.result = new Map()
        this.currentState,this.currentActionStep ;
        this.actionStepsExecuted=[]
        this.executeActionSteps(this.actionSteps)
    }
    ExecutingActionStep() {
        this.currentState = states.dot;
        this.updateActionStepState(this.currentState);
    }
    ActionStepDone() {
        this.currentState = states[1];
        this.updateActionStepState(this.currentState);
        console.log("Action Step" + +" Completed");
    }
    ActionStepError(ActionStepIndex,exception){
        this.currentState = states.e;
        this.updateActionStepState(this.currentState);
        console.log("An exception " + exception + " while performing the task " + ActionStepIndex);
    }
    updateActionStepState(state){
        this.currentActionStep['state'] = state;
    }
    executeActionSteps(actionSteps){
        for(var actionStep of actionSteps){
            this.currentState = actionStep['state'];this.currentActionStep = actionStep;
            if(operate.isEqualStrict(this.currentState,states.shunya))
                console.log("Waiting");
            var conditionExists = operate.isEqualStrict( actionStep['condition'],undefined);
            var checkSubset = conditionExists|| operate.isEqualStrict(actionStep['condition']['completedActionSteps'],undefined) || operate.hasAllof(actionStep['condition']['completedActionSteps'],this.actionStepsExecuted);
            var comparisonsCorrect = conditionExists|| operate.isEqualStrict(actionStep['condition']['compare'],undefined)|| this.compareValues(actionStep['condition']['compare']);
            if(checkSubset && comparisonsCorrect){
                    this.ExecutingActionStep();
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
                        this.ActionStepDone();
                    }catch(exception){
                        this.ActionStepError(actionStep['actionStepIndex'],exception);
                    }
            }
            if(operate.isEqualStrict(actionSteps[actionSteps.length -1],actionStep)){
                console.log("Execution of workflow is done");
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
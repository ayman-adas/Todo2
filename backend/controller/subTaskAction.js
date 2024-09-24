const { SubTaskActionReposotory } = require('../repository/subTaskAction/subTaskActionReposotory');
subTaskRepo = new SubTaskActionReposotory();
class SubTaskAction {
    createSubTaskAction = async (actionType, subTaskID, profileID ) => {
        // const { actionType, subTaskID, profileID } = req.body;
        const actionTime = new Date();
        console.log(actionType,"actiontype","profileid",profileID,"subtask",subTaskID)
        await subTaskRepo.createSubTaskAction(actionType, actionTime,parseInt( profileID),parseInt(  subTaskID))
    
    };}
module.exports={SubTaskAction}
const { ISubTaskRepository } = require('./InterfaceSubTask')
const { MySql } = require('../../services/database');
const mysql = new MySql()
class SubTaskReposotory extends ISubTaskRepository {
    constructor() {
        super();
        this.mySql = new MySql();
    }

    async createSubTask(subTaskName, priority, isDone, taskID, startDate, endDate, ProfileID) {
        const sql = `INSERT INTO subTask (subTaskName,priority,isDone,taskID,startDate,endDate,ProfileID) VALUES (?, ?, ?,?, ?,?,?)`;
       const result= await mysql.query(sql, [subTaskName, priority, isDone, taskID, startDate, endDate, ProfileID],)
  return result

    }
 
    async retrieveSubTasksRelatedToTask(taskID) {
        var sql = `
        SELECT 
           *
        FROM
        task t
        INNER JOIN subTask s ON t.taskID = s.taskID where t.taskID= ? `;
        const result = await this.mySql.query(sql, parseInt(taskID));
        console.log(result);
        return result;
    }
   async UpdateIsDoneSubTask(SubtaskISDone, SubtaskID) {
    console.log("UpdateIsDoneSubTask",SubtaskID,SubtaskISDone)
        const sql = `UPDATE subtask SET IsDone = ? WHERE subTaskID = ? `;
        const result = await mysql.query(sql, [SubtaskISDone,SubtaskID])
        console.log(result)

    }
    async UpdateSubTaskName(SubTaskName, SubtaskID) {
        try {
            console.log("UpdateSubTaskName", SubtaskID, SubTaskName);
            const sql = `UPDATE subtask SET SubTaskName = ? WHERE subTaskID = ? `;
            const result = await mysql.query(sql, [SubTaskName, SubtaskID]);
            console.log("Update Result:", result);
        } catch (error) {
            console.error("Error updating SubTaskName:", error);
        }
    }
    
    async UpdateStartDateSubTask(StartDate, SubtaskID) {
        try {
            console.log("UpdateStartDateSubTask", SubtaskID, StartDate);
            const sql = `UPDATE subtask SET StartDate = ? WHERE subTaskID = ? `;
            const result = await mysql.query(sql, [StartDate, SubtaskID]);
            console.log("Update Result:", result);
        } catch (error) {
            console.error("Error updating StartDate:", error);
        }
    }
    
    async UpdatePrioritySubTask(Priority, SubtaskID) {
        try {
            console.log("UpdatePrioritySubTask", SubtaskID, Priority);
            const sql = `UPDATE subtask SET Priority = ? WHERE subTaskID = ? `;
            const result = await mysql.query(sql, [Priority, SubtaskID]);
            console.log("Update Result:", result);
        } catch (error) {
            console.error("Error updating Priority:", error);
        }
    }
    
    async UpdateEndDateSubTask(EndDate, SubtaskID) {
        try {
            console.log("UpdateEndDateSubTask", SubtaskID, EndDate);
            const sql = `UPDATE subtask SET EndDate = ? WHERE subTaskID = ? `;
            const result = await mysql.query(sql, [EndDate, SubtaskID]);
            console.log("Update Result:", result);
        } catch (error) {
            console.error("Error updating EndDate:", error);
        }
    }
    async deleteSubTask ( subTaskID) {
        console.log(subTaskID)
        var sql = `
    delete from subTask where subTaskID= ? `;
        const result = await mysql.query(sql, [ subTaskID],)
        return result

    }            

}
module.exports = { SubTaskReposotory }
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
        await mysql.query(sql, [subTaskName, priority, isDone, taskID, startDate, endDate, ProfileID],)


    }
 
    async retriveSubTasksReleaetedToTask (taskID) {
        var sql = `
        SELECT 
           *
        FROM
        task t
        INNER JOIN subTask s ON t.taskID = s.taskID where t.taskID= ? `;
        const result = await mysql.query(sql, parseInt(taskID),)
        console.log(result)
        return result
    }

}
module.exports = { SubTaskReposotory }
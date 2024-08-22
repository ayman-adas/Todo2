const { ITaskRepository } = require('./interfaceTask')
const { MySql } = require('../../services/database');
const mysql = new MySql()
class TaskReposotory extends ITaskRepository {
    async createTask({ taskName, taskDescription, taskImage, taskDueDate, ProjectID, taskCreated }) {
        const sql = `INSERT INTO task (taskName,taskDescription,taskImage,taskDueDate,taskStatus,ProjectID,TaskCreatedTime) VALUES (?,  ?,?, ?,false,?,?)`;
        const result = await mysql.query(sql, [taskName, taskDescription, taskImage, taskDueDate, ProjectID, taskCreated],)

        return result.insertId;
    }
    async insertTaskCollaborator({ profileEmail, taskID }) {
        const sql = `select Profileid from Profile where ProfileEmail =?`;
        await mysql.query(sql, ProfileEmail)

        const user = result[0];

        const sqlCollaborators = `INSERT INTO taskcollaborator (Profileid, taskID) VALUES (?, ?)`;
        mysql.query(sqlCollaborators, [user.Profileid, taskID])
    }
    async retrieveTaskCollaborators({ taskID }) {
        const sql = `select * from taskcollaborator where taskID =?`;

        const result = await mysql.query(sql, taskID,)
        return result
    }
    async retrievTasksCollaborating(profileId) {
        var sql = `
        SELECT 
           *
        FROM
        task P
        INNER JOIN taskcollaborator PC ON P.taskID = PC.taskID where PC.ProfileID= ? `;
        const result = await mysql.query(sql, profileId,)
        return result
    }
    async deleteTaskCollaborator(profileEmail, taskID) {
        var sql = `
    delete from taskcollaborator where ProfileID= ? AND taskID= ? `;
        const result = await mysql.query(sql, [ProfileID, taskID],)
        return result

    }
    async UpdateIsDoneTask(taskStatus, taskID) {
        const sql = `UPDATE task SET taskStatus = ? WHERE taskID = ? `;
      const result=  await mysql.query(sql, [taskStatus, taskID])
      return result
    }
    async retriveTasksReleaetedToProject(ProjectID) {
        var sql = `
        SELECT 
           *
        FROM
        task t
        INNER JOIN Project P ON P.projectID = t.projectID where P.ProjectID= ? `;
        const result = await mysql.query(sql,  parseInt(ProjectID),)
        return result
    }

}
module.exports = { TaskReposotory }
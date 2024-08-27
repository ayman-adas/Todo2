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
        console.log(profileEmail, taskID)
        const sql = `select Profileid from Profile where ProfileEmail =?`;
        const result = await mysql.query(sql, profileEmail)

        const user = result[0];

        const sqlCollaborators = `INSERT INTO taskcollaborator (Profileid, taskID) VALUES (?, ?)`;
        mysql.query(sqlCollaborators, [user.Profileid, taskID])
    }
    async retrieveTaskCollaborators({ taskID }) {
       // Step 1: Retrieve profileIDs
  const sqlProfiles = 'SELECT profileID FROM taskcollaborator WHERE taskID = ?';
  const profilesResult = await mysql.query(sqlProfiles, [taskID]);

  // Extract profileIDs
  const profileIDs = profilesResult.map(row => row.profileID);

  // Step 2: Retrieve profileEmails for each profileID
  if (profileIDs.length > 0) {
    // Create a placeholder for each profileID
    const placeholders = profileIDs.map(() => '?').join(',');
    const sqlEmails = `SELECT profileID, profileEmail FROM profile WHERE profileID IN (${placeholders})`;

    // Query for profileEmails
    const emailsResult = await mysql.query(sqlEmails, profileIDs);

    // Return the result
    return emailsResult;
  } else {
    // Handle the case where there are no profileIDs
    return [];
  }

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
    async deleteTaskCollaborator(ProfileID, taskID) {
        var sql = `
    delete from taskcollaborator where ProfileID= ? AND taskID= ? `;
        const result = await mysql.query(sql, [ProfileID, taskID],)
        return result

    }
    async deleteTask( taskID) {
        console.log(taskID)
        var sql = `
    delete from task where taskID= ? `;
        const result = await mysql.query(sql, [ taskID],)
        return result

    }
    async UpdateStatus(taskStatus, taskID) {
        const sql = `UPDATE task SET taskStatus = ? WHERE taskID = ? `;
        const result = await mysql.query(sql, [taskStatus, taskID])
        return result
    }
    async UpdateTaskName(taskName, taskID) {
        const sql = `UPDATE task SET taskName = ? WHERE taskID = ? `;
        const result = await mysql.query(sql, [taskName, taskID])
        return result
    }
    async UpdateTaskDesc(taskDesc, taskID) {
        const sql = `UPDATE task SET taskDescription = ? WHERE taskID = ? `;
        const result = await mysql.query(sql, [taskDesc, taskID])
        return result
    }
    async retriveTasksReleaetedToProject(ProjectID) {
        var sql = `
        SELECT 
           *
        FROM
        task t
        INNER JOIN Project P ON P.projectID = t.projectID where P.ProjectID= ? `;
        const result = await mysql.query(sql, parseInt(ProjectID),)
        return result
    }

}
module.exports = { TaskReposotory }
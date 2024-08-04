const { con } = require('../services/database');

const createTask = (req, res) => {
    const { taskName,taskDescription,taskImage,taskID,taskDueDate,ProfileID } = req.body;
    const currentDate = new Date();

    const sql = `INSERT INTO task (taskName,taskDescription,taskImage,taskID,taskDueDate,taskStatus,TaskCreatedTime) VALUES (?, ?, ?,?, ?,false,?)`;
    con.query(sql, [taskName,taskDescription,taskImage,taskID,taskDueDate,currentDate], (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        const taskID = result.insertId;

        const sqlCollaborators = `INSERT INTO taskcollaborator (taskID, ProfileID) VALUES (?, ?)`;
        con.query(sqlCollaborators, [taskID, ProfileID], (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "task and collaborators inserted successfully."
            });
        });
    });
};

const insertTaskCollabortor = (req, res) => {
    const { ProfileEmail, taskID } = req.body;

    const sql = `select Profileid from Profile where ProfileEmail =?`;
    con.query(sql, ProfileEmail, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        const user = result[0];

        const sqlCollaborators = `INSERT INTO taskcollaborator (Profileid, taskID) VALUES (?, ?)`;
        con.query(sqlCollaborators, [user.Profileid, taskID], (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "task and collaborators inserted successfully."
            });
        });
    });
}
const retriveTaskollabortor = (req, res) => {

    const { taskID } = req.body
    const sql = `select * from taskcollaborator where taskID =?`;

    con.query(sql, taskID, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: result
        });
    })
}

const retriveTasksCollaborate = (req, res) => {
    const { ProfileID } = req.body
    var sql = `
    SELECT 
       *
    FROM
       task P
    INNER JOIN taskcollaborator PC ON P.taskID = PC.taskID where PC.ProfileID= ? `;
    con.query(sql, ProfileID, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: result
        });
    })
}
const deleteTaskCollaborator = (req, res) => {
    const { ProfileID, taskID } = req.body
    var sql = `
    delete from taskcollaborator where ProfileID= ? AND taskID= ? `;
    con.query(sql, [ProfileID, taskID], (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: result
        });
    })
}
const UpdateIsDoneTask=(req,res)=>{
    const { taskStatus, taskID } = req.body

    const sql = `UPDATE task SET taskStatus = ? WHERE taskID = ? `;

    con.query(sql, [taskStatus, taskID], function (err, result) {
        if (err) res.status(400).json({
            success: false,
            message: err
        });
        console.log(result)
        if (result.length!=0) {
            res.status(200).json({
                success: true,
                message: 'sucsess'
            }); res.end();
        }
        else {
            res.status(200).json({
                success: false,
                message: "doesnt exist."
            }); res.end();
        }
    });
}
const retriveTasksReleaetedToProject=(req,res)=>{
    const { ProjectID } = req.query
    var sql = `
    SELECT 
       *
    FROM
       task t
    INNER JOIN Project P ON P.projectID = t.projectID where P.ProjectID= ? `;
    con.query(sql, ProjectID, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: result
        });
    })
}
module.exports = {
    createTask,insertTaskCollabortor,
    retriveTaskollabortor,retriveTasksCollaborate,retriveTasksReleaetedToProject,
    deleteTaskCollaborator,UpdateIsDoneTask
};


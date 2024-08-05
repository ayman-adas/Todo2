const { con } = require('../services/database');

const createTask = (req, res) => {
    const { taskName,taskDescription,taskImage,taskDueDate,ProjectID } = req.body;
    const currentDate = new Date();
    let formattedDueDate;

    try {
        // Split the date into parts
        const parts = taskDueDate.split(' ');
        if (parts.length !== 3) {
            throw new Error('Invalid date format');
        }
        
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        // Check if parts are valid numbers
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            throw new Error('Invalid date components');
        }

        // Format the date as YYYY-MM-DD
        formattedDueDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        // Check if the date is valid
        const dueDate = new Date(formattedDueDate);
        if (isNaN(dueDate.getTime())) {
            throw new Error('Invalid date');
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid taskDueDate: ' + error.message
        });
    }
    const sql = `INSERT INTO task (taskName,taskDescription,taskImage,taskDueDate,taskStatus,ProjectID,TaskCreatedTime) VALUES (?,  ?,?, ?,false,?,?)`;
    con.query(sql, [taskName,taskDescription,taskImage,formattedDueDate,ProjectID,currentDate], (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        const taskID = result.insertId;


            res.status(200).json({
                success: true,
                message: taskID
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


const { SubTaskReposotory } = require('../repository/SubTask//SubTaskReposotory');
const { subTaskRouter } = require('../routes/subTask');
subTaskRepo = new SubTaskReposotory();
class SubTask {
    createSubTask = async (req, res) => {
        const { subTaskName, priority, isDone, taskID, startDate, endDate, ProfileID } = req.body;

        await subTaskRepo.createSubTask(subTaskName, priority, isDone, taskID, startDate, endDate, ProfileID)
        res.status(200).json({
            success: true,
            message: "subtask and collaborators inserted successfully."
        });
    };
    insertTaskCollabortor = (req, res) => {
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
    retriveTaskollabortor = (req, res) => {

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

    retriveTasksCollaborate = (req, res) => {
        const { ProfileID } = req.body
        var sql = `
    SELECT 
       *
    FROM task P
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
    deleteTaskCollaborator = (req, res) => {
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
    UpdateIsDoneTask = (req, res) => {
        const { taskIsDone, taskID } = req.body

        const sql = `UPDATE task SET taskIsDone = ? WHERE taskID = ? `;

        con.query(sql, [taskIsDone, taskID], function (err, result) {
            if (err) res.status(400).json({
                success: false,
                message: err
            });
            console.log(result)
            if (result.length != 0) {
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
    retriveSubTasksReleaetedToTask =async (req, res) => {
        const { taskID } = req.query
const result=await subTaskRepo.retriveSubTasksReleaetedToTask(taskID)

        res.status(200).json({
            success: true,
            message: result
        });

    }
}
module.exports = {
    SubTask
}


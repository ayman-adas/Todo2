const { SubTaskReposotory } = require('../repository/SubTask//SubTaskReposotory');
const { subTaskRouter } = require('../routes/subTask');
const {SubTaskAction}=require('./subTaskAction')
const subTaskRepo = new SubTaskReposotory();
const subTaskAction = new SubTaskAction();

class SubTask {
    createSubTask = async (req, res) => {
        const { subTaskName, priority, taskID, startDate, endDate, ProfileID } = req.body;
        const [day, month, year] = startDate.split(' ');

        // JavaScript's Date constructor expects months to be zero-indexed (0 = January, 11 = December)
        const parsedDate = new Date(year, month - 1, day);
        const [day2, month2, year2] = endDate.split(' ');

        // JavaScript's Date constructor expects months to be zero-indexed (0 = January, 11 = December)
        const parsedDate2 = new Date(year2, month2 - 1, day2);
        
        const result = await subTaskRepo.createSubTask(subTaskName, priority, 0, taskID,parsedDate,parsedDate2, ProfileID)
        console.log(result)
        subTaskAction.createSubTaskAction("create subTask",ProfileID, result.insertId)
        res.status(200).json({
            success: true,
            message: result.insertId
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
    UpdateIsDoneSubTask = async (req, res) => {
        const { subTaskIsDone, subTaskID,ProfileID } = req.body
        console.log("subtask", subTaskIsDone, subTaskID)

        await subTaskRepo.UpdateIsDoneSubTask(subTaskIsDone, subTaskID)
        subTaskAction.createSubTaskAction("UpdateIsDoneSubTask",ProfileID, subTaskID)

        res.status(200).json({
            success: false,
            message: "doesnt exist."
        }); res.end();
    }
    UpdateEndDateSubTask = async (req, res) => {
        const { endDate, subTaskID,ProfileID } = req.body
        console.log("subtask", endDate, subTaskID)

        await subTaskRepo.UpdateEndDateSubTask(endDate, subTaskID)
        subTaskAction.createSubTaskAction("UpdateEndDateSubTask",ProfileID, subTaskID)

        res.status(200).json({
            success: false,
            message: "doesnt exist."
        }); res.end();
    }
    UpdatePrioritySubTask = async (req, res) => {
        const { priority, subTaskID,ProfileID } = req.body
        console.log("subtask", priority, subTaskID)

        await subTaskRepo.UpdatePrioritySubTask(priority, subTaskID)
        subTaskAction.createSubTaskAction("UpdatePrioritySubTask",ProfileID, subTaskID)

        res.status(200).json({
            success: false,
            message: "doesnt exist."
        }); res.end();
    }
    UpdateStartDateSubTask = async (req, res) => {
        const { startDate, subTaskID ,ProfileID} = req.body
        console.log("subtask", startDate, subTaskID)

        await subTaskRepo.UpdateStartDateSubTask(startDate, subTaskID)
        subTaskAction.createSubTaskAction("UpdateStartDateSubTask",ProfileID, subTaskID)

        res.status(200).json({
            success: false,
            message: "doesnt exist."
        }); res.end();
    }
    UpdateSubTaskName = async (req, res) => {
        const { subTaskName, subTaskID ,ProfileID} = req.body
        console.log("subtask", subTaskName, subTaskID)
        subTaskAction.createSubTaskAction("UpdateSubTaskName",ProfileID, subTaskID)

        await subTaskRepo.UpdateIsDoneSubTask(subTaskName, subTaskID)

        res.status(200).json({
            success: false,
            message: "doesnt exist."
        }); res.end();
    }

    retriveSubTasksReleaetedToTask = async (req, res) => {
        const { taskID } = req.query;
        const result = await subTaskRepo.retrieveSubTasksRelatedToTask(taskID);
        res.status(200).json({
            success: true,
            message: result
        });
    }
    deleteSubTask = async (req, res) => {
        const { subTaskID,ProfileID } = req.body
        const result = await subTaskRepo.deleteSubTask(subTaskID)
        subTaskAction.createSubTaskAction("delete subTask",ProfileID, subTaskID)

        res.status(200).json({
            success: true,
            message: result
        });
    }
}
module.exports = {
    SubTask
}


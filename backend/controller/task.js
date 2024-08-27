const { TaskReposotory } = require('../repository/task/taskRepostory')
taskRepo = new TaskReposotory()
class Tasks {
    createTask = async (req, res) => {
        const { taskName, taskDescription, taskImage, taskDueDate, ProjectID } = req.body;
        const currentDate = new Date();
        let formattedDueDate;
        console.log(taskImage)
        try {
            // Split the date into parts

            // Check if the date is valid
            const dueDate = new Date(formattedDueDate);

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid taskDueDate: ' + error.message
            });
        }
        const result = await taskRepo.createTask({taskName: taskName,taskDescription: taskDescription,taskImage: taskImage, taskDueDate: currentDate,ProjectID: ProjectID,currentDate: currentDate})

        const taskID = result;


        res.status(200).json({
            success: true,
            message: taskID
        });
    };

    insertTaskCollabortor = async (req, res) => {
        const { ProfileEmail, taskID } = req.body;
        await taskRepo.insertTaskCollaborator({profileEmail: ProfileEmail,taskID: taskID})

        res.status(200).json({
            success: true,
            message: "task and collaborators inserted successfully."
        });

    }
    retriveTaskollabortor = async (req, res) => {

        const { taskID } = req.query
console.log(taskID)
        const result = await taskRepo.retrieveTaskCollaborators({taskID: taskID})


        res.status(200).json({
            success: true,
            message: result
        });
    }

    retriveTasksCollaborate = async (req, res) => {
        const { ProfileID } = req.body
        const result = await taskRepo.retriveTasksCollaborate(ProfileID)

        res.status(200).json({
            success: true,
            message: result
        });
    }
    deleteTaskCollaborator = async (req, res) => {
        const { ProfileID, taskID } = req.body
        console.log("tasid",taskID)
        console.log("profileid",ProfileID)

        const result = await taskRepo.deleteTaskCollaborator(ProfileID, taskID)

        res.status(200).json({
            success: true,
            message: result
        });
    }
    UpdateStatus = async (req, res) => {
        const { taskStatus, taskID } = req.body
        const result = await taskRepo.UpdateStatus(taskStatus, taskID)

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
    }
    UpdateTaskName = async (req, res) => {
        const { taskName, taskID } = req.body
        console.log("taskname",taskName)
        console.log("taskname",taskID)

        const result = await taskRepo.UpdateTaskName(taskName, taskID)

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
    }
    UpdateTaskDesc = async (req, res) => {
        const { taskDesc, taskID } = req.body
        console.log("taskDesc",taskDesc)
        console.log("taskname",taskID)
        const result = await taskRepo.UpdateTaskDesc(taskDesc, taskID)

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
    }
    retriveTasksReleaetedToProject = async (req, res) => {
        const { ProjectID } = req.query
        const result = await taskRepo.retriveTasksReleaetedToProject (ProjectID)

        res.status(200).json({
            success: true,
            message: result
        });
    }
    deleteTask = async (req, res) => {
        const { taskID } = req.body
        const result = await taskRepo.deleteTask (taskID)

        res.status(200).json({
            success: true,
            message: result
        });
    }
}
module.exports = {
    Tasks
};


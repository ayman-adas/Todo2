// interfaces/IProjectRepository.js
class ITaskRepository {
    createTask(taskData) { throw new Error('Not implemented'); }
    insertTaskCollaborator(profileEmail,taskID) { throw new Error('Not implemented'); }
    insertTaskCollaborator(profileEmail, taskID) { throw new Error('Not implemented'); }
    retrieveTaskCollaborators(taskID) { throw new Error('Not implemented'); }
    retrievTasksCollaborating(profileId) { throw new Error('Not implemented'); }
    deleteTaskCollaborator(profileEmail, taskID) { throw new Error('Not implemented'); }
    UpdateStatus(taskStatus, taskID) { throw new Error('Not implemented'); }
    UpdateTaskDesc(taskDesc, taskID) { throw new Error('Not implemented'); }
    UpdateTaskName(taskName, taskID) { throw new Error('Not implemented'); }
    deletTask(taskID) { throw new Error('Not implemented'); }

    retriveTasksReleaetedToProject(ProjectID) { throw new Error('Not implemented'); }

}

module.exports = {ITaskRepository};
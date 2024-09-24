// interfaces/IProjectRepository.js
class ISubTaskRepository {
    createSubTask(SubtaskData) { throw new Error('Not implemented'); }
    // insertSubTaskCollaborator(profileEmail,SubtaskID) { throw new Error('Not implemented'); }
    // insertSubTaskCollaborator(profileEmail, SubtaskID) { throw new Error('Not implemented'); }
    // retrieveSubTaskCollaborators(SubtaskID) { throw new Error('Not implemented'); }
    // retrievSubTasksCollaborating(profileId) { throw new Error('Not implemented'); }
    // deleteSubTaskCollaborator(profileEmail, SubtaskID) { throw new Error('Not implemented'); }
    UpdateStatus(SubtaskStatus, SubtaskID) { throw new Error('Not implemented'); }
    UpdateIsDoneSubTask(SubtaskISDone, SubtaskID) { throw new Error('Not implemented'); }
    UpdateEndDateSubTask(EndDate, SubtaskID) { throw new Error('Not implemented'); }
    UpdatePrioritySubTask(Priority, SubtaskID) { throw new Error('Not implemented'); }
    UpdateStartDateSubTask(StartDate, SubtaskID) { throw new Error('Not implemented'); }
    UpdateSubTaskName(SubTaskNam, SubtaskID) { throw new Error('Not implemented'); }

    retriveSubTasksReleaetedToTask (taskID) { throw new Error('Not implemented'); }
    deleteSubTask(SubtaskData) { throw new Error('Not implemented'); }

}

module.exports = {ISubTaskRepository};
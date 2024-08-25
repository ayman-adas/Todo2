// interfaces/IProjectRepository.js
class ISubTaskRepository {
    createSubTask(SubtaskData) { throw new Error('Not implemented'); }
    // insertSubTaskCollaborator(profileEmail,SubtaskID) { throw new Error('Not implemented'); }
    // insertSubTaskCollaborator(profileEmail, SubtaskID) { throw new Error('Not implemented'); }
    // retrieveSubTaskCollaborators(SubtaskID) { throw new Error('Not implemented'); }
    // retrievSubTasksCollaborating(profileId) { throw new Error('Not implemented'); }
    // deleteSubTaskCollaborator(profileEmail, SubtaskID) { throw new Error('Not implemented'); }
    UpdateStatus(SubtaskStatus, SubtaskID) { throw new Error('Not implemented'); }
    retriveSubTasksReleaetedToTask (ProjectID) { throw new Error('Not implemented'); }

}

module.exports = {ISubTaskRepository};
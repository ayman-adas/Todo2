// interfaces/IProjectRepository.js
class IProjectRepository {
    createProject(projectData) { throw new Error('Not implemented'); }
    insertProjectCollaborator(projectId, profileId) { throw new Error('Not implemented'); }
    retrieveMyProjects(profileId, limit, offset) { throw new Error('Not implemented'); }
    insertProjectCollaborator(profileEmail, projectId) { throw new Error('Not implemented'); }
    retrieveProjectCollaborators(projectId) { throw new Error('Not implemented'); }
    retrieveProjects(projectId) { throw new Error('Not implemented'); }

    retrievePublicProjects() { throw new Error('Not implemented'); }
    retrieveProjectsCollaborating(profileId) { throw new Error('Not implemented'); }
    deleteProjectCollaborator(profileEmail, projectId) { throw new Error('Not implemented'); }
    deleteProject(projectId) { throw new Error('Not implemented'); }
    updateProjectStatus(projectId, statuscode) { throw new Error('Not implemented'); }
    updateProjectProjectName(projectId, ProjectName) { throw new Error('Not implemented'); }

}
module.exports = { IProjectRepository };
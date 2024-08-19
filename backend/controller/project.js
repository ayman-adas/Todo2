// Controllers/ProjectController.js
const { ProjectRepository } = require('../repository/project/projectReposotory')
projectRepository = new ProjectRepository()
class ProjectController {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async createProject(req, res) {
        try {
            const { ProjectName, isPrivate, ProfileID } = req.body;
            const projectId = await projectRepository.createProject({ ProjectName, isPrivate, ProfileID });
            await projectRepository.insertProjectCollaborator(projectId, ProfileID);
            res.status(200).json({
                success: true,
                message: "Project and collaborators inserted successfully."
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async retrieveMyProjects(req, res) {
        try {
            const { ProfileID, limit, offset } = req.query;
            const result = await projectRepository.retrieveMyProjects(ProfileID, limit, offset);
            res.status(200).json({
                success: true,
                message: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async insertProjectCollaborator(req, res) {
        try {
            const { ProfileEmail, ProjectID } = req.body;
            await projectRepository.insertProjectCollaboratorByEmail(ProfileEmail, ProjectID);
            res.status(200).json({
                success: true,
                message: "Project collaborator added successfully."
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async retrieveProjectCollaborators(req, res) {
        try {
            const { ProjectID } = req.query;
            const result = await projectRepository.retrieveProjectsCollaborating(parseInt(ProjectID));
            res.status(200).json({
                success: true,
                message: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async retrievePublicProjects(req, res) {
        try {
            const result = await projectRepository.retrievePublicProjects();
            res.status(200).json({
                success: true,
                message: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async retrieveProjectsCollaborating(req, res) {
        try {
            const { profileID } = req.query;
            const result = await projectRepository.retrieveProjectsCollaborating(profileID);
            res.status(200).json({
                success: true,
                message: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteProjectCollaborator(req, res) {
        try {
            const { ProfileEmail, ProjectID } = req.body;
            await projectRepository.deleteProjectCollaborator(ProfileEmail, ProjectID);
            res.status(200).json({
                success: true,
                message: "Project collaborator removed successfully."
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = { ProjectController };
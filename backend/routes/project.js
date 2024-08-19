const express = require("express");
const {
    ProjectController,
} = require("../controller/project");

const ProjectRouter = express.Router();
project = new ProjectController()
// Pass the functions as handlers, not invoke them
ProjectRouter.post("/project/create", project.createProject);
ProjectRouter.get("/project/myProjects", project.retrieveMyProjects);
ProjectRouter.post("/project/collabortors/insert", project.insertProjectCollaborator);
ProjectRouter.delete("/project/collabortors/delete", project.deleteProjectCollaborator);

ProjectRouter.get("/project/collabortors/retrive", project.retrieveProjectCollaborators);
ProjectRouter.get("/project/retrive/public", project.retrievePublicProjects);
ProjectRouter.get("/project/retrive/collaborate", project.retrieveProjectsCollaborating);

module.exports = { ProjectRouter };

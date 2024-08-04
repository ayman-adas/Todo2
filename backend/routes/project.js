const express = require("express");
const {
    createProjcet,
    retriveMyProjects,
    insertProjectCollabortor,
    retriveProjectCollabortor,
    retrivePublicProjects,
    retriveProjectsCollaborate,
    deleteProjectsCollaborator,
} = require("../controller/project");

const ProjectRouter = express.Router();

// Pass the functions as handlers, not invoke them
ProjectRouter.post("/project/create", createProjcet);
ProjectRouter.get("/project/myProjects", retriveMyProjects);
ProjectRouter.post("/project/collabortors/insert", insertProjectCollabortor);
ProjectRouter.delete("/project/collabortors/delete", deleteProjectsCollaborator);

ProjectRouter.get("/project/collabortors/retrive", retriveProjectCollabortor);
ProjectRouter.get("/project/retrive/public", retrivePublicProjects);
ProjectRouter.get("/project/retrive/collaborate", retriveProjectsCollaborate);

module.exports = {ProjectRouter};

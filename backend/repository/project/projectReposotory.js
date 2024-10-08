// repositories/ProjectRepository.js
const { IProjectRepository } = require('./interfaceProject');
const { MySql } = require('../../services/database');

class ProjectRepository extends IProjectRepository {
    constructor() {
        super();
        this.mySql = new MySql();
    }

    async createProject({ ProjectName, isPrivate, ProfileID }) {
        const currentDate = new Date();
        const sql = `INSERT INTO Project (ProjectName, isPrivate, ProfileID, ProjectCreatedTime) VALUES (?, ?, ?, ?)`;
        const result = await this.mySql.query(sql, [ProjectName, isPrivate, ProfileID, currentDate]);
        return result.insertId;
    }

    async insertProjectCollaborator(projectId, profileId) {
        const sql = `INSERT INTO projectcollaborators (ProjectId, ProfileID) VALUES (?, ?)`;
        await this.mySql.query(sql, [projectId, profileId]);
    }

    async retrieveMyProjects(profileId, limit, offset) {
        const sql = `SELECT * FROM Project WHERE ProfileID = ? ORDER BY ProjectCreatedTime LIMIT ? OFFSET ?;`;
        return await this.mySql.query(sql, [parseInt(profileId), parseInt(limit), parseInt(offset)]);
    }

    async insertProjectCollaboratorByEmail(profileEmail, projectId) {
        const sql = `SELECT ProfileID FROM Profile WHERE ProfileEmail = ?`;
        const [user] = await this.mySql.query(sql, [profileEmail]);
        if (!user) throw new Error('User not found');
        const sqlCollaborators = `INSERT INTO projectcollaborators (ProfileID, ProjectID) VALUES (?, ?)`;
        await this.mySql.query(sqlCollaborators, [user.ProfileID, projectId]);
    }

    async retrieveProjectCollaborators(projectId) {
        const sql = `SELECT * FROM projectcollaborators INNER JOIN Profile ON projectcollaborators.ProfileID = Profile.ProfileID WHERE ProjectID = ?`;
        return await this.mySql.query(sql, projectId);
    }

    async retrievePublicProjects() {
        const sql = `SELECT P.ProjectName, Profile.ProfileName, P.ProjectID,P.ProfileID, COUNT(*) OVER () AS TotalCount FROM Project P INNER JOIN Profile ON P.ProfileID = Profile.ProfileID WHERE P.IsPrivate = false ORDER BY ProjectCreatedTime;`;
        return await this.mySql.query(sql);
    }
    async retrieveProjects(ProjectID) {
        console.log(ProjectID)

        const sql = `SELECT ProjectName from Project where ProjectID=?`;
        return await this.mySql.query(sql,ProjectID);
    }
    async retrieveProjectsCollaborating(profileID) {
        console.log(profileID)
        const sql = `SELECT *  FROM Project P INNER JOIN projectcollaborators PC INNER join profile pr ON P.ProjectID = PC.ProjectID AND p.ProfileID=pr.ProfileID WHERE PC.ProfileID = ? ORDER BY ProjectCreatedTime ;`;
        const result = await this.mySql.query(sql, [(profileID),]);
        console.log(result)
        return result
    }

    async deleteProjectCollaborator(profileEmail, projectId) {
        const sql = `SELECT ProfileID FROM Profile WHERE ProfileEmail = ?`;
        const [user] = await this.mySql.query(sql, [profileEmail]);
        if (!user) throw new Error('User not found');
        const sqlCollaborators = `DELETE FROM projectcollaborators WHERE ProfileID = ? AND ProjectID = ?`;
        await this.mySql.query(sqlCollaborators, [user.ProfileID, projectId]);
    }
    async deleteProject( projectId) {
        console.log(projectId+"id")
        const sql = `delete from project where projectId=?`;
        await this.mySql.query(sql, [projectId]);
        console.log("deleted")
        
    }
    async updateProjectStatus( projectId,statuscode) {
        console.log(projectId+"id")
        const sql = `update project set isPrivate=?   where projectId=?`;
        await this.mySql.query(sql, [parseInt(statuscode),projectId]);      
    }
    async updateProjectProjectName( projectId,ProjectName) {
        console.log(projectId+"id")
        const sql = `update project set ProjectName=?   where projectId=?`;
        await this.mySql.query(sql, [(ProjectName),projectId]);
        
    }
}

module.exports = { ProjectRepository };
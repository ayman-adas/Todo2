const { con } = require('../services/database');
const { socketConnection } = require('../index.js');
/// create new project
const createProjcet = (req, res) => {
    const { ProjectName, isPrivate, ProfileID } = req.body;
    //take date of creation
    const currentDate = new Date();

    const sql = `INSERT INTO Project (ProjectName, isPrivate, ProfileID, ProjectCreatedTime) VALUES (?, ?, ?, ?)`;
    con.query(sql, [ProjectName, isPrivate, ProfileID, currentDate], (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        const projectID = result.insertId;
/// after make a new project i will insert  the owner in prject collaborate
        const sqlCollaborators = `INSERT INTO projectcollaborators (ProjectId, ProfileID) VALUES (?, ?)`;
        con.query(sqlCollaborators, [projectID, ProfileID], (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Project and collaborators inserted successfully."
            });
        });
    });
};
/// retrive projects i owned
const retriveMyProjects = (req, res) => {

    const { ProfileID } = req.query
    const sql = `select * from Project where Profileid =? Order BY ProjectCreatedTime`;

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
/// add new collaborator
const insertProjectCollabortor = (req, res) => {
    const { ProfileEmail, ProjectID } = req.body;

    const sql = `select Profileid from Profile where ProfileEmail =?`;
    con.query(sql, ProfileEmail, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
///check if there account
        const user = result[0];

        const sqlCollaborators = `INSERT INTO projectcollaborators (Profileid, ProjectID) VALUES (?, ?)`;
        con.query(sqlCollaborators, [user.Profileid, ProjectID], (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Project and collaborators inserted successfully."
            });
        });
    });
}
// retrive project that i collaborate
const retriveProjectCollabortor = (req, res) => {

    const { ProjectID } = req.body
    const sql = `select ProjectID from projectcollaborators where ProjectID =?`;

    con.query(sql, ProjectID, (err, result) => {
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
// retrive public project
const retrivePublicProjects = () => {

    return new Promise((resolve, reject) => {
        sql = `SELECT 
        P.ProjectName,
        Profile.ProfileName,
        P.ProjectID,
        COUNT(*) OVER () AS TotalCount
    FROM Project P
    INNER JOIN Profile ON P.ProfileID = Profile.ProfileID
    WHERE P.IsPrivate = false  Order BY ProjectCreatedTime;`;

        con.query(sql, (err, result) => {
            if (err) {
                console.error('Error retrieving projects:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};
/// retrive proples who collaborate to this project
const retriveProjectsCollaborate = (req, res) => {
    const { ProfileID } = req.query
    var sql = `
    SELECT 
       *
    FROM
       Project P
    INNER JOIN projectcollaborators PC ON P.ProjectID = PC.ProjectID where PC.ProfileID= ?  Order BY ProjectCreatedTime `;
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
/// delete project collaborate
const deleteProjectsCollaborator = (req, res) => {
    const { ProfileID, ProjectID } = req.body
    var sql = `
    delete from projectcollaborators where ProfileID= ? AND ProjectID= ? `;
    con.query(sql, [ProfileID, ProjectID], (err, result) => {
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


module.exports = {
    createProjcet, retriveMyProjects, insertProjectCollabortor,
    retriveProjectCollabortor, retrivePublicProjects, retriveProjectsCollaborate,
    deleteProjectsCollaborator,
};


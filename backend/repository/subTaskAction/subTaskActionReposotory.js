const { ISubTaskActionRepository } = require('./interfaceSubTaskACtion')
const { MySql } = require('../../services/database');
const mysql = new MySql()
class SubTaskActionReposotory extends ISubTaskActionRepository {
    constructor() {
        super();
        this.mySql = new MySql();
    }

    async createSubTaskAction(actionType, actionTime, subTaskID, profileID) {
        const sql = `INSERT INTO subTaskaction (SubTaskID ,profileID,actionType,actionTime) VALUES (?, ?, ?,?)`;
        await mysql.query(sql, [subTaskID, profileID, actionType, actionTime],)


    }}
    module.exports={SubTaskActionReposotory}
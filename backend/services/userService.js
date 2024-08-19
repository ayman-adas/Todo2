// services/userService.js
const { MySql } = require('../services/database');

class UserService {
    constructor() {
        this.mysql = new MySql();
    }

    async findUserByEmail(email) {
        const sql = 'SELECT * FROM profile WHERE profileEmail = ?';
        const results = await this.mysql.query(sql, [email]);
        return results[0];
    }

    async createUser(profileName, profileEmail, hashedPassword, passwordCode) {
        const sql = `INSERT INTO profile (profileName, ProfileEmail, ProfilePasword, PASSWORDCode) VALUES (?, ?, ?, ?)`;
        await this.mysql.query(sql, [profileName, profileEmail, hashedPassword, passwordCode]);
    }

    async updatePassword(email, newPassword) {
        const sql = `UPDATE profile SET ProfilePasword = ? WHERE profileEmail = ?`;
        await this.mysql.query(sql, [newPassword, email]);
    }

    async findUsers() {
        const sql = 'SELECT * FROM profile';
        return this.mysql.query(sql);
    }
}

module.exports = { UserService };
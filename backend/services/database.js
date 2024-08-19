const mysql = require('mysql');

class DatabaseService {
    constructor() { }
    connection = function () {
        throw new Error(`Cannot call abstract 
        method makeSound from Animal`);
    };

}

class MySql extends DatabaseService {
    constructor() {
        super(); // Must call super() before using 'this'

        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: 'todo'
        });
    }
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            console.log(params)
            this.connection.query(sql, params, (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    connect() {
        this.connection.connect((err) => {
            // Connect to MySQL
            if (err) {
                console.error('Error connecting to the database:', err);
                return;
            }
            console.log('Connected to the MySQL database');
        });
    }

    // Add other useful methods as needed, like closing the connection
    closeConnection() {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
    }
}
class MongoDB extends DatabaseService {
    connection = function () {
        // TODO
    }
}
module.exports = {
    MySql, MongoDB
}
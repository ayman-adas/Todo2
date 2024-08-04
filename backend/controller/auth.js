const bcrypt = require('bcrypt')
const { con } = require('../services/database')
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
///[login] login authentication with email and password
=======

>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
const login = async (req, res) => {
    if (res) {
        const { ProfileEmail, ProfilePasword } = req.body;
        console.log(ProfileEmail)
        console.log(ProfilePasword)
        // Find user by ProfileEmail
        const sql = `SELECT * FROM profile WHERE profileEmail = ?`;
        con.query(sql, [ProfileEmail], async (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Error logging in');
            }
<<<<<<< HEAD
/// if there no account
=======

>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
            if (results.length === 0) {
                return res.status(400).send('User not found');
            }
            else {
                const user = results[0];

                // Compare the ProfilePasword with the hashed ProfilePasword
                const isMatch = await bcrypt.compare(ProfilePasword, user.ProfilePasword);

                if (!isMatch) {
                    return res.status(400).send('Invalid credentials');
                }
                const payload = {
                    user
                };
                const options = { expiresIn: "20h" };
                const secret = process.env.SECRET_KEY;
                const token = jwt.sign(payload, secret, options);
                if (token) {
                    console.log(results)
                    console.log(user.ProfileID)
                    res.status(200).json({
                        messgge: "Login successful",
                        result: token,
                        ProfileID: user.ProfileID,
                        ProfileName: user.ProfileName,
                        ProfileEmail: user.ProfileEmail,

                    })
                }
                else { res.send('failed') }
            }
        });

    }
}
<<<<<<< HEAD
/// make bew account
const signUp = async (req, res) => {
    ///take time of signup
=======
const signUp = async (req, res) => {
>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
    const now = new Date();

    const { profileName, ProfileEmail, ProfilePasword } = req.body
    console.log(ProfileEmail)
    console.log(profileName)
    console.log(ProfilePasword)
<<<<<<< HEAD
///to make hasing password
=======

>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
    const salt = await bcrypt.genSalt(10)
    console.log(salt);
    const pass = await bcrypt.hash(ProfilePasword, salt)
    console.log(pass)
<<<<<<< HEAD
    //[password code] code for authentication when you forget password
=======
>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
    const passwordCode = await bcrypt.hash(now.getTime().toString(), salt)
    console.log(passwordCode)
    const sql = `INSERT INTO profile (profileName, ProfileEmail, ProfilePasword, PASSWORDCode) VALUES (?, ?, ?, ?)`;
    con.query(sql, [profileName, ProfileEmail, pass, passwordCode], function (err, result) {
        if (err) res.status(400).json({
            success: false,
            message: err
        });
        else {
            res.status(200).json({
                success: true,
                message: "inserted.",
                token: passwordCode
            }); res.end();
        }
    });

}
<<<<<<< HEAD
// forget password take your email and passcode to check if exist
=======
>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
const forgetPassword = (req, res) => {
    const { ProfileEmail, PASSWORDCode } = req.body
    console.log(ProfileEmail)
    console.log(PASSWORDCode)

    const sql = `SELECT * FROM profile WHERE profileEmail = ? And passwordCode= ? `;
    con.query(sql, [ProfileEmail, PASSWORDCode], function (err, result) {
        if (err) res.status(400).json({
            success: false,
            message: err
        });
        console.log(result)
        if (result.length != 0) {
            res.status(200).json({
                success: true,
                message: "sucsess."
            }); res.end();
        }
        else {
            res.status(400).json({
                success: false,
                message: "doesnt exist."
            }); res.end();
        }
    });

}
<<<<<<< HEAD
///making update to password
=======
>>>>>>> e28eaf2dc3dbb4d810743dd81a20b7890f2933f4
const updatePassword = async (req, res) => {
    if (res) {
        const { ProfileEmail, ProfilePasword } = req.body
        console.log(ProfileEmail)
        console.log(ProfilePasword)
        console.log(ProfileEmail)
        console.log(ProfilePasword)
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(ProfilePasword, salt)
        const sql = `UPDATE Profile SET ProfileEmail = ? WHERE ProfilePasword = ? `;
        con.query(sql, [ProfileEmail, pass], function (err, result) {
            if (err) res.status(400).json({
                success: false,
                message: err
            });
            console.log(result)
            if (result.length != 0) {
                res.status(200).json({
                    success: true,
                    message: pass
                }); res.end();
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "doesnt exist."
                }); res.end();
            }
        });
    }
}
module.exports = { login, signUp, forgetPassword, updatePassword }
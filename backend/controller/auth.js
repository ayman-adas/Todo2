// controllers/authController.js
const {HashService} = require('../services/hashService');
const{ JwtService }= require('../services/jwtService');
const {UserService} = require('../services/userService');

hashService = new HashService();
jwtService = new JwtService();
userService = new UserService();
class AuthController {


    async login(req, res) {
        const { loginEmail, loginPassword } = req.body;
        console.log(userService.toString())
        const user = await userService.findUserByEmail(loginEmail);

        if (!user) return res.status(400).send('User not found');

        const isMatch = await hashService.compareHash(loginPassword, user.ProfilePasword);

        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwtService.generateToken({ user: user }, process.env.SECRET_KEY, '20h');

        res.status(200).json({
            message: 'Login successful',
            token: token,
            ProfileID: user.ProfileID,
            ProfileName: user.ProfileName,
            ProfileEmail: user.ProfileEmail,
        });
    }

    async signUp(req, res) {
        const { profileName, profileEmail, profilePasword } = req.body;
        const hashedPassword = await hashService.makeHash(profilePasword);
        const passwordCode = await hashService.makeHash(new Date().getTime().toString());

        await userService.createUser(profileName, profileEmail, hashedPassword, passwordCode);

        res.status(200).json({
            success: true,
            message: 'User created.',
            token: passwordCode,
        });
    }

    async forgetPassword(req, res) {
        const { profileEmail, passwordCode } = req.body;
        const user = await userService.findUserByEmail(profileEmail);

        if (user && user.PASSWORDCode === passwordCode) {
            res.status(200).json({ success: true, message: 'Success.' });
        } else {
            res.status(400).json({ success: false, message: 'Does not exist.' });
        }
    }

    async updatePassword(req, res) {
        const { profileEmail, profilePassword } = req.body;
        const hashedPassword = await hashService.makeHash(profilePassword);

        await userService.updatePassword(profileEmail, hashedPassword);

        res.status(200).json({ success: true, message: 'Password updated.' });
    }

    async retrieveUsers(req, res) {
        const users = await userService.findUsers();
        res.status(200).json({ success: true, message: users });
    }
}

module.exports = {AuthController};

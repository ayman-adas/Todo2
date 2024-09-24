// services/jwtService.js
const jwt = require('jsonwebtoken');

class JwtService {
    generateToken(payload, secret, expiresIn) {
        return jwt.sign(payload, secret, { expiresIn });
    }
}

module.exports = {JwtService};
// services/hashService.js
const bcrypt = require('bcrypt');

class HashService {
    async makeHash(value) {
        if (!value) throw new Error("No value provided for hashing");
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw new Error("Failed to generate salt");
        return bcrypt.hash(value, salt);
    }

    async compareHash(value, hashedValue) {
        return bcrypt.compare(value, hashedValue);
    }
}

module.exports = {HashService};
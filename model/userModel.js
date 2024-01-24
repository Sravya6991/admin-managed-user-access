const db = require('../database');
const bcrypt = require('bcrypt');

class User {
    constructor(userId, password) {
        this.userId = userId,
        this.password = password
    }

    async existingUser() {
        const exists = await db.getDb().collection('user').findOne({userId: this.userId});
        if(exists) {
            return true
        } else {
            return false;
        }
    }

    async createUser() {
        const newPassword = await bcrypt.hashSync(this.password, 8);
        const payload = {
            u_id: Math.floor(Math.random()*100),
            user_Id: Number(this.userId),
            password: newPassword
        }
        const result =  await db.getDb().collection('user').insertOne(payload);
        return result;
    }

    async login(givenPassword) {
        const comparePassword = await bcrypt.compareSync(givenPassword, this.password)
        return comparePassword;
    }
 
    async createUserDetails(details) {
        const result = await db.getDb().collection('user_details').insertOne(details);
        return result;
    }

    async findUserDetails(id) {
        const result = await db.getDb().collection('user_details').findOne(id);
        return result;
    }
}

module.exports = User;
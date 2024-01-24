const db = require('../database');
const bcrypt = require('bcrypt');

class Admin {
    constructor(adminId, password) {
        this.adminId = adminId,
        this.password = password
    }

    async existingUser(id) {
        const exists = await db.getDb().collection('admin').findOne({adminId: id});
        if(exists) {
            return true
        } else {
            return false;
        }
    }

    async createAdmin() {
        const newPassword = await bcrypt.hashSync(this.password, 8);
        const payload = {
            a_id: Math.floor(Math.random()*50),
            admin_Id: Number(this.adminId),
            password: newPassword
        }
        const result =  await db.getDb().collection('admin').insertOne(payload);
        return result;
    }
 

}

module.exports = Admin;
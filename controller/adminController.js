const db = require('../database');
const Admin = require('../model/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminAuth = async(req, res) => {
    const userData = req.body;
    const newAdmin = new Admin(userData.adminId, userData.password)
    const userAlreadyExists = await newAdmin.existingUser(userData.adminId);
    if(userAlreadyExists) {
        return res.redirect(`/${req.body.adminId}/dashboard`);  
    }
    // if(userAlreadyExists) {
    //     return res.render('404', {message: 'Admin already existsted! Try new adminId'})
    // }
    else {
        await newAdmin.createAdmin();
        return res.redirect(`/${req.body.adminId}/dashboard`);    
    }
}

const dashboard = async (req, res) => {
    const result = await db.getDb().collection('user_details').find({}).toArray();
    if(result) {
        res.render('admin page/dashboard', {
            viewData: result
        });
    } else {
        console.log("No result")
        res.render('admin page/dashboard', {
            viewData: null
        });
    }
}

const confirmUser = async (req, res) => {
    const result = await db.getDb().collection('user_details').find({}).toArray();
    res.render('admin page/confirmation', {
        data: result
    });
}

const confirmUserDone = async (req, res) => {
    const uid = req.body.uId.split('-')[1];
    const result = await db.getDb().collection("user_details").updateOne(
        {u_id: uid},
        { $set: {
            "is_confirmed": true
            }
        }
    )
    console.log(result);
}

const confirmUserDelete = async (req, res) => {
    const uid = req.body.uId.split('-')[1];
    console.log(uid)
    const result = await db.getDb().collection("user_details").deleteOne({u_id: uid})
    res.json({message: `You deleted user ${uid}`});

}


module.exports = {
    adminAuth: adminAuth,
    dashboard: dashboard,
    confirmUser: confirmUser,
    confirmUserDone: confirmUserDone,
    confirmUserDelete: confirmUserDelete
}
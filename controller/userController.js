const db = require('../database');
const User = require('../model/userModel');
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const path = require('path');

const createUser = async (req, res) => {
    console.log(req.data)
    const userData = req.body;
    const newUser = new User(userData.userId, userData.password);
    const exists = await newUser.existingUser();
    if(exists) {
        res.redirect('/404', {message: 'User exists create new user'});
    } else {
        await newUser.createUser();
        return res.redirect('/user');
    }
}

const login = async (req, res) => {
    const userData = req.body;
    const newUser = new User(userData.userId, userData.password);

    const success = await newUser.login(userData.password);
    console.log(success);
    if(!success) {
        res.render('404', {message: "Invalid user credential"})
    } 
    return res.redirect(`/user/${req.body.userId}/dashboard`);
}

const userDashboard = (req, res) => {
    res.render('user page/dashboard', {
        userId: req.params.userId
    });
}

const uploads = async (req, res) => {
    console.log(req.body)
    const newUserDetails = new User()
    console.log(req.params.userId)
    const payload = {
        u_id: req.params.userId,
        userName: req.body.userName,
        avatar: {
            mimetype: req.file.mimetype,
            path: fs.readFileSync(path.join(__dirname , '../public/uploads/' + req.file.filename)),
            size: req.file.size
        },
        is_confirmed: false 
    }
    const uploaded = await newUserDetails.createUserDetails(payload)
    console.log(uploaded);
    const result = await newUserDetails.findUserDetails({_id: new ObjectId(uploaded.insertedId)});
    return res.render("user page/confirmation", {
        result: result,
        admin: false,
        message: "Uploaded successfully waiting for admin action!"
    })
}

const uploadData = async(req, res) => {
    const data = req.body;
    console.log(data)
    const newUserDetails = new User()
    const uploaded = await newUserDetails.createUserDetails(data)
    console.log(uploaded)
    const result = await newUserDetails.findUserDetails({_id: new ObjectId(uploaded.insertedId)});
    return res.send({
        result: result,
        admin: false,
        message: "Uploaded successfully waiting for admin action!"
    })

}

const postConfirmed = async (req, res) => {
    console.log(req.params.userId)
    const newUserDetails = new User()
    const data = await newUserDetails.findUserDetails({u_id: req.params.userId});
    res.render('user page/confirmation', {
        result: data,
        admin: true,
        message: "Admin Confirmed your profile :)"
    })
}

const getConfirmation = async (req, res) => {
    console.log(req.params.userId)
    const newUserDetails = new User()
    const data = await newUserDetails.findUserDetails({u_id: req.params.userId});
    res.render('user page/confirmation', {
        result: data,
        admin: false,
        message: "Uploaded! Wait for admin confirmation!"
    })
}

module.exports = {
    createUser: createUser,
    login: login,
    userDashboard: userDashboard,
    uploads: uploads,
    uploadData: uploadData,
    getConfirmation: getConfirmation,
    postConfirmed: postConfirmed
}
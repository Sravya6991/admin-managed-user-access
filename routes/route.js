const express = require('express');
const route = express.Router();
const path = require('path');
const multer = require('multer');

const adminController = require('../controller/adminController');
const userController = require('../controller/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads/"))
    },
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}-${file.originalname}`;
        cb(null, uniquename)
    }
});

const upload = multer({ storage: storage })

route.get('/', (req, res) => {
    res.render('index')
});

// admin routes

route.get('/admin', (req, res) => {
    res.render('./admin page/admin')
});
route.post('/admin', adminController.adminAuth)
route.get('/:adminId/dashboard', adminController.dashboard);
route.get('/admin/confirmation', adminController.confirmUser);

route.post('/admin/confirmation-done', adminController.confirmUserDone);
route.post('/admin/confirmation-delete', adminController.confirmUserDelete);

//  --------------------------------------
//  user routes

route.get('/user', (req, res) => {
    res.render('./user page/user')
});
route.post('/user', userController.login);
route.post('/admin/dashboard', userController.createUser);
route.get('/user/:userId/dashboard', userController.userDashboard);
route.get("/user/:userId/confirmed", userController.postConfirmed);
route.get("/user/:userId/confirmation", userController.getConfirmation);

// upload img
// route.post('/user/:userId/dashboard', upload.single('uploadFile'), userController.uploads);
route.post('/user/:userId/upload', userController.uploadData);

//  ---------------------------------------
//  error route

route.get('/404', (req, res) => {
    res.render('./404');
});

module.exports = route;

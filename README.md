/ - index page

// admin routes
---------------------
GET - /admin - admin login page
POST - /admin - save admin login details redirect to dashboard
GET - /:adminId/dashboard - admin dashboard
GET - /admin/confirmation - admin - user table to confirm or delete user 
POST - /admin/dashboard - admin - create userId and password for user
POST - /admin/confirmation-done - admin - update user
POST - /admin/confirmation-delete- admin - delete user

//  user routes
--------------------------------------
GET - /user - user login page
POST - /user - user login credential verified and rediect to user dashboard

GET - /user/:userId/dashboard - user dashboard
GET - /user/:userId/confirmed - user check confirmation page if admin accessed them or not
GET - /user/:userId/confirmation - user get confirmation page

// upload img
// POST - /user/:userId/dashboard - multer based file upload to database [PS: did not use this method in project]
POST - /user/:userId/upload - user - uploads username and profile pic so that admin view later and give access

// error page
-------------------------------------
GET - /404 - error page

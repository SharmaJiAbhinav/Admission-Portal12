const express = require("express");
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/admin/AdminController");
const checkAuth = require("../middleware/checkAuth");
const CourseController = require("../controllers/CourseController");


const route = express.Router();

//frontController
route.get("/home",checkAuth, FrontController.home);
route.get("/about", FrontController.about);
route.get("/", FrontController.login);
route.get("/register", FrontController.register);
route.get("/contact", FrontController.contact);

// insert data
route.post("/userInsert", FrontController.userInsert);
route.post('/verifyLogin', FrontController.verifyLogin)
route.get('/logout', FrontController.logout)

//profile
route.get('/profile',checkAuth,FrontController.profile)
route.post('/updateProfile' , checkAuth, FrontController.updateProfile)
route.post('/changePassword', checkAuth, FrontController.changePassword)

//admincontroller
route.get("/admin/dashboard", AdminController.dashboard);
route.get("/admin/studentDisplay", AdminController.display);
route.get("/admin/adduser", AdminController.adduser);
route.get("/admin/viewUser/:id", AdminController.viewUser);
route.get("/admin/EditUser/:id", AdminController.EditUser);
route.post("/admin/UpdateUser/:id", AdminController.UpdateUser);
route.get("/admin/deleteUser/:id", AdminController.DeleteUser);
route.post("/admin/userInsert", AdminController.userInsert);

//admin course controller
//status update
route.post("/admin/statusUpdate:id",checkAuth,AdminController.statusUpdate);

//courseController
route.post('/courseInsert', checkAuth,CourseController.courseInsert)
route.get('/courseDisplay', checkAuth,CourseController.courseDisplay)
route.get('/courseView/ :id', checkAuth,CourseController.courseView)

// courseDisplay
route.get("/admin/courseDisplay", AdminController.courseDisplay);
 






module.exports = route;

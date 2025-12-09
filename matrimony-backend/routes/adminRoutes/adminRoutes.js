const express = require("express");
const adminRoutes = express.Router();
const adminController = require("../../controller/adminController/adminController");
const planController = require("../../controller/adminController/planController")

adminRoutes.get("/",adminController.registerAdmin);
adminRoutes.get("/get-all-users",adminController.getAllUsersData);
adminRoutes.get("/get-all-new-requested-users",adminController.getAllNewRequestedUsersData);
adminRoutes.get("/paid-users-data", adminController.getPaidUsersData);
adminRoutes.get("/get-all-plan-data", planController.getAllPlanData);






adminRoutes.post("/verify-admin",adminController.verifyAdmin);
adminRoutes.post("/add-new-plan-data", planController.addNewPlanData);



adminRoutes.put("/approve-new-user/:userId",adminController.approveNewUser);
adminRoutes.put("/edit-plan-data/:planId",planController.editPlanData);
adminRoutes.put("/edit-plan-status/:planId",planController.editPlanStatus);







module.exports = adminRoutes;

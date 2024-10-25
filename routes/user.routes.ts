import { verify } from 'crypto';
import express from 'express';
import { Op } from 'sequelize';

 import userController from "../controllers/user.controller";

 const multer = require("multer");
 var storage = multer.diskStorage({
  destination: function (req: any, file:any, cb: any){
    cb(null, "profile");
  },
  filename: function(req:any, file: any, cb: any) {
    cb(null, file.originalname + ".png");
  },
 });
 var upload = multer({
  storage:storage
 })

const router=express.Router();
// TBD app api's
// sign up
router.post("/signup",userController.signup)
// login user
router.post("/login",userController.loginuser)
// user verify
router.post("/userverify",userController.verify)
// forgot password
router.post("/resent-otp",userController.forgot)
// change password
router.post("/update_password",userController.updatePassword)
// router.post("/usergamedata",userController.usergamedata)


//create game
router.post('/creategames', userController.createGame);














export default router;


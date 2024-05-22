import { verify } from 'crypto';
import express from 'express';

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
//  router.post("/register",userController.register);
// add specification
router.post("/addgeninfo",userController.addgeneralinfo)
// add administer
router.post("/addadminister",userController.addadminister)
// dailyschdule
router.post("/dailyschdule",userController.dailyschdule)
// get profile data
router.post("/getprofile",userController.getprofile)





export default router;


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
router.post("/addspecification",userController.addspecification)
// admin login
router.post("/adminlogin",userController.adminlogin)

// sixth class update data
router.post("/sixthUpdate",userController.sixthClassdataUpdate)
//seventhclass update data
router.post("/seventhclass",userController.seventhupdate)
// eigthclass update data
router.post("/eighthClass",userController.eighthClassupdate)

// ninth class update data
router.post("/updatedataninthclass",userController.nineupdate)
//tenth class update data
router.post("/tenthClass",userController.tenthClassupdate)
// get  data
router.post("/getalldata",userController.getalldata)



export default router;


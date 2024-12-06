import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";
 

const router=express.Router();

// get profile  api tbd
router.post("/get-Profile",userController.profileGet)

// get all ui  / get all leadrboard data   
router.post('/getallui', userController.getui);

// create user reward 
router.post('/redeemReward', userController.redeemReward);

// get all user redeem   history
router.post('/getuserreward', userController.getallredeem);


// upadte name 
router.post("/updateimage",userController.updatename)

// add notification
router.post("/addnotification",userController.addnotification)

// GET NOTIFICATION
router.post("/getnotification",userController.getnotification)



// add user play games    
// router.post("/usergamedata",userController.usergamedata)
router.post("/usergamedata",userController.usergamedata)


// get  all play game user testing api
router.post("/getUserGameData",userController.getUserGameData)


// + add coins sendlink
router.post("/add_coins",userController.add_coins)
// send link to email
router.post("/sendlink",userController.sendlink)
// router.post('/sendnotification', userController.sendnotification);

  
export default router;  
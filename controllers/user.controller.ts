import e, { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
// import userController from "../controllers/user.controller";
import { Error } from 'sequelize';
import db from '../models/index';

class UserController {
   // add specification data

// admin login
 async adminlogin(req,res){
    const {email,password}=req.body;
    try{
    await codeController.adminLogin({
        email, password
    },res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
 }


// get profile data
async getprofile(req,res){
    const{id}=req.body;
    try{

await codeController.getprofile({
    id
},res)
    }catch(err){
        commonController.errorMessage("occured err",res)
    }
}






// add and login user
async addnewuser(req,res){
    const{name,email,contact,password,logintype} =req.body;
    try{
        await codeController.addnewuser({
            name,email,contact,password,logintype
        },res)

    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}







// forgot password
async passwordforgot(req,res){
    var Email=req?.user?.Email
    console.log(Email,"sjhdjhf"); 
    try{
        await codeController.forgotpassword({
            Email
        },res) 
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}


async updatePassword(req,res){
    const {email,newPassword,otpValue}=req.body;
    try{
    await codeController.updatepassword({
        email,newPassword,otpValue
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}

//  get profile
async profileGet(req,res){
    var email=req?.user?.email
    try{
    await codeController.profileGet({
        email
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}

// create game
async createGame (req,res){
const { gamename, gameimage, points, linkhomeimage, linkdetail, favorite, players, description } = req.body;
    try{
    await codeController.createGame({
  gamename, gameimage, points, linkhomeimage, linkdetail, favorite, players, description
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}

// get all ui data
async getui(req,res){
    try{
    await codeController.getui({
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}



// update name 
async updatename(req,res){
    var email=req?.user?.email
    const {photo,name}=req.body;
    console.log(req.body,"dgfhdgfhdgfhd");
    
    try{
    await codeController.updatename({
        name,photo,email
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}

// add notification'
async addnotification(req,res){
    const {namemessage,type,heading}=req.body;
    try{
    await codeController.addnotification({
        namemessage,type,heading
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}






// get notification
async getnotification(req,res){
    try{
    await codeController.getNotification({

    },res)
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}


// user game data
async usergamedata(req,res){
    var email=req?.user?.email
    const { gameId, Points} = req.body;
    try{
        // let email ="mukul@airai.games"
    await codeController.usergamedata({
        email, Points ,gameId
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }

}




// edit coins 
async add_coins(req,res){
    var Email=req?.user?.Email
    const {newCoins}=req.body;
    try{
    await codeController.addCoins({
        Email,newCoins
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}

async sendlink(req,res){
    var Email=req?.user?.Email
    try{
    await codeController.sendlink({
        Email
    },res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}   



// sign up user 
async signup(req,res){
    const{name,email,password,logintype,referralCode} =req.body;
    try{
        
        await codeController.signup({
            name,email,password,logintype,referralCode
        },res)

    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}



async loginuser (req,res){
    const{email,password,logintype} =req.body;
    try{
        
        await codeController.loginuser({
            email,password,logintype
        },res)

    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}



// verify email with otp value
async verify  (req,res){
    const{email, otpValue} =req.body;
    try{
        
        await codeController.verify({
            email, otpValue,
        },res)

    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}











// GET PROFILE DATA
async getprofiledata(req,res){
    const {id} = req.body;
    try{
   await codeController.getprofiledata({
    id  
 },res)
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}



//
async forgot(req,res){
    const {email} = req.body;
    try{
await codeController.forgot({
    email
},res)
    }catch(error){
        commonController.errorMessage("ocured error",res)
    }
}

// redeem reward
async redeemReward(req,res){
    var id=req?.user?.id
    console.log(id,"shdjhjhj");
    
    const {amount,name,rewardId,fullName,phoneNumber,pinCode,address} = req.body;
    console.log(req.body,"reqbody>>>:PP:");
    
    try{
await codeController.redeemReward({
    id,amount,name,rewardId,fullName,phoneNumber,pinCode,address
},res)
    }catch(error){
        commonController.errorMessage("ocured error",res)
    }
}

// get all redeem history
async getallredeem (req,res){
    var id=req?.user?.id
    console.log(id,"shdjhjhj");
    try{
await codeController.getallredeem({
    id  
},res)
    }catch(error){
        commonController.errorMessage("ocured error",res)
    }
}


  // get user data
  async getUserGameData(req,res){
    var email=req?.user?.email
    try{
await codeController.getTopUser({
    email  
},res)
    }catch(error){
        commonController.errorMessage("ocured error",res)
    }

  }


// update image and name
async updatedImage(req, res) {
    const { name } = req.body; 
    try {
      const email = req?.user?.email; 
      console.log(email, "email");
  
      const user = await db.Newusers.findOne({ where: { email } });
      if (!user) {
        return commonController.successMessage1("Email does not exist", res);
      }
  
      if (req.file) {
        const response = req.file.path; // File path
        console.log("File info: ", req.file);
  
        // Check if the uploaded file is an image
        if (response.match(/\.(png|jpg|jpeg)$/)) {
          // Update the user with both name and userImage
          await user.update({
            name,
            userImage: `http://192.168.29.109:4000/${response}`
          });
          return commonController.successMessage(req.file.path, "data uploaded successfully", res);
        } else {
          return commonController.successMessage1("Invalid file format. Please upload a PNG, JPG, or JPEG file.", res);
        }
      }
  
      // If no file is uploaded, just update the name
      if (name) {
        await user.update({ name });
        return commonController.successMessage({}, "data updated successfully", res);
      }
      // Handle case where neither file nor name is provided
      return commonController.successMessage1("No data provided to update", res);
    } catch (e) {
      console.error("Error: ", e);
      return commonController.errorMessage("An error occurred while updating", res);
    }
  }
  





}










export default new UserController();
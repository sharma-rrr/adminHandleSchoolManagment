import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
// import userController from "../controllers/user.controller";
class UserController {
   // add specification data
async addspecification(req,res){
    const{specification}=req.body;
    try{
    await codeController.addSpecification({
        specification
    },res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}

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


// sixth class update data
async sixthClassdataUpdate(req,res){
    const {id, sixthClass} =req.body;
    try{
        await codeController.classupdate({
            sixthClass,id
        },res)

    }catch(err){
        commonController.errorMessage("cooured err",res)
    }
}

async seventhupdate(req,res){
    const {id, seventhClass} =req.body;
    try{
        await codeController.seventhupdate({
            seventhClass,id
        },res)

    }catch(err){
        commonController.errorMessage("cooured err",res)
    }
}

async eighthClassupdate(req,res){
    const {id, eighthClass} =req.body;
    try{
        await codeController.dataupdate({
            eighthClass,id
        },res)

    }catch(err){
        commonController.errorMessage("cooured err",res)
    }
}

async nineupdate(req,res){
    const {id, ninthClass} =req.body;
    try{
        await codeController.nineupdate({
            ninthClass,id
        },res)

    }catch(err){
        commonController.errorMessage("cooured err",res)
    }
} 

// tenth class update
async tenthClassupdate (req,res){
    const {id, tenthClass} =req.body;
    try{
        await codeController.upate({
            tenthClass,id
        },res)

    }catch(err){
        commonController.errorMessage("cooured err",res)
    }
} 


async addgeneralinfo(req,res){
    const{ SchoolName,address , phone ,email,website,inTime,outTime}=req.body;
  try{
  await codeController.addgenifo({
    SchoolName,address , phone ,email,website,inTime,outTime
  },res)
  }catch(err){
    commonController.errorMessage("occured error",res)
  }
}

async addadminister(req,res){
    const{SchoolName,name,email,role,department,phoneNumber}=req.body;
    try{
        await codeController.addminister({
            name,email,role,department,phoneNumber,SchoolName
        },res)
       
    }catch(err){
        commonController.errorMessage("occured errpr",res)
    }
}


async getalldata(req,res){
    await codeController.getalldata({

    },res)
}


// daily schu
async dailyschdule(req,res){
    const{dayOfWeek,morningAssemblyTime,classStartTime,lunchBreakTime,classEndTime,schoolBusTimings,SchoolName}=req.body; 
    try{
        await codeController.dailyschdule({
            dayOfWeek,morningAssemblyTime,classStartTime,lunchBreakTime,classEndTime,schoolBusTimings,SchoolName
        },res)
 
    }catch(err){
        commonController.errorMessage("occured err",res)
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

}


export default new UserController();
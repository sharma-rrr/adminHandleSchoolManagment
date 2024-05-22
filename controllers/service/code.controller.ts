import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
let referralCodeGenerator = require('referral-code-generator');
var otpGenerator = require('otp-generator');
const QRCode = require('qrcode');
const multer = require('multer');

import { v4 as uuidv4 } from "uuid";

import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});



// var bcryptjs= require('bcryptjs');

import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { SECRET_KEY } = require('../../appconfig')
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
import { body, Result } from 'express-validator';
import { exists } from 'fs';
import { Encrypt } from '../common/encryptpassword';
import { error } from 'console';
import { TokenExpiredError } from 'jsonwebtoken';
import { Error } from 'sequelize';
class CodeController {

    ///Section User Start
// add specification 
async addSpecification(payload: any, res: Response) {
    const { specification } = payload;
    try {
        const user = await db.Users.findOne({
            where: {
                specification
            }
        });

        if (user) {
            commonController.errorMessage("Specification already exists", res);
        } else {
            const newSpecification = await db.Users.create({
                specification,
                sixthClass: 0,
                seventhClass: 0,
                eighthClass: 0,
                ninthClass: 0,
                tenthClass: 0
            });

            commonController.successMessage(newSpecification, "Specification added successfully", res);
        }
    } catch (err) {
        commonController.errorMessage("An error occurred", res);
    }
}

// adminLogin
async adminLogin(payload: any, res: Response) {
    const { email, password } = payload;
    try {
        if (email === 'admin@mail.com' && password === 'admin@123') {
            const token = jwt.sign({
                email, admin: true,
            }, process.env.TOKEN_SECRET);
            commonController.successMessage(token, "token created", res)
        } else {
            commonController.errorMessage('Invalid email or password', res);
        }
    } catch (error) {
        console.log(error, "er**^&")
        commonController.errorMessage("occuerd error", res)
    }
}


// sixth class data update
async classupdate(payload:any,res:Response){
    const{id,  sixthClass} =payload;
    console.log("data",payload);
    try{
    const user= await db.Users.findOne({
        where:{
            id
        }
    })
   if(user){
    user.update({
        id, sixthClass
    })
    commonController.successMessage(user,"update sixthclass data",res)
}else{
    commonController.errorMessage("user not found",res)
}
    }catch(err){
        console.log("err",err);
        
        commonController.errorMessage("occured err",res)
    }
}



async seventhupdate(payload:any,res:Response){
    const{id,  seventhClass} =payload;
    console.log("data",payload);
    try{
        const user=await  db. Users.findOne({
            where:{
                id
            }
        })
        if(user){
            user.update({
                seventhClass
            })
            commonController.successMessage(user,"update user data",res)
        }else{
            commonController.errorMessage("user not found",res)
        }
    }catch(err){
        console.log("err",err);
        commonController.errorMessage("occured err",res)
    }


    
}

async dataupdate(payload:any,res:Response){
    const{id,  eighthClass} =payload;
    console.log("data",payload);
    try{
        const user=await  db. Users.findOne({
            where:{
                id
            }
        })
        if(user){
            user.update({
                eighthClass
            })
            commonController.successMessage(user,"update user data",res)
        }else{
            commonController.errorMessage("user not found",res)
        }
    
    }catch(err){
        console.log("err",err);
        
        commonController.errorMessage("occured err",res)
    }


    
}

async nineupdate (payload:any,res:Response){
    const{id,  ninthClass} =payload;
    console.log("data",payload);
    try{
        const user=await  db. Users.findOne({
            where:{
                id
            }
        })
        if(user){
            user.update({
                ninthClass
            })
            commonController.successMessage(user,"update user data",res)
        }else{
            commonController.errorMessage("user not found",res)
        }
    
    }catch(err){
        console.log("err",err);
        
        commonController.errorMessage("occured err",res)
    }
}

async upate (payload:any,res:Response){
    const{id,  tenthClass} =payload;
    console.log("data",payload);
    try{
        const user=await  db. Users.findOne({
            where:{
                id
            }
        })
        if(user){
            user.update({
                tenthClass
            })
            commonController.successMessage(user,"update user data",res)
        }else{
            commonController.errorMessage("user not found",res)
        }
    }catch(err){
        console.log("err",err);
        commonController.errorMessage("occured err",res)
    }
}


async addgenifo(payload:any,res:Response){
const{ SchoolName,address , phone ,email,website,inTime,outTime}=payload;
console.log("pay",payload);

try{

const user=await db.generalinfos.findOne({
    where:{
        SchoolName
    }
})
if(user){
    commonController.errorMessage("school name alredy exist",res)
}else{
    const addgeninfo =await db.generalinfos.create({
        SchoolName,address , phone ,email,website,inTime,outTime
    })
    commonController.successMessage(addgeninfo,"add generalinfo done",res)
}

}catch(Error){
    console.log("ERR",Error);
    
    commonController.errorMessage("occured err",res)
}
}

// add administer 
async addminister(payload:any,res:Response){
    const{Userid,name,email,role,department,phoneNumber,SchoolName }=payload;
    try{
        const user=await db.generalinfos.findOne({
            where:{
                SchoolName
            }
        })
        if(!user){
            commonController.errorMessage("user sch name is not found",res)
        }
        const addminister =await db.Administers.findOne({
            where:{
                schoolid:user.id
            }
        })
        if(addminister){
            addminister.update({
                name,email,role,department,phoneNumber 
            })
            commonController.successMessage(addminister,"data updated ",res)
        }else{
            const addmin= await db.Administers.create({
                name,email,role,department,phoneNumber ,schoolid:user.id
            })
            commonController.successMessage(addmin,"add administartion succefully",res)
        }
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// getall data from users
async getalldata(payload:any,res:Response){
    var sql = `select * from Users `;
    var result = await MyQuery.query(sql, { type: QueryTypes.SELECT });
    commonController.successMessage(result,"get all data successfully",res)
}


// dailyschdule
async dailyschdule(payload:any,res:Response){
      const {dayOfWeek,morningAssemblyTime,classStartTime,
      lunchBreakTime,classEndTime,schoolBusTimings,SchoolName}=payload;
      const user=await db.generalinfos.findOne({
        where:{
            SchoolName
          }
       })
     if(!SchoolName){
      commonController.errorMessage("user not found",res)
     } 
     const studentdailyschdule=await db.DailySchedules.findOne({
        where:{
            schoolId:user.id
        }
     })
     if(studentdailyschdule){
        studentdailyschdule.update({
            dayOfWeek,morningAssemblyTime,classStartTime,
            lunchBreakTime,classEndTime,schoolBusTimings   
        })
        commonController.successMessage(studentdailyschdule,"update data",res)
     }else{
        const adddailysch=await db.DailySchedules.create({
            dayOfWeek,morningAssemblyTime,classStartTime,
      lunchBreakTime,classEndTime,schoolBusTimings,schoolId:user.id
        })
     commonController.successMessage(adddailysch,"DailySchedule add successfuly",res)
     }
    }

    // get profile
    async getprofile(payload:any,res:Response){
       const {id}=payload;
       try{
     const sql=`SELECT generalinfos.id, generalinfos.SchoolName, generalinfos.address, 
     generalinfos.phone, generalinfos.website, generalinfos.inTime, generalinfos.outTime,
      dailyschedules.schoolId, dailyschedules.dayOfWeek, dailyschedules.morningAssemblyTime, 
      dailyschedules.classStartTime, dailyschedules.schoolBusTimings,
       administers.name, administers.email, administers.role, administers.department, 
       administers.phoneNumber, administers.schoolid , hours.dayOfWeek, hours.openTime,
        hours.closeTime, hours.schoolId AS_hours_userid FROM generalinfos 
        LEFT JOIN dailyschedules ON generalinfos.id = dailyschedules.schoolId 
        LEFT JOIN administers ON generalinfos.id = administers.schoolid 
        LEFT JOIN hours ON generalinfos.id =hours.schoolId
        WHERE  generalinfos.id = ${id};`
      var result = await MyQuery.query(sql, { type: QueryTypes.SELECT });
      commonController.successMessage(result,"get profile data",res)
       }catch(err){
        commonController.errorMessage("occured err",res)
       } 
    }

}
    
export default new CodeController();
// export default new hello();

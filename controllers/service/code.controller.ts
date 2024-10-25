import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
let referralCodeGenerator = require('referral-code-generator');
var otpGenerator = require('otp-generator');
const QRCode = require('qrcode');
const multer = require('multer');
import { Op } from 'sequelize';

var nodemailer = require ('nodemailer');
import { v4 as uuidv4 } from "uuid";
import { randomBytes } from 'crypto';
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
import { Error, where } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { sign } from 'crypto';
import { waitForDebugger } from 'inspector';
import e from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 4000,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: 'rajni@airai.games',
        pass: 'hzyo wuwt nlkf eznu'
    },
});






  
class CodeController {
    ///Section User Start

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










// getall data from users
async getalldata(payload:any,res:Response){
    var sql = `select * from Users `;
    var result = await MyQuery.query(sql, { type: QueryTypes.SELECT });
    commonController.successMessage(result,"get all data successfully",res)
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


    // sign up user 
    async signssup(payload: any, res: Response) {
        const { name, email, password, logintype } = payload;
    
        try {
            // Check if the user already exists
            const existingUser = await db.Newusers.findOne({ where: { email } });
    
            if (existingUser) {
                // Check the user's active status
                if (existingUser.active == 1) {
                    return commonController.successMessage(existingUser, "User Verified", res);
                } else if (existingUser.active == 2) {
                    return commonController.errorMessage("User Blocked", res);
                } else {
                    return commonController.errorMessage("User already exists", res);
                }
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
            const newuser = await db.Newusers.create({
                name,
                email,
                password: hashedPassword,
                logintype,
                active: 0 // (not yet verified)
            });
    
            // Exclude password from the response
            const newuserWithoutPassword = { ...newuser.toJSON(), password: undefined };
            return commonController.successMessage(newuserWithoutPassword, "User Created Successfully", res);
        } catch (err) {
            console.error(err);
            return commonController.errorMessage("An error occurred during sign up", res);
        }
    }
    





    
    // add and login user 
    // async addnewuser(payload: any, res: Response) {
    //     const { name, email, contact, password, logintype } = payload;
    
    //     try {
    //         const user = await db.Newusers.findOne({ where: { email } });
    
    //         if (user) {
    //             // Check if the user is blocked
    //             if (user.active == 1) {
    //                 return commonController.errorMessage(" User Blocked", res);
    //             }
    
    //             // Corrected typo here
    //             const isPasswordMatch = await bcrypt.compare(password, user.password);
    //             if (!isPasswordMatch) {
    //                 return commonController.errorMessage("Password does not match", res);
    //             }
    
    //             const token = await jwt.sign(
    //                 { email, name },
    //                 process.env.TOKEN_SECRET
    //             );
    
    //             // Return success message if the user exists
    //             return commonController.successMessage({ token }, "User Already Exist", res);
    //         } else {
    //             const hashedPassword = await bcrypt.hash(password, 10);
    //             const newuser = await db.Newusers.create({
    //                 name,
    //                 email,
    //                 contact,
    //                 password: hashedPassword,
    //                 logintype
    //             });
    
    //             const token = await jwt.sign(
    //                 { email, name },
    //                 process.env.TOKEN_SECRET
    //             );
    
    //             const newuserWithoutPassword = { ...newuser.toJSON(), password: undefined };
    //             return commonController.successMessage({ token }, "User Created Successfully", res);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         return commonController.errorMessage("An error occurred", res);
    //     }
    // }

    // login user
    async addnewuser(payload: any, res: Response) {
        const { name, email, contact, password, logintype } = payload;
    
        try {
            // Find user by email
            const user = await db.Newusers.findOne({ where: { email } });
    
            if (user) {
                if (user.active == 1) {
                    return commonController.errorMessage("User Blocked", res);
                }
    
                // Verify the password
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    return commonController.errorMessage("Password does not match", res);
                }
    
                const token = await jwt.sign(
                    { email, name },
                    process.env.TOKEN_SECRET
                );
    
                if (user.logintype == 0) { // User login
                    return commonController.successMessage({ token }, "User Already Exist", res);
                } else if (user.logintype == 1) { // google login
                    return commonController.successMessage({ token }, "User Already Exist", res);
                } else if (user.logintype == 2) {  // facebook login
                    return commonController.successMessage({ token }, "User Already Exist", res);
                }
            } else {
                // User does not exist, create a new user
                const hashedPassword = await bcrypt.hash(password, 10);
                const newuser = await db.Newusers.create({
                    name,
                    email,
                    contact,
                    password: hashedPassword,
                    logintype
                });
    
                // Generate token for the newly created user
                const token = await jwt.sign(
                    { email, name },
                    process.env.TOKEN_SECRET
                );
    
                // Exclude password from the response
                const newuserWithoutPassword = { ...newuser.toJSON(), password: undefined };
                return commonController.successMessage({ token }, "User Created Successfully", res);
            }
        } catch (err) {
            console.error(err);
            return commonController.errorMessage("An error occurred", res);
        }
    }
    




    // forgot password with email
    async forgotpassword(payload: any, res: Response) {
        const { Email } = payload;
        console.log(Email, "email>>>");
        try {
            const user = await db.Newusers.findOne({
                where: {
                    Email,
                },
            });
            console.log(user, "user??>>>>>>>>>>>");
            if (user) {
                return commonController.successMessage(user.Email, "Reset link sent to your email", res);
            } else {
                return commonController.errorMessage("User not found", res);
            }
    
        } catch (error) {
            console.error(error);
            return commonController.errorMessage("An error occurred while updating password", res);
        }
    }
    
    
// UPDATE PASSWORD
async updatepassword(payload: any, res: Response) {
    const { email, newPassword,otpValue } = payload;
    try {
        const user = await db.Newusers.findOne({
            where: {
                 email
                 }
        });

        if (!user) {
            return commonController.successMessage1("User Not Found", res);
        }
        let checkOtp = await db.UserOtps.findOne({
            where:{
                userId:user.id
            }
        })
        if(checkOtp.otpValue == otpValue){
            const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({
            password: hashedPassword ,active:1
        });
        await checkOtp.update({active:1})
        const token = jwt.sign(
            { email, id: user.id },
            process.env.TOKEN_SECRET,
        );
       commonController.successMessage( token,'Password Updated Successfully' ,res);
       return;
        }else{
            commonController.successMessage1("Invalid or expired OTP",res)
        }
        
    } catch (error) {
        console.error(error); 
        return commonController.errorMessage("An error occurred while updating password", res);
    }
}

// get profile data


async profileGet(payload: any, res: Response) {
    const { email } = payload;
  
    try {
      // Find the user by email and exclude password from the result
      const user = await db.Newusers.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
      });
  
      if (!user) {
        return commonController.successMessage1("User Not Found", res);
      }
  
      // Initialize points and level
      let points = 0;
      let level = 0;
  
      // Check refCount and set points and level accordingly
      if (user.refCount <= 10) {
        points = 50;
        level = 1;
      } else if (user.refCount <= 20) {
        points = 100;
        level = 2;
      } else if (user.refCount > 20 && user.refCount <= 50) {
        points = 200;
        level = 3;
      }
  
      // Create a response object with user data and calculated points and level
      const userProfile = {
        ...user.get(), // Spread user attributes (excluding password)
        points, 
        level, 
      };
  console.log(userProfile,"?????");
  
      // Return success message with the updated user profile
      return commonController.successMessage(userProfile, "User Profile Retrieved Successfully", res);
  
    } catch (error) {
      console.error("Error occurred:", error);
      return commonController.errorMessage("An error occurred while retrieving the profile", res);
    }
  }
  
  


// update name 
async updatename(payload:any,res:Response){
    const {name,email,photo} =payload;
    console.log(payload,"pay");
    
    try{
        const user = await db.Newusers.findOne({
            where: { 
                email
            }, 
        })
        console.log(user,"dfdfdf");
        
        if(user){
            await user.update({
                name,userImage:photo
            })
            return commonController.successMessage({},"Your name is update successfully",res)
        }
        return commonController.errorMessage("User Not Found",res)
    }catch(err){
        commonController.errorMessage("occred error",res)
    }
}

// add notification
async addnotification(payload:any,res:Response){
    const { namemessage,type,heading } =payload;
    try{
        const newNotification  = await db.Notifications.create({
            namemessage,type,heading
        })
        commonController.successMessage( newNotification, "Notification added successfully",res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }

}

async getNotification(payload: any, res: Response) {
    try {
        const notifications = await db.Notifications.findAll({
 
        });
        commonController.successMessage(notifications,"Get all Notifications",res)
    } catch (err) {
        console.error("Error fetching notifications:", err);
        commonController.errorMessage("Error fetching notifications", res);
    }
}






// create game
async createGame(payload:any, res:Response){
    try {
        const { gamename, gameimage, points, linkhomeimage, linkdetail, favorite, players, description } = payload;
  
        const newGame = await  db.Gamedetails.create({
          gamename,
          gameimage,
          points,
          linkhomeimage,
          linkdetail,
          favorite,
          players,
          description
        });
  
        return res.status(201).json({ message: 'Game created successfully', data: newGame });
      } catch (error) {
        console.error('Error creating game:', error);
        return res.status(500).json({ message: 'An error occurred while creating the game' });
      }
    
  
}

// Fetch data from Gamedetails and Dashboards tables
async getui(payload: any, res: Response) {
    try {
        const games = await db.Gamedetails.findAll();
        const dashboards = await db.Dashboards.findAll();
        const rewards = await db.Rewards.findAll();

        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        // Send leaderboard data for the last 7 days
        const sql = `
            SELECT ug.userId, SUM(ug.points) AS totalCoins, nu.name, nu.userImage,nu.username,nu.email
            FROM usergames ug
            JOIN newusers nu ON nu.id = ug.userId
            WHERE ug.createdAt >= ?
            GROUP BY ug.userId, nu.name, nu.userImage
            ORDER BY totalCoins DESC
            LIMIT 10
        `;
        
        // Execute the query using the MyQuery object
        const sevenDayData = await MyQuery.query(sql, {
            replacements: [lastWeekDate], // Use replacements to safely insert the date
            type: QueryTypes.SELECT,
        });

        // Send leaderboard data for all time
        const sql1 = `
            SELECT ug.userId, SUM(ug.points) AS totalCoins, nu.name, nu.userImage,nu.username,nu.email
            FROM usergames ug
            JOIN newusers nu ON nu.id = ug.userId
            GROUP BY ug.userId, nu.name, nu.userImage
            ORDER BY totalCoins DESC
            LIMIT 10
        `;

        // Execute the query using the MyQuery object
        const allTimeData = await MyQuery.query(sql1, {
            type: QueryTypes.SELECT,
        });

        // Initialize the leaderboard object
        const leaderboard = {
            sevenDayData,
            allTimeData,
        };

        // Send the response with all data
        commonController.successMessage({ games, dashboards, rewards, leaderboard }, "Get all UI data", res);
    } catch (err) {
        console.error("Error fetching UI data:", err); 
        commonController.errorMessage("An error occurred while fetching UI data", res);
    }
}



// user play game data
async usergamedata(payload: any, res: Response) {
    const { email, Points, gameId } = payload;
  
    try {
      const user = await db.Newusers.findOne({
        where: {
          email,
        },
      });
  
      if (!user) {
        return commonController.successMessage1('User not found', res);
      }
  
      const playgame = await db.UserGames.findOne({
        where: {
          userId: user.id,
          gameId: gameId,
        },
      });
  
      const newUserGame = await db.UserGames.create({
        userId: user.id,
        gameId: gameId,
        points: Points,
      });
  
      // Update user's coins

      await user.update({ coins: user.coins +  JSON.parse(Points) });
  
      let points = 0;
      let level = 0;
  
      // Check refCount and set points and level accordingly
      if (user.refCount <= 10) { 
        points = 50;
        level = 1;
      } else if (user.refCount <= 20) {
        points = 100;
        level = 2;
      } else if (user.refCount > 20 && user.refCount <= 50) {
        points = 200;
        level = 3;
      }
  
      // Create userProfile without password
      const userProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        logintype: user.logintype,
        coins: user.coins,
        referralCode: user.referralCode,
        userImage: user.userImage,
        active: user.active,
        username: user.username,
        refCount: user.refCount,
        level,
        points,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
  
      return commonController.successMessage(userProfile, 'Data created successfully', res);
    } catch (err) {
      console.error('Error creating user game data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  
async addCoins(payload: any, res: Response) {
    const { Email, newCoins } = payload; 
    try {
        const user = await db.Newusers.findOne({
            where: { 
                Email 
            }
        });

        if (user) {
            const updatedCoins = user.coins + newCoins;
            await user.update({
                coins: updatedCoins
            });
            commonController.successMessage(updatedCoins, "Coins updated successfully", res);
        } else {
            commonController.errorMessage("User not found", res);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        commonController.errorMessage("An error occurred", res);
    }
}

// send link to email 
async sendlink(payload:any,res:Response){
    const { Email } = payload;
    console.log(Email, "email>>>");
    try {
        const user = await db.Newusers.findOne({
            where: {
                Email,
            },
        });
           console.log(user, "user??>>>>>>>>>>>");
          // Function to generate a random string for the reset token
            const generateRandomString = (length: number): string => {
                return randomBytes(length).toString('hex'); 
            };
    
            const randomString = generateRandomString(16); 
            user.resetToken = randomString;
            user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
            await user.save();
    
            // Construct the reset link using the random string
            const resetLink = `http://192.168.29.109:4000/api/v1/member/sendlink/${randomString}`; 
            console.log(resetLink,"reste link>>>>>>>>")
            const mailOptions = {
                to: user.Email,
                subject: 'Password Reset',
                text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
            };
            await transporter.sendMail(mailOptions);
            // Redirecting to a success page
            commonController.successMessage(resetLink,"link",res)
           }catch(err){
            console.log(err,"error"); 
            commonController.errorMessage("occured error",res)
           }
            }



 
    

  
      // get profile data
      async getprofilssedata(payload: any, res: Response) {
        const { id } = payload;
        const sql = `
          SELECT 
            newusers.Email, newusers.Name, newusers.contact, newusers.id,
            player_stats.coins, player_stats.points, player_stats.level, player_stats.gameId AS player_gameId,
            favoritegames.gameId AS favorite_gameId
          FROM 
            newusers
          LEFT JOIN 
            player_stats ON newusers.id = player_stats.user_id
          LEFT JOIN 
            favoritegames ON newusers.id = favoritegames.user_id
          WHERE 
            newusers.id = :id;
        `;
        var result = await MyQuery.query(sql, {
          type: QueryTypes.SELECT,
          replacements: {
             id 
            }
        });
        commonController.successMessage(result, "get profile", res);
      }
      


      // get profile data 
      async getprofiledata(payload: any, res: Response) {
        const { id } = payload;
        const sql = `
          SELECT 
            newusers.Email, newusers.Name, newusers.contact, newusers.id,
            player_stats.coins, player_stats.points, player_stats.level, player_stats.gameId AS player_gameId,
            favoritegames.gameId AS favorite_gameId
          FROM 
            newusers
          LEFT JOIN 
            player_stats ON newusers.id = player_stats.user_id
            
          LEFT JOIN 
            favoritegames ON newusers.id = favoritegames.user_id
          WHERE 
            newusers.id = :id;
        `;
        var result = await MyQuery.query(sql, {
          type: QueryTypes.SELECT,
          replacements: { id }
        });
      
        // Process the result to aggregate data
        const profileData = {
          Email: result[0]?.Email,
          Name: result[0]?.Name,
          contact: result[0]?.contact,
          id: result[0]?.id,
          coins: result[0]?.coins,
          points: result[0]?.points,
          level: result[0]?.level,
          
          player_gameIds: [...new Set(result.map((item: any) => item.player_gameId))],
          favorite_gameIds: [...new Set(result.map((item: any) => item.favorite_gameId))]
        };
        commonController.successMessage(profileData, "get profile", res);
      }


// sign up 
// async signup(payload: any, res: Response) {
//     const { name, email, password, logintype, username } = payload;

//     // Predefined names array
//     const names: string[] = [
//         "John Smith", "Jane Doe", "Alice Johnson", "Bob Brown",
//         "Charlie Davis", "Diana Wilson", "Ethan Clark", "Fiona Martinez",
//         "George Lewis", "Hannah Walker", "Isaac Hall", "Julia Young",
//         "Kevin King", "Laura Wright", "Michael Scott", "Nancy Green",
//         "Oliver Adams", "Penny Baker", "Quinn Nelson", "Rita Carter",
//         "Steve Murphy", "Tina Rivera", "Ursula Cooper", "Victor Torres",
//         "Wendy Rogers", "Xander Sanchez", "Yara Patterson", "Zoe Reed",
//         "Aiden Hughes", "Brianna Foster"
//     ];

//     // Function to get a random name from the array
//     const getRandomName = (): string => {
//         const randomIndex = Math.floor(Math.random() * names.length);
//         return names[randomIndex];
//     };

//     try {
//         // If username is not provided, assign a random one
//         const assignedUsername = username || getRandomName();

//         // Check if the email already exists
//         const existingUser = await db.Newusers.findOne({ where: { email } });

//         if (existingUser) {
//             // If user exists, check their verification status
//             if (existingUser.active == 1) {
//                 return commonController.successMessage({}, "User Verified", res);
//             } else if (existingUser.active == 2) {
//                 return commonController.successMessage({}, "User Blocked", res);
//             } else if (existingUser.active == 0) {
//                 // User is not yet verified, resend OTP
//                 const otpEntry = await db.UserOtps.findOne({
//                     where: { userId: existingUser.id },
//                 });

//                 // Generate new OTP
//                 const otpValue = await commonController.generateOtp();

//                 if (!otpEntry) {
//                     // Create a new OTP entry if not found
//                     await db.UserOtps.create({
//                         userId: existingUser.id,
//                         otpValue,
//                         active: 0,
//                     });
//                     return commonController.successMessage1("User Already Exist", res);
//                 } else {
//                     // Update the existing OTP
//                     await db.UserOtps.update(
//                         { otpValue },
//                         { where: { userId: existingUser.id } }
//                     );
//                     return commonController.successMessage1("OTP has been updated and sent for verification.", res);
//                 }
//             }
//         }

//         // Generate a 6-digit random referral code and ensure it's unique
//         let referralCode = "";
//         let isUnique = false;

//         while (!isUnique) {
//             referralCode = Math.floor(100000 + Math.random() * 900000).toString();
//             const referralExists = await db.Newusers.findOne({
//                 where: { referralCode }
//             });
//             if (!referralExists) {
//                 isUnique = true; // Exit the loop if the code is unique
//             }
//         }

//         if (logintype == 1) {
//             const newUser = await db.Newusers.create({
//                 email,
//                 name,
//                 username: assignedUsername, // Use the assigned or provided username
//                 logintype,
//                 active: 0, // Default state for new users
//                 referralCode: referralCode // Set the generated referral code
//             });
//             const token = jwt.sign(
//                 { email, id: newUser.id },
//                 process.env.TOKEN_SECRET,
//             );
//             return commonController.successMessage(token, "User Created Successfully", res);
//         }

//         // If the user does not exist, create a new user
//         const hashedPassword = await hash(password, 10);
//         const newUser = await db.Newusers.create({
//             email,
//             password: hashedPassword,
//             name,
//             username: assignedUsername, // Use the assigned or provided username
//             logintype,
//             active: 0, // Default state for new users
//             referralCode: referralCode // Set the generated referral code
//         });

//         // Generate and save OTP for the new user
//         const otpValue = await commonController.generateOtp();
//         await db.UserOtps.create({
//             userId: newUser.id,
//             otpValue,
//             active: 0,
//         });

//         return commonController.successMessage1("User Created Successfully", res);
//     } catch (err) {
//         console.error("Error during signup:", err);
//         return commonController.errorMessage("An error occurred during signup", res);
//     }
// }

async signup(payload: any, res: Response) {
    const { name, email, password, logintype, username,referralCode } = payload;

    // Predefined names array
    const names: string[] = [
        "John Smith", "Jane Doe", "Alice Johnson", "Bob Brown",
        "Charlie Davis", "Diana Wilson", "Ethan Clark", "Fiona Martinez",
        "George Lewis", "Hannah Walker", "Isaac Hall", "Julia Young",
        "Kevin King", "Laura Wright", "Michael Scott", "Nancy Green",
        "Oliver Adams", "Penny Baker", "Quinn Nelson", "Rita Carter",
        "Steve Murphy", "Tina Rivera", "Ursula Cooper", "Victor Torres",
        "Wendy Rogers", "Xander Sanchez", "Yara Patterson", "Zoe Reed",
        "Aiden Hughes", "Brianna Foster"
    ];

    // Function to get a random name from the array
    const getRandomName = (): string => {
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    };

    try {


        // If username is not provided, assign a random one
        const assignedUsername = username || getRandomName();

        // Check if the email already exists
        const existingUser = await db.Newusers.findOne({ where: { email } });

        if (existingUser) {
            // If user exists, check their verification status
            if (existingUser.active == 1) {
                return commonController.successMessage({}, "User Verified", res);
            } else if (existingUser.active == 2) {
                return commonController.successMessage({}, "User Blocked", res);
            } else if (existingUser.active == 0) {
                // User is not yet verified, resend OTP
                const otpEntry = await db.UserOtps.findOne({
                    where: { userId: existingUser.id },
                });

                // Generate new OTP
                const otpValue = await commonController.generateOtp();
                if (!otpEntry) {
                    // Create a new OTP entry if not found
                    await db.UserOtps.create({
                        userId: existingUser.id,
                        otpValue,
                        active: 0,
                    });
                    commonController.sendEmail(email,"Otp Code for Verification",otpValue)
                    return commonController.successMessage1("User Already Exist", res);
                } else {
                    // Update the existing OTP
                    await db.UserOtps.update(
                        { otpValue },
                        { where: { userId: existingUser.id } }
                    );
                    commonController.sendEmail(email,"Otp Code for Verification",otpValue)
                    
                    return commonController.successMessage1("OTP has been updated and sent for verification.", res);
                }
            }
        }

        // Generate a 6-digit random referral code and ensure it's unique
        let referralCode = "";
        let isUnique = false;

        while (!isUnique) {
            referralCode = Math.floor(100000 + Math.random() * 900000).toString();
            const referralExists = await db.Newusers.findOne({
                where: { referralCode }
            });
            if (!referralExists) {
                isUnique = true; // Exit the loop if the code is unique
            }
        }

        if (logintype == 1) {
            const newUser = await db.Newusers.create({
                email,
                name,
                username: assignedUsername, // Use the assigned or provided username
                logintype,
                active: 0, // Default state for new users
                referralCode: referralCode // Set the generated referral code
            });
            const token = jwt.sign(
                { email, id: newUser.id },
                process.env.TOKEN_SECRET,
            );
            return commonController.successMessage(token, "User Created Successfully", res);
        }

        // If the user does not exist, create a new user
        const hashedPassword = await hash(password, 10);
        const newUser = await db.Newusers.create({
            email,
            password: hashedPassword,
            name,
            username: assignedUsername, // Use the assigned or provided username
            logintype,
            active: 0, // Default state for new users
            referralCode: referralCode // Set the generated referral code
        });

        // Generate and save OTP for the new user
        const otpValue = await commonController.generateOtp();
        await db.UserOtps.create({
            userId: newUser.id,
            otpValue,
            active: 0,
        });

        // send email code
        commonController.sendEmail(email,"Otp Code for Verification",otpValue)

       // Find the referrer by matching their referralCode
const referrer = await db.Newusers.findOne({ where: { referralCode: payload.referralCode } });
if (referrer) {
    // Increase refCount for the referrer
    const currentRefCount = referrer.refCount || 0;
    // Update refCount for referrer (only for the original referrer, not the new user)
    await referrer.update({
        refCount: currentRefCount + 1
    });
    console.log(`Referral code used, updated refCount for referrer: ${currentRefCount + 1}`);
    } else {
    console.log("Referrer not found or referral code is invalid");
    }
        return commonController.successMessage1("User Created Successfully", res);
    } catch (err) {
        console.error("Error during signup:", err);
        return commonController.errorMessage("An error occurred during signup", res);
    }
}





// LOGIN USER 
async loginuser(pay: any, res: Response) {
    const { email, password,logintype } = pay;
    console.log("pay", pay);
    try {
        // Check if user exists
        const user = await db.Newusers.findOne({
            where: { email }
        });
        if(!user){
            return commonController.successMessage1("User not exist", res);
 
        }
        if (user.active == 2) {
            return commonController.successMessage1("User Blocked", res);
        }else if(logintype == 1){
            const token = jwt.sign(
                { email, id: user.id },
                process.env.TOKEN_SECRET,
            );
            return commonController.successMessage(token,"User Login Successfully", res);
        }else {
            if(user.active != 1){
                return commonController.successMessage1("User Not Verify", res);

            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return commonController.successMessage1("Invalid Password", res);
            } 
            const token = jwt.sign(
                { email, id: user.id,name:user.name },
                process.env.TOKEN_SECRET,
            );
            // Send success response with the token
            return commonController.successMessage(token, "User Login Successfully", res);
        }
    } catch (err) {
        console.error("Error occurred during login:", err);
        return commonController.errorMessage("An error occurred during login", res);
    }
}


// verify 
async verify(payload: any, res: Response) {
    const { email, otpValue } = payload;

    try {
        // Check if the user exists
        const user = await db.Newusers.findOne({ where: { email } });

        if (!user) {
            return commonController.successMessage1("User does not exist", res);
        }

        // Check if the OTP exists for the user
        const otpEntry = await db.UserOtps.findOne({
            where: { userId: user.id, otpValue }
        });

        if (otpEntry) {
            await otpEntry.update({
                active:1
            })
            
            await user.update({active:1})
             // Generate a JWT token
             const token = jwt.sign(
                { email: user.email, id: user.id },
                process.env.TOKEN_SECRET,
            );

            return commonController.successMessage(token, "Email verified successfully", res);
        }

        return commonController.successMessage1("Invalid or expired OTP", res);
    } catch (err) {
        console.error("Error during email verification:", err);
        return commonController.errorMessage("An error occurred during email verification", res);
    }
}




// forgot password
async  forgot(payload: any, res: Response) {
    const { email } = payload;
    try {
        // Check if the user exists
        const user = await db.Newusers.findOne({ where: { email } });

        if (!user) {
            return commonController.successMessage1("User Does Not Exist", res);
        }

        const otpEntry = await db.UserOtps.findOne({ where: { userId: user.id } });

        const otpValue = await commonController.generateOtp();

        if (otpEntry) {
            await otpEntry.update({
                active: 0, 
                otpValue: otpValue, 
            });
        } else {
            await db.UserOtps.create({
                userId: user.id,
                otpValue: otpValue,
                active: 0,
            });
        }

        await user.update({
            active: 0,
        });

        return commonController.successMessage1( "OTP Sent Successfully", res);
    } catch (err) {
        console.error("Error during password reset request:", err);
        return commonController.errorMessage("An error occurred while requesting a password reset", res);
    }
}



async  sendOtpEmail(to: string, otpValue: string) {
    const mailOptions = {
        from: '"Your App Name" <your-email@example.com>', // Sender address
        to: to, // Recipient email
        subject: 'Your OTP Code', // Subject line
        text: `Your OTP code is ${otpValue}.`, // Plain text body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
    
}



// GET ALL REWARDS
async getreward (payload: any, res: Response) {
    try {
        const reward = await db.Rewards.findAll();
        commonController.successMessage(reward," Get All Rewads", res);
    } catch (err) {
        console.error("Error fetching UI data:", err); 
        commonController.errorMessage("An error occurred while fetching UI data", res);
    }
}




// redeem reward
// async redeemReward(payload: any, res: Response) {
//     const { amount,name,rewardId,fullName,phoneNumber,pinCode,address,id} = payload; 
//     try {
//         const user = await db.Newusers.findOne({
//             where: { id }
//         });
//         console.log(user, "user......");

//         if (!user) {
//            return commonController.successMessage1("User not found",res)

//         }

//         // Find the reward by ID
//         const reward = await db.Rewards.findOne({
//             where: { id: rewardId }
//         });
//         console.log(reward, "reward data");

//         if (!reward) {
//             commonController.successMessage1("Reward not found.",res)

//         }

//         // Check if the user has already redeemed this reward
//         const redeem = await db.Redeems.findOne({
//             where: {
//                 userId: user.id,
//                 rewardId: reward.id
//             }
//         });
//         console.log(redeem, "Redemption status");

//         // if (redeem) {

//         //     return res.status(400).json({ message: "Reward already redeemed" });
//         // }

//         if (user.coins >= reward.points) {  
//             const updatedPoints = user.coins - reward.points;

//             // Update user's points in the database
//             await db.Newusers.update(
//                 { coins: updatedPoints },
//                 { where: { id: user.id } }
//             );

//             // Create a new redemption record in the Redeems table
//             await db.Redeems.create({
//                 userId: user.id,
//                 rewardId: reward.id,
//                 amount: reward.points, // Record the points deducted
//                 name: reward.name,
//                 fullName,
//                 phoneNumber, 
//                 pinCode,     
//                 address      
//             });

//             // Success response
//             return res.status(200).json({ message: "Reward redeemed successfully" });
//         } else {
//             commonController.successMessage1("Insufficient points to redeem this reward.",res)
//         }

//     } catch (err) {
//         console.error(err, "error");
//         return res.status(500).json({ message: "An error occurred while redeeming the reward." });
//     }
// }

async redeemReward(payload: any, res: Response) {
    const { amount, name, rewardId, fullName, phoneNumber, pinCode, address, id } = payload; 
    
    try {
        // Find the user by ID
        const user = await db.Newusers.findOne({
            where: { id }
        });
        console.log(user, "user......");

        if (!user) {
           return commonController.successMessage1("User not found", res);
        }

        // Find the reward by ID
        const reward = await db.Rewards.findOne({
            where: { id: rewardId }
        });
        console.log(reward, "reward data");

        if (!reward) {
            return commonController.successMessage1("Reward not found.", res);
        }

        // Check if the user has enough coins to redeem the reward
        if (user.coins >= reward.points) {
            const updatedPoints = user.coins - reward.points;

            // Update user's coins in the database
            await db.Newusers.update(
                { coins: updatedPoints },
                { where: { id: user.id } }
            );

            // Create a new redemption record in the Redeems table
            await db.Redeems.create({
                userId: user.id,
                rewardId: reward.id,
                amount: reward.points, // Record the points deducted
                name: reward.name,
                fullName,
                phoneNumber, 
                pinCode,     
                address      
            });

            // Success response
            return res.status(200).json({ message: "Reward redeemed successfully" });
        } else {
            return commonController.successMessage1("Insufficient points to redeem this reward.", res);
        }

    } catch (err) {
        console.error(err, "error");
        return res.status(500).json({ message: "An error occurred while redeeming the reward." });
    }
}






 // get redeem history 
 async getallredeem(payload: any, res: Response) {
    const { id } = payload;
    try {
        const redemptions = await db.Redeems.findAll({
            where: {
                userId: id,
            },
        });

        const awardIds = redemptions.map(redeem => redeem.rewardId);

        const rewards = await db.Rewards.findAll({
            where: {
                id: awardIds,
            },
            attributes: ['id', 'image'], // Fetch only the required fields
        });

        // Map rewards to their corresponding redemptions
        const redemptionWithImages = redemptions.map(redeem => {
            const reward = rewards.find(r => r.id === redeem.rewardId);
            return {
                amount: redeem.amount, // Include the amount
                name: redeem.name, // Include the name
                status: redeem.status, // Include the status
                image: reward ? reward.image : null, // Add the reward image
                createdAt: redeem.createdAt, // Include createdAt

                
            };
        });

        return commonController.successMessage(redemptionWithImages, "Fetched redemption records successfully", res);
    } catch (error) {
        console.error(error, "error");
        return commonController.errorMessage("An error occurred while fetching redemption records.", res);
    }
}




async getTopUser(payload: any, res: Response) {
    const { email } = payload;
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7); // Calculate the date from one week ago

    try {
        // Define your SQL query with a JOIN to fetch name and userImage
        const sql = `
            SELECT ug.userId, SUM(ug.points) AS totalCoins, nu.name, nu.userImage
            FROM usergames ug
            JOIN newusers nu ON nu.id = ug.userId
            WHERE ug.createdAt >= ?
            GROUP BY ug.userId, nu.name, nu.userImage
            ORDER BY totalCoins DESC
            LIMIT 10
        `;
        
        // Execute the query using the MyQuery object
        const sevenDayData = await MyQuery.query(sql, {
            replacements: [lastWeekDate], // Use replacements to safely insert the date
            type: QueryTypes.SELECT,
        });

        const sql1 = `
        SELECT ug.userId, SUM(ug.points) AS totalCoins, nu.name, nu.userImage
        FROM usergames ug
        JOIN newusers nu ON nu.id = ug.userId
        GROUP BY ug.userId, nu.name, nu.userImage
        ORDER BY totalCoins DESC
        LIMIT 10
    `;
    
    // Execute the query using the MyQuery object
    const allTimeData = await MyQuery.query(sql1, {
        type: QueryTypes.SELECT,
    });

        // Return success message with results
        return commonController.successMessage({sevenDayData,allTimeData}, "Data retrieved successfully", res);
    } catch (err) {
        console.error('Error retrieving game data:', err);
        return commonController.errorMessage("An error occurred while fetching game data", res);
    }
}







}

    
export default new CodeController();
// export default new hello();

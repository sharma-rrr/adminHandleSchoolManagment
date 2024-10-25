import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
const nodemailer = require("nodemailer");
class CommonController {
   
   
    generateOtp(){
        return Math.floor(100000 + Math.random() * 900000);
    }
    bcryptPassword ( password) {
       bcrypt.genSalt(10, function(err, salt) {
        if (err) 
          return err;
    
        bcrypt.hash(password, salt, function(err, hash) {
          return  hash;
        });
      });
    };
    
    comparePassword = function(plainPass, hashword) {
       bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
           return err == null ?
               isPasswordMatch:
               err;
       });
    };
    successMessage(data: any, msg: string, res: Response) {
        try{
        return res.status(200).send({
            message: msg,
            data
        });}catch(e){
            console.log(e);
        }
    }
   
    
    errorMessage(msg: string, res: Response) {
       try{
        return res.status(400).send({
            error: {
                message: msg
            }
        });}catch(e){
            console.log(e);
        }
    }

    successMessage1( msg: string, res: Response) {
        try{
        return res.status(200).send({
            message: msg,
            
        });}catch(e){
            console.log(e);
        }
    }
  
 //  nodemailer
 transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "rajni@airai.games",
      pass: "bhaw tuhk ihvw snvr",
    },
  });


  sendEmail = async (email, subject, otpCode) => {
    console.log("Sending email to:", email);
    console.log("Subject:", subject);

    // HTML template with OTP code
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                .container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px; }
                .header { background-color: #4CAF50; color: white; text-align: center; padding: 10px; border-radius: 10px 10px 0 0; }
                .body { padding: 20px; text-align: center; }
                .otp { font-size: 24px; color: #333; background-color: #e2e2e2; padding: 10px; border-radius: 5px; display: inline-block; }
                .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>OTP Code for Verification</h2>
                </div>
                <div class="body">
                    <p>Dear User,</p>
                    <p>Your OTP code for verification is:</p>
                    <p class="otp">${otpCode}</p>
                    <p>Please use this code to complete your verification process.</p>
                </div>
                <div class="footer">
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Create a transporter object using Gmail SMTP
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajni@airai.games',
            pass: 'bhaw tuhk ihvw snvr', // Replace this with your real app password
        },
    });

    // Email details
    const mailDetails = {
        from: 'rajni@airai.games', // Sender address
        to: email,
        subject,
        html: htmlContent,
    };

    try {
        const info = await mailTransporter.sendMail(mailDetails);
        console.log("Email sent successfully:", info.messageId);
    } catch (err) {
        console.error('Error occurred:', err);
    }
};




}
export default new CommonController();
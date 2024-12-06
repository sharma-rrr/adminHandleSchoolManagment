import express, { Request, Response } from 'express';
var cors:any = require('cors');
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit'; // Import PDFKit
import auth from './middleware/auth';
import userRoute from './routes/user.routes';
import memberRoute from './routes/member.routes';
import adminRoute from './routes/admin.routes';
import avtarroute from './routes/avatar.routes'
import db from './models';
import axios from 'axios';
const OneSignal = require('onesignal-node'); // Import the OneSignal SDK
// Initialize the client with your OneSignal App ID and API key

const app = express();
app.options('*', cors());
const server = require('http').createServer(app);
const port = process.env.PORT || 4000; 

 //  Enable All CORS Requests 
var cors = require('cors')
app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


// With middleware
app.use('/verify', function (req, res, next) {
    console.log("Authenticate and Redirect")
    res.redirect('/user');
    next();
});

app.get('/user', function (req, res) {
    res.send("User Page");
});


 // REDIRECT FUNTION 
 // Without middleware
app.get('/', function (req, res) {
    res.redirect('/test');
});
app.get('/test', function (req, res) {
    res.send("Redirected to test Page");
  });

app.use(express.json());
app.use(express.static('resources'));
app.use('/profile', express.static(path.join(__dirname, 'profile')));

// Function to send login credentials email and read loginCredential.html file, attach PDF
const sendLoginCredentials = (toEmail: string, username: string, password: string) => {
  // Read the HTML file
  const filePath = path.join(__dirname, 'public/loginCredential.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }
      // Replace placeholders with actual values in HTML
      const htmlContent = data.replace('USERNAME', username).replace('PASSWORD', password);

      // Create a PDF file with the credentials
      const pdfDoc = new PDFDocument({
          size: 'A4', // Standard A4 size
          margins: { top: 50, bottom: 50, left: 72, right: 72 }, // Margin sizes
      });
      const pdfPath = path.join(__dirname, 'public', 'loginCredentials.pdf');

      pdfDoc.pipe(fs.createWriteStream(pdfPath)); // Pipe to a writable file stream
      
      pdfDoc.moveDown(2); // Add space after logo
      pdfDoc.fontSize(25).text('Login Credentials', {
          align: 'center',
          underline: true // Adding an underline to the title
      });

      pdfDoc.moveDown(2); // Adding vertical space after the title

      pdfDoc.fontSize(12).text(`Dear User,`, { align: 'left' });
      pdfDoc.text(`Please find below your login credentials:`, { align: 'left' });
      pdfDoc.moveDown();

      // Add styled login credentials
      pdfDoc.fontSize(14).fillColor('#333').text(`Email: ${toEmail}`); // Removed username from email line

      pdfDoc.moveDown();
      pdfDoc.fontSize(14).fillColor('#333').text(`Username: `, { continued: true })
          .fillColor('#007bff').text(`${username}`); // Username is displayed separately

      pdfDoc.moveDown();
      pdfDoc.fontSize(14).fillColor('#333').text(`Password: `, { continued: true })
          .fillColor('#ff0000').text(`${password}`, { underline: true }); // Highlight password in red

      // Add horizontal line for separation
      pdfDoc.moveDown(2);
      pdfDoc.fillColor('#000').lineWidth(1).moveTo(72, pdfDoc.y).lineTo(520, pdfDoc.y).stroke();
      pdfDoc.moveDown();

      // Add some additional instructions or disclaimer
      pdfDoc.fontSize(10).fillColor('#777').text('Please keep this information confidential and secure.', {
          align: 'center',
      });

      pdfDoc.end(); // Finalize the PDF file
      // Create a transporter for sending the email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: true,
          auth: {
              user: 'rajni@airai.games',
              pass: 'hzyo wuwt nlkf eznu'
          },
      });
      const mailOptions = {
          from: 'rajni@airai.games',
          to: toEmail,
          subject: 'Your Login Credentials',
          html: htmlContent, // Use the HTML content for the email body
          attachments: [
              {
                  filename: 'loginCredentials.pdf',
                  path: pdfPath,
                  contentType: 'application/pdf',
              }
          ],
      };

      // Send the email after a slight delay to ensure PDF is written
      setTimeout(() => {
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.error('Error sending email:', error);
              } else {
                  console.log('Email sent:', info.response);
              }
          });
      }, 1000); // Wait 1 second to ensure the PDF is saved
  });
};

// get photo
app.use("/avatars", express.static(__dirname + "/avatars"));
app.use("/", express.static(__dirname + "/avatars"));

// Other routes
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/member', auth, memberRoute);
app.use('/api/v1/avtar', auth, avtarroute);

db.sequelize.sync().then(() => {
    server.listen(port, async () => {
        console.log('App Started');
    });
});

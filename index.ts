import express ,{ Request, Response, NextFunction} from 'express';

var cors:any = require('cors');

 import auth from './middleware/auth';

import userRoute from './routes/user.routes'
import memberRoute from './routes/member.routes'
import adminRoute from './routes/admin.routes'
// import {validationError} from './helpers/validator.controller';

var cron = require('node-cron');
const app=express();
app.options('*', cors());
const server = require('http').createServer(app);

const port =process.env.PORT||4000;
app.get("/", function (req,res) {
  res.send("Response from the GET request")
  });
import db from './models';

app.use(express.json());
app.use(express.static('resources'));

//for image start
app.use("/profile", express.static(__dirname + "/profile"));
app.use(function(req:Request, res:Response, next:NextFunction) {
  console.log("?>?>");
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

// app.use('/images',express.static(__dirname+'/resources/static/assets/uploads'))
//  app.use('/api/v1',)
 app.use('/api/v1/auth',userRoute);
 app.use('/api/v1/admin',adminRoute);
 app.use('/api/v1/member',auth,memberRoute);
 app.get("/api/v1/welcome", auth, (req, res) => {
  res.status(200).send("data get successfully ");
});

// app.use('/api/v1/nft',nftRoute);
// app.use(validationError);

app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use((err:any, req:Request, res:Response, next:any) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err } });
});


  
 db.sequelize.sync().then(()=>{
  server.listen(port,async()=>{
    console.log('App Started');
  
  // cron.schedule('*/3 * * * *', async () => {
  //     console.log('running a task every 10 min');
  //     await codeController.transferIdDepositAssets();
  //    // await tradeController.putOrderOnBinance();
  //   });
  
  
  })
 });



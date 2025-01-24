import { dbConnect } from "./db";
import express from "express";
import userRouter from "./routes/userRoutes";

require('dotenv').config();

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

const app = express();

app.use(express.json());
app.use("/api/v1",userRouter)

dbConnect().then(()=>{
    
    app.listen(3000,function(){
        console.log("server is started ");
    });
}).catch((e)=>{
    console.log("db connection failed",e.message)
})




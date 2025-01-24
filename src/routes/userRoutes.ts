import { Request, Response, Router } from "express";
import {  z } from "zod";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';

const router = Router();

export const signupSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string()
        .min(6, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long")
      
});

export type signupSchemType = z.infer<typeof signupSchema>;

router.post("/signup",async (req:Request,res:Response)=>{
    try {
        const {username,password} = signupSchema.parse(req.body);
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
       await newUser.save();

       
        
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
    }
        
})

router.get("/signin",(req:Request,res:Response)=>{

})

export default router;
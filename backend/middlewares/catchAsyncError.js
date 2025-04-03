// import { promises } from "nodemailer/lib/xoauth2"

export const catchAsynError= (func)=>{
    return (req,res,next)=>{
        Promise.resolve(func(req,res,next)).catch(next);
    }
}
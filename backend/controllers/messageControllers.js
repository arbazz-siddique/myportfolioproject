import {catchAsynError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import {Message} from "../models/messagemodel.js"

export const sendMessage=  catchAsynError(async(req,res,next)=>{
    const {senderName, subject , message} =req.body;

    if(!senderName || !subject ||!message){
        return next(new ErrorHandler("please full fill the form ", 400))
    }

    const data= await Message.create({senderName,subject,message}); 

    res.status(200).json({
        success:true,
        message:"message sent ",
        data
    })
})

export const getAllMessage = catchAsynError(async(req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        scucces:true,
        messages,
    })
})

export const deleteMessage = catchAsynError(async(req,res,next)=>{
    const {id} = req.params;
    const message = await Message.findById(id);
    console.log(message)
    if(!message){
        return next(new ErrorHandler("Message was already deleted", 400))
    }
    
    await message.deleteOne();
    res.status(200).json({
        success:true,
        message: "message Deleted"
    })


})
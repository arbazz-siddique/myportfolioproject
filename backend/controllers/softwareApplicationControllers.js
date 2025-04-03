import { catchAsynError } from "../middlewares/catchAsyncError.js"
import ErrorHandler, {} from "../middlewares/error.js"
import {softwareApplication} from "../models/softwareApplicationmodel.js"
import { v2 as cloudinary } from "cloudinary";

export const addApplication = catchAsynError(async(req,res,next)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software Application icon/svg/img is requried!", 400));
      }
      
      const {svg} = req.files;
      const {name} = req.body;

      if(!name){
        return next(new ErrorHandler("software Application name is requried!", 404))
      }
    
      const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        { folder: "software Aplication icons" }
      );
    
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "cloudinary Error:",
          cloudinaryResponse.error || "unkonw cloudinary error"
        );
      }
    
    const softwareApplications = await softwareApplication.create({
        name,
        svg:{
            public_id: cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        }
    });
    
    res.status(200).json({
        success:true,
        message:"software Application Added Successfully!",
        softwareApplications,
    })


})

export const deleteApplication = catchAsynError(async(req,res,next)=>{
    const {id} = req.params;
    const softwareApplications = await softwareApplication.findById(id);
    if(!softwareApplications){
        return next(new ErrorHandler("your application is not found oops!",408));
    }
    const softwareApplicationsvg= softwareApplications.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationsvg)
    await softwareApplications.deleteOne();

    res.status(200).json({
        success:true,
        message:"Your Application Deleted Successfully",
        
    })
})

export const getAllApplication = catchAsynError(async(req,res,next)=>{
    const softwareApplications = await softwareApplication.find();
    
        res.status(200).json({
            success:true,
            message:"application are:",
            softwareApplications
        })
})
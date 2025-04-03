import { catchAsynError } from "../middlewares/catchAsyncError.js"
import {Timeline} from "../models/timelinemodel.js"
import ErrorHandler, {} from "../middlewares/error.js"

export const postTimeLine = catchAsynError(async(req,res,next)=>{
    const {title,description,from,to}= req.body;
    const newTimeline = await Timeline.create({
        title,
        description,
         timeline:{from,to}
        })
    res.status(200).json({
        success:true,
        message:"your timeline is added",
        newTimeline
    })
})


export const deleteTimeLine = catchAsynError(async(req,res,next)=>{
    const {id}= req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline){
        return next( new ErrorHandler("could not find Timeline 😕😵"))
    }
    await timeline.deleteOne()

    res.status(200).json({
        success:true,
        message:"Timeline deleted successfully! 😁"
    })
})

export const getAllTimeLine = catchAsynError(async(req,res,next)=>{
    const timelines = await Timeline.find();
    res.status(200).json({
        success:true,
        timelines
    })
})
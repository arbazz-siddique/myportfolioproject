
import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "title is required"],
    },
    description:{
        type:String,
        required:[true, "Description is requried"]
    },
    timeline:{
        from:{
            type:String,
            required:[true,"starting is required you have to enter!😒"]
        },
        to:String
    }
},{timestamps:true})


export const Timeline = mongoose.model("Timeline", timelineSchema);
import mongoose, { model } from "mongoose";

const softwareApplicationSchmea = new mongoose.Schema({
    name:String,
    svg:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
},{timeseries:true})

export const softwareApplication = mongoose.model("softwareApplication",softwareApplicationSchmea)
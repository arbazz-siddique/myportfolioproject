
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName:{
        type:String,
        minLength:[2, "sender name must be contain atleast two character"],
    },
    subject:{
        type:String,
        minLength:[2,"subejct must be contain at least two characters"]
    },
    message:{
        type:String,
        minLength:[2,"message must be contain at least two characters"]
    }
},{timestamps:true})


export const Message = mongoose.model("Message", messageSchema);
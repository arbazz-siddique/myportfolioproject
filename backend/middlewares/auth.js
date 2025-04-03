import {User} from "../models/usermodel.js"
import {catchAsynError} from "./catchAsyncError.js"
import ErrorHandler from "./error.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = catchAsynError(async(req, res, next)=>{
    const {token} = req.cookies;
    // console.log(req.cookies)
    if(!token){
        return next(new ErrorHandler("Opps user is not authenticated sorry!!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();

})
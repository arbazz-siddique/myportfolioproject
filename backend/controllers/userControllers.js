import { catchAsynError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/usermodel.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtTokenUtils.js";
import { sendEmail } from "../utils/sendEmailUtils.js";
import crypto from "crypto"


export const register = catchAsynError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avtar, resume are required !", 400));
  }
  
  const { avtar, resume } = req.files;

  const cloudinaryResForAvtar = await cloudinary.uploader.upload(
    avtar.tempFilePath,
    { folder: "Avtars" }
  );

  if (!cloudinaryResForAvtar || cloudinaryResForAvtar.error) {
    console.error(
      "cloudinary Error:",
      cloudinaryResForAvtar.error || "unkonw cloudinary error"
    );
  }

  const cloudinaryResForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "Resume" }
  );

  if (!cloudinaryResForResume || cloudinaryResForResume.error) {
    console.error(
      "cloudinary Error:",
      cloudinaryResForResume.error || "unkonw cloudinary error"
    );
  }

  const {
    fullname,
    email,
    phone,
    aboutme,
    password,
    portfolioURL,
    githuburl,
    instagramurl,
    linkedInurl,
  } = req.body;

  const user = await User.create({
    fullname,
    email,
    phone,
    aboutme,
    password,
    portfolioURL,
    githuburl,
    instagramurl,
    linkedInurl,
    avtar:{
        public_id: cloudinaryResForAvtar.public_id,
        url: cloudinaryResForAvtar.secure_url,
    },
    resume:{
        public_id: cloudinaryResForResume.public_id,
        url: cloudinaryResForResume.secure_url
    },

  });
  
  generateToken(user, "registered succsefully!", 201, res);

});


export const login = catchAsynError(async(req,res, next)=>{
  const {email, password} = req.body

  if(!email || !password){
    return next (new ErrorHandler("Email and password are required!!"));
  }

  const user = await User.findOne({email}).select("+password")
  
  if(!user){
    return next(new ErrorHandler("Opps user not found!! register "));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if(!isPasswordMatch){
    return next(new ErrorHandler("Opps please check email and password again"))
  }

  generateToken(user, "Logged In", 200, res);

})

export const logout = catchAsynError(async(req,res,next)=>{
  res.status(200).cookie("token", "", {
    expires:new Date(Date.now()),
    httpOnly:true,
    sameSite:"none",
    secure:true,
  }).json({
    success:true,
    message:"you are logout!"
  })
})

export const getUser = catchAsynError(async(req,res,next)=>{
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  })
})

export const updateProfile = catchAsynError(async(req,res,next)=>{
  const newUserData= {
    fullname: req.body.fullname,
    email:req.body.email,
    phone: req.body.phone,
    aboutme: req.body.aboutme,
    portfolioURL: req.body.portfolioURL,
    githuburl: req.body.githuburl,
    instagramurl: req.body.instagramurl,
    linkedInurl: req.body.linkedInurl,
    twitterurl:req.body.twitterurl
  };

  if(req.files && req.files.avtar){
    const avtar= req.files.avtar;
    const user= await User.findById(req.user.id);
    const profileImageId = user.avtar.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avtar.tempFilePath,
      {folder:"Avtars"}
    );

    newUserData.avtar={
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  if(req.files && req.files.resume){
    const resume= req.files.resume;
    const user= await User.findById(req.user.id);
    const ResumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(ResumeId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {folder:"Resume"}
    );

    newUserData.resume={
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });

  res.status(200).json({
    success:true,
    message:"profile updated",
    user,
  })

})

export const updatePassword= catchAsynError(async(req,res,next)=>{
  const {currentPassword, newPassword, confirmPassword }= req.body
  
  if(!currentPassword || !newPassword || !confirmPassword ){
    return next(new ErrorHandler("please enter the required fileds", 400))
  }

  const user= await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(currentPassword)

  if(!isPasswordMatch){
    return next(new ErrorHandler("incorrect current password try again", 400));
  }

  if(newPassword !== confirmPassword ){
    return next(new ErrorHandler("doesn't match with confirmPassword ", 400))
  }

  user.password= newPassword;
  user.save();

  res.status(200).json({
    success:true,
    message:"password changed successfully"
  })

})

export const getUserPortfolio = catchAsynError(async(req,res,next)=>{
  const id="67e31b7ae24550f86b3ea884";
  const user = await User.findById(id)

  res.status(200).json({
    success:true,
    user,
  })
})

export const forgetPassword = catchAsynError(async(req,res,next)=>{
  const user = await User.findOne({email: req.body.email});

  if(!user){
    return next(new ErrorHandler("user not found try again!", 404));
  }

  const resetToken= user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
 
  console.log("user", user)
  const resetPasswordUrl= `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`

  const message= `your reset password token is:- \n\n ${resetPasswordUrl} \n\n if you've not request for this please ignore it`;

  try{
    await sendEmail({
      email: user.email,
      subject:"personal protfolio dashborad recovery password",
      message, 
    });
    res.status(200).json({
      success:true,
      message:`email sent to ${user.email} successfully! `
    });
  }
  catch(error){
    user.resetPasswordExpire= undefined;
    user.resetPasswordToken= undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500))
  }
})

export const resetPassword= catchAsynError(async(req,res,next)=>{
  const {token} = req.params;
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    tokenExpired: { $ne: true },
  })

  if(!user){
    return next( new ErrorHandler("reset password token is invalid or expired!", 400))
  }

  if(req.body.password !== req.body.confirmPassword ){
    return next(new ErrorHandler("password are not match try again!"))
  }

  user.password=req.body.password;
  user.resetPasswordExpire=undefined;
  user.resetPasswordToken=undefined;

  await user.save();
  generateToken(user," Reseted password successfully!!",200, res);

})
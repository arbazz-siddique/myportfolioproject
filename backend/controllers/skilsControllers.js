import { catchAsynError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Skill } from "../models/skilsmodel.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkils = catchAsynError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("skils svg or image requried!", 404));
  }

  const { svg } = req.files;
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    return next(new ErrorHandler("title and proficency must required!", 405));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "skils icons or images" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unkown cloudinary Error"
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Skills added successfully",
    skill,
  });
});

export const deleteSkils = catchAsynError(async (req, res, next) => {
  const { id } = req.params;
  const DeleteSkill = await Skill.findById(id);

  if (!deleteSkils) {
    return next(new ErrorHandler("OOPS,Skils are not found, try again"));
  }

  const DeleteSkillsvg = DeleteSkill.svg.public_id;

  await cloudinary.uploader.destroy(DeleteSkillsvg);
  await DeleteSkill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skils deleted SuccessFully...",
  });
});

export const updateSkils = catchAsynError(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("OOPS! Skill you want not found", 404));
  }

  const { proficiency } = req.body;
  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators:true,
      useFindAndModify:false,
    }
  );

  res.status(200).json({
    success:true,
    message:"Skill Is Updated Successfully",
    skill
  })
});

export const getAllSkils = catchAsynError(async (req, res, next) => {
    const skills = await Skill.find();
    res.status(200).json({
        success:true,
        "message":"Your All Skills are: ",
        skills
    })
});

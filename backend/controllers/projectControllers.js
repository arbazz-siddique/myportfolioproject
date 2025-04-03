import { catchAsynError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectmodel.js";
import { v2 as cloudinary } from "cloudinary";

export const addProject = catchAsynError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("project image is requried!"));
  }

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if(
    !title ||
   !description ||
   !gitRepoLink ||
   !projectLink ||
   !technologies ||
   !stack ||
   !deployed
  ){
    return next(new ErrorHandler("please provide all the required fields!!", 404))
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {folder:"project image/ banners"}
  );

  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error(
        "Cloudinary Error",
        cloudinaryResponse.error || "Unknown Cloudinary Errors"
    )
    return next(new ErrorHandler("Failed to Upload Project Banner/Image to cloudinary",500))
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
    },
  })
  
// 201 is for create something like project, user
  res.status(201).json({
    success:true,
    message:"Project Add Successfully ",
    project,
  })


});

export const getAllProject = catchAsynError(async (req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({
    success:true,
    "message":"Your All Project are: ",
    projects
})
});

export const deleteProject = catchAsynError(async (req, res, next) => {
    const {id}= req.params;
    const DeleteProject= await Project.findById(id);

    if(!DeleteProject){
        return next(new ErrorHandler("OOPS, Project not found try again!"))
    }

    const DeleteProjectBanner= DeleteProject.projectBanner.public_id;

    await cloudinary.uploader.destroy(DeleteProjectBanner)
    await DeleteProject.deleteOne();

    res.status(200).json({
        success:true,
        message:"Your Project Is Deleted Successfully yah.",
    })

});

export const getSingleProject = catchAsynError(async (req, res, next) => {
    const {id}= req.params;
    const project= await Project.findById(id);
    res.status(200).json({
        success:true,
        message:"Your Project Found",
        project
    })
});

export const updateProject = catchAsynError(async (req, res, next) => {
    const newProjectData= {
    title:req.body.title,
    description:req.body.description,
    gitRepoLink:req.body.gitRepoLink,
    projectLink:req.body.projectLink,
    technologies:req.body.technologies,
    stack:req.body.stack,
    deployed:req.body.deployed
    }

    if(req.files && req.files.projectBanner){
        const projectBanner= req.files.projectBanner;
        const project= await Project.findById(req.params.id);
        const projectBannerid = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectBannerid);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectBanner.tempFilePath,
          {folder:"project image/ banners"}
        );
    
        newProjectData.projectBanner={
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      }

      const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
      });

      res.status(200).json({
        success:true,
        message:"Project updated successfully",
        project,
      })
});

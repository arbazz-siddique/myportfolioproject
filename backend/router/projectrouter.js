import express from "express";
import { addProject, getAllProject, deleteProject, getSingleProject,updateProject } from "../controllers/projectControllers.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/add", isAuthenticated, addProject);
router.get("/getall", getAllProject);
router.get("/get/:id", getSingleProject);
router.delete("/delete/:id", isAuthenticated, deleteProject );
router.put("/update/:id", isAuthenticated, updateProject );


export default router
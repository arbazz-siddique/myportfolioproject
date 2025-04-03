import express from "express";
import {addNewSkils,deleteSkils,updateSkils,getAllSkils} from "../controllers/skilsControllers.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router= express.Router();

router.post("/add", isAuthenticated, addNewSkils);
router.delete("/delete/:id", isAuthenticated, deleteSkils);
router.put("/update/:id", isAuthenticated, updateSkils);
router.get("/getall", getAllSkils)

export default router;

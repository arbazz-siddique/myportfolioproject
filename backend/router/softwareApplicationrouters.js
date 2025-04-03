import express from "express";
import { addApplication, deleteApplication, getAllApplication } from "../controllers/softwareApplicationControllers.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/add", isAuthenticated, addApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication );
router.get("/getall", getAllApplication);


export default router
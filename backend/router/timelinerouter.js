import express from "express";
import { postTimeLine, deleteTimeLine, getAllTimeLine } from "../controllers/timelineControllers.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/add", isAuthenticated, postTimeLine);
router.delete("/delete/:id", isAuthenticated, deleteTimeLine );
router.get("/getall", getAllTimeLine);


export default router
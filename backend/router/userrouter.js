import express from "express";
import { register,login, logout, getUser, updateProfile, updatePassword, getUserPortfolio, forgetPassword, resetPassword } from "../controllers/userControllers.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);
router.get("/me",getUser)
router.put("/update/profile", isAuthenticated,updateProfile)
router.put("/update/password", isAuthenticated, updatePassword)
router.get("/profile/protfolio", getUserPortfolio)
router.post("/password/forget", forgetPassword)
router.put("/password/reset/:token", resetPassword)



export default router

// put means update
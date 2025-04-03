import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import {errormiddleware} from "./middlewares/error.js"
import messagerouter from "./router/messagerouter.js"
import userrouter from "./router/userrouter.js"
import timelineRouter from "./router/timelinerouter.js"
import softwareApplicationrouters from "./router/softwareApplicationrouters.js"
import skillRouter from "./router/skilsrouter.js"
import projectRouter from "./router/projectrouter.js"

const app = express();

dotenv.config({path:"./config/config.env"});

app.use(
    cors({
    origin:[process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
})
);

app.use("/api/v1/message", messagerouter)
app.use("/api/v1/user", userrouter)
app.use("/api/v1/timeline",timelineRouter)
app.use("/api/v1/softwareApplication",softwareApplicationrouters)
app.use("/api/v1/skill", skillRouter)
app.use("/api/v1/project",projectRouter)

dbConnection();
app.use(errormiddleware);

export default app;
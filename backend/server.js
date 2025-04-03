import app from "./app.js";
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINAY_CLOUD_NAME ,
    api_key: process.env.CLOUDINAY_API_KEY ,
    api_secret: process.env.CLOUDINAY_API_SECRET ,
})

dotenv.config({path:"./config/config.env"});

const PORTS = process.env.PORT || 4000;
app.listen(PORTS, ()=>{
    console.log(`server listning at ${PORTS}`);
});


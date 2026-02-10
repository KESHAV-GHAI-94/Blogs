const express= require("express");
const pool = require("./config/db");
const app = express();
require("dotenv").config();
require("./utils/sendEmail");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const IndexRouter = require("./routers/IndexRouter");
const SignupRouter = require("./routers/SignupRouter");
const LoginRouter = require("./routers/LoginRouter");
const HomeRouter = require("./routers/HomeRouter");
app.use("/",IndexRouter);
app.use("/sign-up",SignupRouter);
app.use("/login",LoginRouter);
app.use("/Home",HomeRouter);
app.listen(3000,()=>{
    console.log(`your port is running on ${process.env.PORT}`)
})
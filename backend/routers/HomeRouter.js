const express= require("express");
const HomeRouter = express.Router();
require("dotenv").config();
HomeRouter.get("/", (req,res)=>{
    res.send("home page welcome back!");
    // here i will add view of some content posts like wordpress homepage
})
module.exports =HomeRouter;
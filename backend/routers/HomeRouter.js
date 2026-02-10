const express= require("express");
const HomeRouter = express.Router();
const {Viewposts,detailedpost} = require("../controllers/Postcontroller/postcontrol");

//api which displays all posts public

HomeRouter.get("/",Viewposts);

//api for opening post page 

HomeRouter.get("/post/:id",detailedpost);

module.exports =HomeRouter;
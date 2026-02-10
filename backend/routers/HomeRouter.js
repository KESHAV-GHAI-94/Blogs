const express= require("express");
const HomeRouter = express.Router();
const auth = require("../middlewares/auth");
const {Viewposts,detailedpost,likePost,unlikePost} = require("../controllers/Postcontroller/postcontrol");

//api which displays all posts public

HomeRouter.get("/",Viewposts);

//api for opening post page 

HomeRouter.get("/post/:id",detailedpost);

//API FOR likes/dislikes
HomeRouter.post("/post/:id/like",auth,likePost);
HomeRouter.post("/post/:id/unlike",auth,unlikePost)
module.exports =HomeRouter;
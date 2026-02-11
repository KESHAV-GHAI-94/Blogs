const express = require("express");
const multer = require("multer");
const PostRouter = express.Router();
const auth = require("../middlewares/auth");
const {Postcreated} = require("../controllers/Postcontroller/postcontrol");
const upload = multer({
    storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});
//api use to open createposts
PostRouter.get("/create-post", auth,async(req,res)=>{
    res.json({
    message: "Open Create Post Page",
    });
})

PostRouter.post("/create-post",auth,upload.single("image"),Postcreated);
module.exports = PostRouter;
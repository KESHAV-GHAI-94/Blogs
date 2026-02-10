const express= require("express");
const IndexRouter = express.Router();
require("dotenv").config();
IndexRouter.get("/", (req,res)=>{
    res.send("hello keshav welcome back!");
    // here i will add view of some content like wordpress indexpage
})
IndexRouter.post("/logout", (req, res) => {
res.clearCookie("authToken");
return res.json({
    message: "Logged out successfully"
});
});
module.exports =IndexRouter;
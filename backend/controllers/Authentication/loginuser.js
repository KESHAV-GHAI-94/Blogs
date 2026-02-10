const {findUserByEmail} = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const loginuser = async(req,res) =>{
    try{
        const {email,password}= req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(400).send("user not found!");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
        return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
        res.cookie("authToken", token, {
        maxAge: 60 * 60 * 1000  // used for 1hr
        });
        
        res.status(200).json({
            message: "Login successful",
            user:{id:user.id,name:user.name,email:user.email}
        });
    }
    catch(err){
        res.status(500).send("server error")
    }
};
module.exports = {loginuser};
const {createUser,findUserByEmail} = require("../../models/UserModel");
const bcrypt = require("bcrypt");
// creating an account api 
const Registeruser = async (req,res)=>{
    try{
        const{name,email,password}= req.body;
        const saltrounds = 10;
        const hashpassword = await bcrypt.hash(password,saltrounds)
        //for checking already existing acc.
        const existing = await findUserByEmail(email);
        if(existing){
            console.log("email already exists");
            return res.status(400).json("email already exists");
        }
        //creating account api 
        const user = await createUser(name,email,hashpassword);
        res.status(201).json(user)
        console.log(user);
    }
    catch(err){
        res.status(500).json("server error");
    };
}
module.exports = {Registeruser};
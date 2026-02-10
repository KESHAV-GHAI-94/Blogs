const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{
    const token = req.cookies.authToken;

    if(!token){
        return res.status(401).send("Not authenticated!");
    }
    try{
        const decodedval = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedval;
        next();
    }
    catch(err){
        res.status(403).send("invalid token");
    }
}
module.exports = auth ;
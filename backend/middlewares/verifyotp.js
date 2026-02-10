const pool = require("../config/db");
module.exports = async (req,res,next)=>{
    const { email } = req.body;
    const result = await pool.query(
        "SELECT otp_verified FROM users WHERE email = $1",
        [email]
    );
    if (!result.rows[0] || !result.rows[0].otp_verified) {
        return res.status(403).send("Verify OTP first");
    }
    next(); 

}
const pool = require("../config/db");
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0]; // single user checking from db 
};
const createUser = async (name, email, password) => {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at;
        `;
    const values = [name, email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
};
// QUERY FOR UPDATING PASSWORD BY USING OTP 
const saveOtp = async (email,otp)=>{
    const result = await pool.query(
        `UPDATE users SET otp = $1,otp_expires_at= NOW() + INTERVAL '10 minutes' WHERE email = $2 RETURNING id,email,otp,otp_expires_at`,
        [otp,email]
    );
    return result.rows[0];
};
// CLEAR OTP AFTER SUCESS 
const clearotp = async(email)=>{
    await pool.query(
        `UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE email = $1`,
        [email]
    )
};

module.exports = {
    createUser,
    findUserByEmail,
    saveOtp,
    clearotp,
};

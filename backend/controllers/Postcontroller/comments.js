const pool = require("../../config/db");
//fetching comments
const getCommentsByPost = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(`
    SELECT c1.id AS comment_id,c1.comment AS main_comment,c2.id AS reply_id,c2.comment AS reply_text FROM comments c1 LEFT JOIN comments c2 ON c2.parent_comment_id = c1.id WHERE c1.post_id = $1 AND c1.parent_comment_id IS NULL;`, [id]);
    res.json(result.rows);
    };
// add comment
const addComment = async (req,res)=>{
    const { id } = req.params;      //this will check post id 
    const { user_id, comment } = req.body;
    await pool.query(
        `INSERT INTO comments (user_id, post_id, comment)
        VALUES ($1, $2, $3)`,
        [user_id, id, comment]
    );
    res.status(201).send("Comment added");
    };
// reply adding 
const addReply = async (req, res) => {
    const { id,commentId } = req.params;
    const { user_id, comment } = req.body;
    await pool.query(`INSERT INTO comments (user_id,post_id,parent_comment_id, comment) VALUES ($1, $2, $3, $4)`,[user_id, id, commentId, comment]);
    res.status(201).send("reply sended");
};
module.exports = {
    getCommentsByPost,
    addComment,
    addReply
}
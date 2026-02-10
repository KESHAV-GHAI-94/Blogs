const pool = require("../../config/db");
const {createPost,getAllPosts,getPostsByUser,updatePost,deletePost} = require("../../models/postModel"); 
//api for creting post
const Postcreated =  async (req,res)=>{
    try {
    const { title, description, image_url } = req.body;
    const user_id = req.user.id; 
    const result = await createPost(
        user_id,
        title,
        description,
        image_url
        );
        res.status(201).json({
        message: "Post created successfully",
        post: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
//api which displays all posts public
const Viewposts =  async(req,res)=>{
    try {
        const result = await getAllPosts();
    res.json({
    message: "Welcome to Home Page",
      posts: result.rows   //you will check posts here
    });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
} 
//api for opening post page 
const detailedpost = async (req, res) => {
    try {
    const postId = req.params.id;
    const query = `
        SELECT posts.*, users.name AS author_name
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.id = $1;
    `;
    const result = await pool.query(query, [postId]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(result.rows[0]);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
}
// API FOR GETING DATA OF USERS OWNED POST
const UserOwnpost =  async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await getPostsByUser(userId);
        res.json({
        message: "Your Posts",
        posts: result.rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
//UPDATE POSTS 
const Updatepost =  async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, image_url } = req.body;
        const check = await getPostsByUser(req.user.id);
        const isOwner = check.rows.some(post => post.id === Number(id));
        if (!isOwner) {
        return res.status(403).json({ message: "Not your post" });
        }
        const result = await updatePost(id, title, description, image_url);
        if (result.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
        }
        res.json({
        message: "Post updated successfully",
        post: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
    // DELETE POSTS
    const Deletepost = async (req, res) => {
    try {
        const id = req.params.id;
        const check = await getPostsByUser(req.user.id);
        const isOwner = check.rows.some(
        post => post.id === Number(id)
        );
        if (!isOwner) {
        return res.status(403).json({ message: "Not your post" });
        }
        const result = await deletePost(id);
        if (result.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
    const UserOwnpostById = async (req, res) => {
    try {
        const { id } = req.params;
        const check = await getPostsByUser(req.user.id);
        const isOwner = check.rows.some(
        post => post.id === Number(id)
        );
        if (!isOwner) {
        return res.status(403).json({ message: "Not your post" });
        }

        const result = await pool.query(
        "SELECT * FROM posts WHERE id=$1",
        [id]
        );
        if (result.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
        }
        res.json({
        message: "Post found",
        post: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
module.exports = {
    Postcreated,
    Viewposts,
    detailedpost,
    UserOwnpost,
    Updatepost,
    Deletepost,
    UserOwnpostById
}
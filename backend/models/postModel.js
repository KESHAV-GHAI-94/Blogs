const pool = require("../config/db");
const createPost = async (user_id, title, description, image_url) => {
    // creating posts
  const query = `
    INSERT INTO posts (user_id, title, description, image_url)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;
  return pool.query(query, [user_id, title, description, image_url]);
};

//fetchhing all the post data

const getAllPosts = async () => {
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.description,
      posts.image_url,
      posts.share_count,
      posts.created_at,
      users.name AS author_name
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC;
  `;
  return pool.query(query);
};

const getPostsByUser = async (user_id) => {
  return pool.query(
    "SELECT * FROM posts WHERE user_id=$1 ORDER BY created_at DESC",
    [user_id]
  );
};
// update posts 
const updatePost = async (id, title, description, image_url) => {
  const query = `
    UPDATE posts 
    SET title=$1, description=$2, image_url=$3
    WHERE id=$4
    RETURNING *;
  `;
  return pool.query(query, [title, description, image_url, id]);
};
// delete posts api 
const deletePost = async (id) => {
  return pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [id]);
};
    module.exports = {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost,
};
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdatePostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state;

  const [post, setPost] = useState({
    author: postData ? postData.author : "",
    content: postData ? postData.content : "",
  });

  useEffect(() => {
    if (!postData) {
      navigate("/my-blogs");
    }
  }, [postData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Post data to be updated:", post); // Log the post data here
    try {
        const response = await axios.put(
            `http://localhost:4000/posts/${postData._id}`, // Ensure postData.id is passed to the endpoint
            post // Only send updated author and content
        );
        console.log("Response from server:", response);
        alert("Post updated successfully!");
        navigate("/my-blogs");
    } catch (error) {
        console.error("Error updating post:", error);
        if (error.response) {
            console.error("Response error:", error.response.data);
        }
        alert("Error updating post.");
    }
};
const handleDelete = async (postId) => {
  try {
      const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
      console.log("Post deleted:", response.data);
      alert("Post deleted successfully!");
      navigate("/my-blog");
  } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post.");
  }
};


  return (
    <div className="update-post-page">
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit} className="update-post-form">
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePostPage;

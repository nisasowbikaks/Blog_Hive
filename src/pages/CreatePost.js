import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = { author, category, content, url };

    try {
      const response = await axios.post("https://blog-hive-backend.onrender.com/posts", newPost);
      console.log("Post Created:", response.data);
      navigate("/my-blog"); 
    } catch (error) {
      console.error("There was an error creating the post:", error);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="buttons-container">
        <button className="button" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="button" onClick={() => navigate("/subscribe")}>
            Subscribe
          </button>
          <button className="button" onClick={() => navigate("/my-blog")}>
            My Blog
          </button>
          <button className="button" onClick={() => navigate("/profile")}>
            Profile
          </button>
        </div>
      </header>
      <div className="create-post-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>
          <div className="form-group">
            <label>Title of the Blog:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Life">Life</option>
              <option value="Relationship">Relationship</option>
              <option value="Fashion">Fashion</option>
              <option value="Hobby">Hobby</option>
              <option value="Career">Career</option>
            </select>
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the blog content here"
              rows="6"
              required
            />
          </div>
          <div className="form-group">
            <label>External URL for Explore More (Optional):</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (optional)"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;

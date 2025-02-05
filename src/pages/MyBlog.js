import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyBlog.css";

const MyBlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://blog-hive-backend.onrender.com/posts");
        setPosts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Error fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    setTopBlogs([
      { author: "TechCrunch", category: "Technology", content: "Latest in Tech, Gadgets, and Innovation", url: "https://techcrunch.com/" },
      { author: "The Verge", category: "Technology", content: "Bringing you the future of tech.", url: "https://www.theverge.com/" },
      { author: "Healthline", category: "Health", content: "Reliable Health Information for Everyday Living", url: "https://www.healthline.com/" },
      { author: "Lifehacker", category: "Life", content: "Tips for Work, Health, and Productivity", url: "https://lifehacker.com/" },
      { author: "HuffPost", category: "News", content: "Breaking News and Opinion", url: "https://www.huffpost.com/" },
      { author: "The Guardian", category: "News", content: "News, Sport and Culture", url: "https://www.theguardian.com/" },
      { author: "Mashable", category: "Technology", content: "The Latest in Tech, Entertainment, and Culture", url: "https://mashable.com/" },
      { author: "Glamour", category: "Fashion", content: "Beauty, Fashion, and Lifestyle", url: "https://www.glamour.com/" },
      { author: "Forbes", category: "Business", content: "Business, Investing, Technology, Entrepreneurship", url: "https://www.forbes.com/" },
    ]);
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blog-hive-backend.onrender.com/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post.");
    }
  };

  // Handle Edit
  const handleUpdate = (post) => {
    setEditingPost(post._id); 
    setUpdatedContent(post.content); 
  };

  // Handle Content Update
  const handleContentChange = (event) => {
    setUpdatedContent(event.target.value);
  };

  // Submit Update
  const submitUpdate = async (id) => {
    try {
      const updatedPost = { content: updatedContent };
      const response = await axios.put(`https://blog-hive-backend.onrender.com/posts/${id}`, updatedPost);
      const updatedPosts = posts.map((post) =>
        post._id === id ? { ...post, content: response.data.post.content } : post
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post.");
    }
  };

  return (
    <div className="my-blogs-page">
      <header className="header">
        <div className="buttons-container">
          <button className="button" onClick={() => navigate("/home")}>Home</button>
          <button className="button" onClick={() => navigate("/subscribe")}>Subscribe</button>
          <button className="button" onClick={() => navigate("/create-post")}>Create Post</button>
          <button className="button" onClick={() => navigate("/profile")}>Profile</button>
        </div>
      </header>

      <h1>📌 Recent Blog Posts</h1>
      <div className="blog-list">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No blogs yet. Start writing one!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="blog-card animate">
              <h2>{post.category}</h2>
              <p><strong>By:</strong> {post.author}</p>

              {editingPost === post._id ? (
                <>
                  <textarea
                    value={updatedContent}
                    onChange={handleContentChange}
                  />
                  <button onClick={() => submitUpdate(post._id)}>Save</button>
                </>
              ) : (
                <p><strong>Content:</strong> {post.content}</p>
              )}

              <div className="post-buttons">
                <button className="edit-button" onClick={() => handleUpdate(post)}>
                  ✏️ Update
                </button>
                <button onClick={() => handleDelete(post._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Top Blogs Section */}
      <div className="top-blogs">
        <h2>🏆 Top 10 Famous Blogs</h2>
        <div className="blog-list">
          {topBlogs.map((post, index) => (
            <div key={index} className="blog-card animate">
              <h2>{post.category}</h2>
              <p><strong>By:</strong> {post.author}</p>
              <p>{post.content}</p>
              {post.url && (
                <p>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">🔗 Read More</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogsPage;

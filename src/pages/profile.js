import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import defaultIcon from "./icon.png"; // default icon in case no image is chosen

const Profile = () => {
  const [user, setUser] = useState({
    username: "Nisa", 
    email: "nisa@gmail.com",
    bio: "Tech enthusiast, Blogger & Developer.",
    profilePic: defaultIcon,
    totalPosts: 25,
    viewers: 1200,
    totalLikes: 300,
    portfolio: "https://nisasowbikaks.github.io/Portfolio/",
  });

  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);
  const [newPortfolio, setNewPortfolio] = useState(user.portfolio);

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login");
  };

  const handleClose = () => navigate("/home");

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    setUser({ ...user, bio: newBio, portfolio: newPortfolio });
    setEditMode(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file); // This will read the file and convert it to a base64 string
    }
  };

  return (
    <div className={`profile-page`}>
      {/* Header Section */}
      <header className="header">
        <div className="buttons-container">
          <button className="button" onClick={() => navigate("/home")}>Home</button>
          <button className="button" onClick={() => navigate("/subscribe")}>Subscribe</button>
          <button className="button" onClick={() => navigate("/create-post")}>Create Blog</button>
          <button className="button" onClick={() => navigate("/my-blog")}>My Blog</button>
        </div>
      </header>

      <div className="img">
        {/* Add image or banner here if needed */}
      </div>
      <h1 className="txt">Thanks for Visiting Our Blog</h1>

      {/* Profile Container */}
      <div className="profile-container">
        <button onClick={handleClose} className="close-button">X</button>
        <div className="profile-header">
          <img src={user.profilePic} alt="User Icon" className="profile-icon" />
          <h2 className="username">{user.username}</h2>
          <p className="email">{user.email}</p>
          {editMode ? (
            <>
              <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} className="edit-bio" />
              <input type="url" value={newPortfolio} onChange={(e) => setNewPortfolio(e.target.value)} className="edit-portfolio" />
              <button onClick={handleSave} className="save-button">Save</button>
            </>
          ) : (
            <>
              <p className="bio">{user.bio}</p>
              <button onClick={handleEdit} className="edit-button">✏️ Edit Profile</button>
            </>
          )}
        </div>

        {/* Profile Picture Upload */}
        <div className="profile-pic-upload">
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-box animate"><h3>{user.totalPosts}</h3><p>Total Posts</p></div>
          <div className="stat-box animate"><h3>{user.viewers}</h3><p>Viewers</p></div>
          <div className="stat-box animate"><h3>{user.totalLikes}</h3><p>Total Likes</p></div>
        </div>

        {/* Portfolio & Logout */}
        <div className="portfolio-section">
          <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="portfolio-link">View Portfolio</a>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

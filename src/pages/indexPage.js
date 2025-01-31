import React from 'react';
import { useNavigate } from 'react-router-dom';
import './indexPage.css';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="index-page">
      <div className="hero">
        <h1 className="blog-title">🚀 BlogHive</h1>
        <p className="motivational-quote">
          "Unlock the power of words and ideas! ✨<br />Your journey starts here."
        </p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Let's Get Started
        </button>
      </div>
    </div>
  );
};

export default IndexPage;

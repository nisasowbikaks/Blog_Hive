import React, { useState } from 'react';
import './Header.css';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <header className="header-container">
      <div className="header-left">
        <h1 className="blog-title">Project Blog</h1>
        <p className="blog-tagline">A collection of my coding projects and journey</p>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-blog">My Blog</Link>
          </li>
          <li>
            <Link to="/create-blog">Create Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search projects..." className="search-input" />
          <button className="search-button">
            <Search size={20} />
          </button>
        </div>
        <div className="auth-buttons">
          {isRegistered ? (
            <div className="welcome-message">
              <p>Welcome, {username}!</p>
            </div>
          ) : (
            <Link to="/register">
              <button className="sign-up-button">Sign Up</button>
            </Link>
          )}
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

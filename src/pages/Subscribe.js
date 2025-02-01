import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./subscribe.css";

const SubscribePage = () => {
  const [email, setEmail] = useState(""); 
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [emailHistory, setEmailHistory] = useState([]); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault(); 

    if (!email.trim()) {
      alert("Please enter an email address!");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://blog-hive-backend.onrender.com/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true);
        setEmailHistory((prevHistory) => [...prevHistory, email]); 
        setEmail(""); 
        setTimeout(() => setSubscribed(false), 3000); 
      } else {
        alert(data.message || "Failed to subscribe!");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred while subscribing!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <button className="button" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="button" onClick={() => navigate("/create-post")}>
          Create Blog
        </button>
        <button className="button" onClick={() => navigate("/my-blog")}>
          My Blog
        </button>
        <button className="button" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </header>

      {/* Main content */}
      <div className="subscribe-container">
        <h2>Subscribe to our Blog</h2>

        {!subscribed ? (
          <form className="subscription-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              disabled={loading} 
            />
            <button type="submit" className="subscribe-btn" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        ) : (
          <p className="success-message">✅ Subscription added successfully!</p>
        )}
        
        <div className="email-history">
          <h3>Email History:</h3>
          <ul>
            {emailHistory.length === 0 ? (
              <li>No subscriptions yet!</li>
            ) : (
              emailHistory.map((email, index) => (
                <li key={index}>{email}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubscribePage;

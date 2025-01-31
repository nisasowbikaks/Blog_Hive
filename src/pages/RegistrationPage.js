import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage("✅ Registration successful! Redirecting...");
        
        // ✅ Redirect to login page after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } 
      else if (response.status === 400) {
        setMessage("⚠️ User Already Exists");
      } 
      else {
        setMessage("❌ Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again later.");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>

      <label>Username</label>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        required
      />

      <button type="submit">Register</button>

      {message && <p className="message">{message}</p>} 
    </form>
  );
}

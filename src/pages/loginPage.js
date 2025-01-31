import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./loginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState(""); 
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();
    setMessage("");
    if (!username.trim() || !password.trim()) {
      setMessage("Please fill in both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setMessage("Login Successful");
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      } else {
        const error = await response.json();
        setMessage(error.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setMessage("Login failed. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={login} className="login-form">
        <label>UserName</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Login</button>
        {message && (
          <div className={`message ${message.includes("Successful") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </form>

      <div className="create-account-section">
        <p>
          New to Blog?{" "}
          <span className="create-account-link" onClick={() => navigate("/register")}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

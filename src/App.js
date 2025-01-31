import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/indexPage";
import RegisterPage from "./pages/RegistrationPage";
import LoginPage from "./pages/loginPage";
import MyBlog from "./pages/MyBlog";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/profile";
import Subscribe from "./pages/Subscribe";
import Home from "./pages/Home"; 
import { UserContextProvider } from "./UserContext";
import UpdatePostPage from "./pages/UpdatePostPage";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-blog" element={<MyBlog />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/update-post/:id" element={<UpdatePostPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;

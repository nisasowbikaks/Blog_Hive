import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='header'>
        <div className="buttons-container">
          <button className='button' onClick={() => navigate('/subscribe')}>Subscribe</button>
          <button className='button' onClick={() => navigate('/create-post')}>Create Blog</button>
          <button className='button' onClick={() => navigate('/my-blog')}>My Blog</button>
          <button className='button' onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </div>

      

      <div className="welcome-section">
        <p className="welcome-paragraph">
        <h1 className='welcome-heading'>WELCOME TO BLOGHIVE!</h1>
          Explore a world of amazing blogs and share your own experiences with the community.
        </p>
        <br></br>
        <pre>
          <button className='btn' onClick={()=>navigate('/my-blog')}>View Blog's</button>
        </pre>
      </div>
    </div>
  );
};

export default Home;

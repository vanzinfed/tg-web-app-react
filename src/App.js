import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mining from './components/Mining';
import Upgrade from './components/Upgrade';
import Referrals from './components/Referrals';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const telegramData = urlParams.get('telegramWebAppData');

    if (telegramData) {
      const userData = JSON.parse(window.atob(telegramData));
      setUserId(userData.id);
      setUsername(userData.username); // Assuming 'username' field exists
      // Load click count from localStorage
      const savedCount = localStorage.getItem(`clickCount_${userData.id}`);
      if (savedCount) {
        setCount(parseInt(savedCount, 10));
      }
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem(`clickCount_${userId}`, count);
    }
  }, [count, userId]);

  const handleClick = () => {
    setCount(count + 1);
    const melon = document.querySelector('.melon-image');
    melon.classList.add('clicked');
    setTimeout(() => {
      melon.classList.remove('clicked');
    }, 500);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="username-display">{username}</div>
          <div className="click-counter">Count clicks: {count}</div>
          <Routes>
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/referrals" element={<Referrals userId={userId} />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={
              <div className="content-center">
                <Mining />
                <img src="melon.png" alt="Melon" onClick={handleClick} className="melon-image" />
              </div>
            } />
          </Routes>
        </header>
        <nav className="App-nav">
          <Link to="/" className="nav-link">Mine</Link>
          <Link to="/upgrade" className="nav-link">Upgrade</Link>
          <Link to="/referrals" className="nav-link">Referrals</Link>
          <Link to="/tasks" className="nav-link">Tasks</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;

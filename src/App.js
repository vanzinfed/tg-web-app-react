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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const telegramData = urlParams.get('telegramWebAppData');

    if (telegramData) {
      const userData = JSON.parse(window.atob(telegramData));
      setUserId(userData.id);
      // Загрузка количества очков из localStorage для данного пользователя
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
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Melon Clicker Game</h1>
          <p>Clicks: {count}</p>
          <Routes>
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/referrals" element={<Referrals userId={userId} />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={
              <>
                <Mining />
                <img src="melon.png" alt="Melon" onClick={handleClick} style={styles.melonImage} />
              </>
            } />
          </Routes>
        </header>
        <nav className="App-nav">
          <Link to="/">Mining</Link>
          <Link to="/upgrade">Upgrade</Link>
          <Link to="/referrals">Referrals</Link>
          <Link to="/tasks">Tasks</Link>
        </nav>
      </div>
    </Router>
  );
}

const styles = {
  melonImage: {
    cursor: 'pointer',
    width: '200px',
    height: 'auto',
  }
};

export default App;

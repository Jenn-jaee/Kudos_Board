import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import './App.css'; // Global styles for light/dark mode

function App() {
  const [theme, setTheme] = useState('light');

  // On first load, check if a theme is saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Anytime theme changes, save to localStorage
  useEffect(() => {
    document.body.className = theme; // apply theme to <body>
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Routes>
        <Route
  path="/"
  element={<HomePage toggleTheme={toggleTheme} theme={theme} />}
/>

<Route
  path="/boards/:id"
  element={<BoardPage toggleTheme={toggleTheme} theme={theme} />}
/>

      </Routes>
    </Router>
  );
}

export default App;

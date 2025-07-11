import React, { useState } from 'react';
import './Home.css';

const GRID_COLS = 75;
const GRID_ROWS = 100;
const STEP_MS = 30;
const PIXEL_ANIM_MS = 300;

const Home = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCellClick = (index) => {
    if (cells[index] !== null) return;
    const newCells = [...cells];
    newCells[index] = xIsNext ? 'X' : 'O';
    setCells(newCells);
    setXIsNext(!xIsNext);
  };

  const toggleTheme = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const totalDuration = GRID_COLS * STEP_MS + PIXEL_ANIM_MS;

    setTimeout(() => {
      setIsDarkTheme(!isDarkTheme);
    }, totalDuration);

    setTimeout(() => {
      setIsTransitioning(false);
    }, totalDuration + 150);
  };

  const renderPixelOverlay = () => {
    const squares = [];
    for (let row = 0; row < GRID_ROWS; row += 1) {
      for (let col = 0; col < GRID_COLS; col += 1) {
         const delay = col * STEP_MS;
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`pixel-square ${isDarkTheme ? 'dark-to-light' : 'light-to-dark'}`}
            style={{ animationDelay: `${delay}ms` }}
          />
        );
      }
    }

    return <div className="pixel-overlay">{squares}</div>;
  };

  return (
    <div className={`home-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {isTransitioning && renderPixelOverlay()}

      <div className="theme-toggle" onClick={toggleTheme}>
        <div className={`toggle-slider ${isDarkTheme ? 'dark' : 'light'}`}>
          <span className="toggle-icon">{isDarkTheme ? '🌙' : '☀️'}</span>
        </div>
      </div>

      <div className="tic-tac-toe-grid">
        <div className="vertical-line-1"></div>
        <div className="vertical-line-2"></div>
        {['cell-0','cell-1','cell-2','cell-3','cell-4','cell-5','cell-6','cell-7','cell-8'].map((cls, idx) => (
          <div
            key={cls}
            className={`cell ${cls}`}
            onClick={() => handleCellClick(idx)}
          >
            {cells[idx]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 
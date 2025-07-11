import React, { useState } from 'react';
import './Home.css';

const GRID_COLS = 75;
const GRID_ROWS = 100;
const STEP_MS = 30;
const PIXEL_ANIM_MS = 300;

const getWinInfo=(s)=>{const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let i=0;i<lines.length;i++){const[a,b,c]=lines[i];if(s[a]&&s[a]===s[b]&&s[a]===s[c])return{player:s[a],line:[a,b,c]};}return null};

const Home = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCellClick = (index) => {
    if (cells[index] !== null||getWinInfo(cells)) return;
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

  const getLineStyle=(line)=>{
    if(!line)return null;
    const style={position:'absolute',background:'red',borderRadius:'4px',zIndex:4};
    const thickness=8;
    const setHorizontal=(row)=>{style.top=`${16.6667+33.3333*row}%`;style.left='0';style.width='100%';style.height=`${thickness}px`;style.transformOrigin='left center';style.transform='scaleX(0)';style.animation='lineGrow .8s forwards';};
    const setVertical=(col)=>{style.left=`${16.6667+33.3333*col}%`;style.top='0';style.width=`${thickness}px`;style.height='100%';style.transformOrigin='center top';style.transform='scaleY(0)';style.animation='lineGrowV .8s forwards';};

    if(line.toString()==='0,1,2') setHorizontal(0);
    else if(line.toString()==='3,4,5') setHorizontal(1);
    else if(line.toString()==='6,7,8') setHorizontal(2);
    else if(line.toString()==='0,3,6') setVertical(0);
    else if(line.toString()==='1,4,7') setVertical(1);
    else if(line.toString()==='2,5,8') setVertical(2);
    else if(line.toString()==='0,4,8'){
      style.top='50%';
      style.left='-20.5%';
      style.width='141%';
      style.height=`${thickness}px`;
      style.transform='translateY(-50%) rotate(45deg) scaleX(0)';
      style.transformOrigin='center';
      style.animation='lineGrow45 .8s forwards';
    }
    else if(line.toString()==='2,4,6'){
      style.top='50%';
      style.left='-20.5%';
      style.width='141%';
      style.height=`${thickness}px`;
      style.transform='translateY(-50%) rotate(-45deg) scaleX(0)';
      style.transformOrigin='center';
      style.animation='lineGrowN45 .8s forwards';
    }
    return style;
  };

  const winner=getWinInfo(cells);
  const status=winner?`Winner: ${winner.player}`:cells.every(v=>v!==null)?'Draw':`Next: ${xIsNext?'X':'O'}`;

  const resetGame=()=>{setCells(Array(9).fill(null));setXIsNext(true);};

  return (
    <div className={`home-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {isTransitioning && renderPixelOverlay()}

      <div className="theme-toggle" onClick={toggleTheme}>
        <div className={`toggle-slider ${isDarkTheme ? 'dark' : 'light'}`}>
          <span className="toggle-icon">{isDarkTheme ? '🌙' : '☀️'}</span>
        </div>
      </div>

      <div className="game-info">{status}</div>
      <button className="reset-button" onClick={resetGame}>Reset</button>

      <div className="tic-tac-toe-grid">
        <div className="vertical-line-1"></div>
        <div className="vertical-line-2"></div>
        {winner && <div className="win-line" style={getLineStyle(winner.line)}></div>}
        {['cell-0','cell-1','cell-2','cell-3','cell-4','cell-5','cell-6','cell-7','cell-8'].map((cls, idx) => (
          <div
            key={cls}
            className={`cell ${cls} ${winner && !winner.line.includes(idx) ? 'fall' : ''}`}
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
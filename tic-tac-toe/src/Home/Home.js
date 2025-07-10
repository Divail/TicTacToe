import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleCellClick = (index) => {
    if (cells[index] === null) {
      const newCells = [...cells];
      newCells[index] = xIsNext ? 'X' : 'O';
      setCells(newCells);
      setXIsNext(!xIsNext);
    }
  };

  return (
    <div className="home-container">
      <div className="tic-tac-toe-grid">
        <div className="vertical-line-1"></div>
        <div className="vertical-line-2"></div>
        
        {/* Cell 0 */}
        <div 
          className="cell cell-0" 
          onClick={() => handleCellClick(0)}
        >
          {cells[0]}
        </div>
        
        {/* Cell 1 */}
        <div 
          className="cell cell-1" 
          onClick={() => handleCellClick(1)}
        >
          {cells[1]}
        </div>
        
        {/* Cell 2 */}
        <div 
          className="cell cell-2" 
          onClick={() => handleCellClick(2)}
        >
          {cells[2]}
        </div>
        
        {/* Cell 3 */}
        <div 
          className="cell cell-3" 
          onClick={() => handleCellClick(3)}
        >
          {cells[3]}
        </div>
        
        {/* Cell 4 */}
        <div 
          className="cell cell-4" 
          onClick={() => handleCellClick(4)}
        >
          {cells[4]}
        </div>
        
        {/* Cell 5 */}
        <div 
          className="cell cell-5" 
          onClick={() => handleCellClick(5)}
        >
          {cells[5]}
        </div>
        
        {/* Cell 6 */}
        <div 
          className="cell cell-6" 
          onClick={() => handleCellClick(6)}
        >
          {cells[6]}
        </div>
        
        {/* Cell 7 */}
        <div 
          className="cell cell-7" 
          onClick={() => handleCellClick(7)}
        >
          {cells[7]}
        </div>
        
        {/* Cell 8 */}
        <div 
          className="cell cell-8" 
          onClick={() => handleCellClick(8)}
        >
          {cells[8]}
        </div>
      </div>
    </div>
  );
};

export default Home; 
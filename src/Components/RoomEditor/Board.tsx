import React from 'react';
import Tile from './Tile';

interface BoardProps {
  tiles: number[][];
  onTileClick: (x: number, y: number) => void;
}

const Board: React.FC<BoardProps> = ({ tiles, onTileClick }) => {
  // Create an array of numbers from 0 to the length of the rows and columns
  const rowNumbers = Array.from({ length: tiles.length }, (_, index) => index);
  const colNumbers = Array.from({ length: tiles[0].length }, (_, index) => index);

  return (
    <div className="board">
      {/* Render the column labels */}
      <div className="tile-row">
        <div className="label"></div>
        {colNumbers.map((col, index) => (
          <div key={index} className="label">
            {col}
          </div>
        ))}
      </div>

      {tiles.map((row, y) => (
        <div className="tile-row" key={y}>
          {/* Render the row label */}
          <div className="label">{rowNumbers[y]}</div>

          {row.map((value, x) => (
            <Tile
              key={x}
              value={value}
              onClick={() => onTileClick(x, y)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;


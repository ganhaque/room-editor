import React from 'react';

interface TileProps {
  value: number;
  onClick: () => void;
}

const colorArray: string[] = [
  '79, 69%, 69%',
  '205, 79%, 69%',
  '181, 49%, 43%',
];

const Tile: React.FC<TileProps> = ({ value, onClick }) => {
  return (
    <div
      style={{
        /* backgroundColor: `${value === 0 ? 'mediumturquoise' : 'forestgreen'}`, */
        backgroundColor: `hsla(${colorArray[value]})`,
        color: 'hsla(var(--black))'
      }}
      className={`tile ${value === 1 ? 'tile-obstacle' : 'tile-empty'}`}
      onClick={onClick}
    >
      {value === 0 ? '0' : ''}
      {value === 1 ? '1' : ''}
      {value === 2 ? '2' : ''}
    </div>
  );
};

export default Tile;

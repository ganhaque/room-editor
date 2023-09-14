import React, { useState } from 'react';
import Board from './Board';
import { exampleRoom } from './Interface';
import "./room-style.css"

const initialRoom = { ...exampleRoom }; // Make a copy of the room data

const Room: React.FC = () => {
  const [room, setRoom] = useState(initialRoom);

  const handleTileClick = (x: number, y: number) => {
    // You can update the tile value in the state here
    // For example, toggle between 1 and 0
    const updatedRoom = { ...room };
    updatedRoom.tiles[y][x] = room.tiles[y][x] === 1 ? 0 : 1;
    setRoom(updatedRoom);
  };

  return (
    <div className="room">
      <h1>{room.roomName}</h1>
      <Board tiles={room.tiles} onTileClick={handleTileClick} />
    </div>
  );
};

export default Room;

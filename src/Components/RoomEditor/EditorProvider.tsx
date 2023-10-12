/* import { invoke } from '@tauri-apps/api/tauri'; */
/* import { writeFile } from '@tauri-apps/api/fs'; */
/* import { fs } from '@tauri-apps/api'; */
/* import { write } from 'xlsx'; */
import { save } from '@tauri-apps/api/dialog';
import { writeTextFile } from '@tauri-apps/api/fs';
import { homeDir } from '@tauri-apps/api/path';
import React, { createContext, ReactNode, useContext, useState } from 'react';
/* import { useLocalStorage } from '../Hooks/LocalStorageHook'; */
/* import { BoardProps, exampleBoards, ListProps, CardProps } from '../Trello/Data'; */
import { Room, exampleRoom, SpecialTile, defaultSpecialTile } from './Interface';

interface EditorContextType {
  room: Room;
  newSpecialTile: SpecialTile;
  setRoomName: (newRoomName: string) => void;
  setRoomID: (newRoomID: string) => void;
  setSpecialTileType: (newType: string) => void;
  setSpecialTileDialogue: (newType: string) => void;
  setSpecialTileDestinationRoomID: (newType: string) => void;
  addContentToSpecialTile: (newContent: string) => void;
  removeContentFromSpecialTile: (index: number) => void;
  setContentAtIndex: (index: number, newContent: string) => void;
  handleTileClick: (
    x: number,
    y: number,
  ) => void;
  handleTileDrag: (
    x: number,
    y: number,
  ) => void;
  exportRoomData: () => void;
  printSpecialTile: () => void;
  importRoomData: (file: File) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const EditorProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  /* const [room, setRoom] = useLocalStorage("room", exampleRoom); */
  const [room, setRoom] = useState<Room>(exampleRoom);
  const [newSpecialTile, setNewSpecialTile] = useState<SpecialTile>(defaultSpecialTile);

  const setRoomID = (newRoomID: string) => {
    const updatedRoom = { ...room, roomID: newRoomID };
    setRoom(updatedRoom);
  };
  const setRoomName = (newRoomName: string) => {
    const updatedRoom = { ...room, roomName: newRoomName };
    setRoom(updatedRoom);
  };

  const setSpecialTileType = (newType: string) => {
    if (newSpecialTile) {
      const updatedSpecialTile = { ...newSpecialTile, type: newType };
      setNewSpecialTile(updatedSpecialTile);
    }
  };
  const setSpecialTileDialogue = (newDialogue: string) => {
    if (newSpecialTile) {
      const updatedSpecialTile = { ...newSpecialTile, dialogue: newDialogue };
      setNewSpecialTile(updatedSpecialTile);
    }
  };
  const setSpecialTileDestinationRoomID = (newDestinationRoomID: string) => {
    if (newSpecialTile) {
      const updatedSpecialTile = { ...newSpecialTile, destinationRoomID: newDestinationRoomID };
      setNewSpecialTile(updatedSpecialTile);
    }
  };
  const addContentToSpecialTile = (newContent: string) => {
    if (newSpecialTile) {
      const updatedContents = newSpecialTile.contents
        ? [...newSpecialTile.contents, newContent]
        : [newContent]; // Create a new array with newContent if contents is undefined
      const updatedSpecialTile = { ...newSpecialTile, contents: updatedContents };
      setNewSpecialTile(updatedSpecialTile);
    }
  };
  const removeContentFromSpecialTile = (index: number) => {
    if (newSpecialTile && newSpecialTile.contents) {
      const updatedContents = [...newSpecialTile.contents];
      updatedContents.splice(index, 1); // Remove the content at the specified index
      const updatedSpecialTile = { ...newSpecialTile, contents: updatedContents };
      setNewSpecialTile(updatedSpecialTile);
    }
  };
  const setContentAtIndex = (index: number, newContent: string) => {
    if (newSpecialTile && newSpecialTile.contents) {
      if (index >= 0 && index < newSpecialTile.contents.length) {
        const updatedContents = [...newSpecialTile.contents];
        updatedContents[index] = newContent; // Update the content at the specified index
        const updatedSpecialTile = { ...newSpecialTile, contents: updatedContents };
        setNewSpecialTile(updatedSpecialTile);
      } else {
        console.error('Invalid index:', index);
      }
    }
  };

  const printSpecialTile = () => {
    console.log(newSpecialTile);
  }

  const handleTileClick = (x: number, y: number) => {
    console.log(x, y);
    const specialTile = room.specialTiles.find((tile) => tile.x === x && tile.y === y);

    if (specialTile) { // Delete if there is an object there already
      console.log(JSON.stringify(specialTile, null, 2));
      const updatedSpecialTiles = room.specialTiles.filter((tile) => !(tile.x === x && tile.y === y));
      const updatedRoom = { ...room, specialTiles: updatedSpecialTiles };
      setRoom(updatedRoom);
    }
    else {
      /* console.log('Empty tile'); */
      const newTile = { ...newSpecialTile, x: x, y: y };
      const updatedSpecialTiles = [...room.specialTiles, newTile];
      const updatedRoom = { ...room, specialTiles: updatedSpecialTiles };
      setRoom(updatedRoom);
    }
  };

  const handleTileDrag = (x: number, y: number) => {
    console.log(x, y);
    /* const specialTile = room.specialTiles.find((tile) => tile.x === x && tile.y === y); */
    /**/
    /* if (specialTile) { // Delete if there is an object there already */
    /*   console.log(JSON.stringify(specialTile, null, 2)); */
    /*   const updatedSpecialTiles = room.specialTiles.filter((tile) => !(tile.x === x && tile.y === y)); */
    /*   const updatedRoom = { ...room, specialTiles: updatedSpecialTiles }; */
    /*   setRoom(updatedRoom); */
    /* } */

    const newTile = { ...newSpecialTile, x: x, y: y };
    const updatedSpecialTiles = [...room.specialTiles, newTile];
    const updatedRoom = { ...room, specialTiles: updatedSpecialTiles };
    setRoom(updatedRoom);
  };

  const exportRoomData = async () => {
    /* const dataToExport = boards[selectedBoardIndex]; // Get the selected board data */
    const dataToExport = room;
    const jsonData = JSON.stringify(dataToExport, null, 2); // Convert to JSON string with indentation

    /* TODO: Make this work on other machine as well */
    const homeDirPath = await homeDir();
    console.log(homeDirPath)

    const selected = await save({
      defaultPath: homeDirPath + `./Documents/${room.roomID}.json`
    });
    if(!selected) return;

    await writeTextFile(selected, jsonData);
    console.log("Successfully saved file to", selected);
  };
  const importRoomData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = event.target?.result as string;
        const importedData = JSON.parse(jsonData);

        if (importedData) {
          console.log(importedData);
          setRoom(importedData);
          // Update the lists and cards in the selected board
          /* const updatedBoards = [...boards]; */
          /* const selectedBoard = updatedBoards[selectedBoardIndex]; */

          // Ensure importedData.lists is an array
          /* if (Array.isArray(importedData.lists)) { */
          /* selectedBoard.lists = importedData.lists; */
          /* } */

          // Optionally, update other properties if needed

          // Update the boards array
          /* updatedBoards[selectedBoardIndex] = selectedBoard; */
          /* setBoards(updatedBoards); */

          // Reset selected board index or perform other necessary updates
          /* setSelectedBoardIndex(0); */
        }
      } catch (error) {
        console.error('Error importing data:', error);
        // Display an error message to the user
      }
    };
    reader.readAsText(file);
  };

  return (
    <EditorContext.Provider
      value={{
        room,
        newSpecialTile,
        setRoomID,
        setRoomName,
        setSpecialTileType,
        setSpecialTileDestinationRoomID,
        setSpecialTileDialogue,
        /* setSpecialTileContents, */
        addContentToSpecialTile,
        removeContentFromSpecialTile,
        setContentAtIndex,
        handleTileClick,
        handleTileDrag,
        exportRoomData,
        printSpecialTile,
        importRoomData,
        /* boards, */
        // Add more functions for other board-related updates
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// A custom hook to use the board context in components
export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};

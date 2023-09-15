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
import { Room, exampleRoom, SpecialTile } from './Interface';

interface EditorContextType {
  room: Room;
  setRoomName: (newRoomName: string) => void;
  setRoomID: (newRoomID: string) => void;
  /* handleTileClick: ( */
  /*   x: number, */
  /*   y: number, */
  /* ) => void; */
  exportRoomData: () => void;
  importRoomData: (file: File) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const EditorProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  /* const [room, setRoom] = useLocalStorage("room", exampleRoom); */
  const [room, setRoom] = useState<Room>(exampleRoom);
  const [newSpecialTile, setNewSpecialTile] = useState<SpecialTile>();

  const setRoomID = (newRoomID: string) => {
    const updatedRoom = { ...room, roomID: newRoomID };
    setRoom(updatedRoom);
  };
  const setRoomName = (newRoomName: string) => {
    const updatedRoom = { ...room, roomName: newRoomName };
    setRoom(updatedRoom);
  };

  /* const generateNewSpecialTile = ( */
  /*   x: number, */
  /*   y: number, */
  /*   type: string, */
  /*   dialogue: string, */
  /*   contents: string, */
  /*   destinationRoomID: string, */
  /*   requirement: string, */
  /* ): SpecialTile => { */
  /*   // Customize the properties as needed */
  /*   const newSpecialTile: SpecialTile = { */
  /*     x, */
  /*     y, */
  /*     type: 'new_type', */
  /*     dialogue: 'New dialogue', */
  /*     contents: ['Content 1', 'Content 2'], */
  /*     destinationRoomID: 'destinationRoomID', */
  /*     requirement: 'requirement', */
  /*   }; */
  /*   return newSpecialTile; */
  /* }; */

  /* const handleTileClick = (x: number, y: number) => { */
  /*   const updatedRoom = { ...room }; */
  /**/
  /*   const newSpecialTile = generateNewSpecialTile(x, y); */
  /**/
  /*   console.log('New SpecialTile:', newSpecialTile); */
  /**/
  /*   setRoom(updatedRoom); */
  /* }; */


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
          /* TODO: Fix this */
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
        setRoomID,
        setRoomName,
        /* handleTileClick, */
        exportRoomData,
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

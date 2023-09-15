/* import { useState } from "react"; */
/* import { invoke } from "@tauri-apps/api/tauri"; */
/* import { */
/*   Popover, */
/*   PopoverContent, */
/*   PopoverTrigger */
/* } from "./Components/UI/Popover"; */
/* import { */
/*   Command, */
/*   CommandEmpty, */
/*   CommandGroup, */
/*   CommandInput, */
/*   CommandItem, */
/*   CommandList */
/* } from "./Components/UI/Command"; */
import "./App.css";
import RoomRender from "./Components/RoomEditor/RoomRender";
import { EditorProvider } from "./Components/RoomEditor/EditorProvider";
import EditorToolbar from "./Components/RoomEditor/EditorToolbar";

function App() {
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      gap:'0.5rem',
      height:'calc(100vh - 1rem)',
      /* alignItems:'center', */
    }}
      className="main-container"
    >
      <EditorProvider>
        <RoomRender/>
        <EditorToolbar/>
      </EditorProvider>
    </div>
  );
}

export default App;

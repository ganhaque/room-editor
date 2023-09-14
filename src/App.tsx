import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
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
import Room from "./Components/RoomEditor/Room";
import { EditorProvider } from "./Components/RoomEditor/EditorProvider";
import EditorToolbar from "./Components/RoomEditor/EditorToolbar";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div
      style={{
        padding:'0.5rem',
      }}
      className=""
    >
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          gap:'0.5rem',
        }}
      >
        <h1>Welcome back!</h1>
        <p style={{color:'hsla(var(--muted_foreground))'}}>
          Here's a list of your tasks!
        </p>

        <form
          style={{
            display:'flex',
            flexDirection:'column',
            gap:'0.5rem',
          }}
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            style={{
              width:'24rem',
            }}
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">
            Greet
          </button>
        </form>

        <p>{greetMsg}</p>
      </div>

      <EditorProvider>
        <Room/>
        <EditorToolbar/>
      </EditorProvider>

    </div>
  );
}

export default App;

import { useRef } from 'react';
import { useEditorContext } from './EditorProvider';

function EditorToolbar() {
  const {
    room,
    setRoomName,
    setRoomID,
    exportRoomData,
    importRoomData
  } = useEditorContext();
  /* const [selectedFile, setSelectedFile] = useState<File | null>(null); */
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      importRoomData(selectedFile);
      event.target.value = ''; // Reset file input
    }
  };
  /* const handleImportClick = () => { */
  /*   if (selectedFile) { */
  /*     importBoardData(selectedFile); */
  /*     setSelectedFile(null); // Reset selected file after importing */
  /*   } */
  /* }; */
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };


  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      gap:'0.5rem',
      backgroundColor:'hsla(var(--one_bg1), 0.6)',
      padding:'0.75rem',
      height:'100%',
      width:'100%',
    }}>
      <div style={{
        display:'flex',
        gap:'0.5rem',
        alignItems:'center',
      }}>
        <p>ID:</p>
        <input
          style={{
            width:'6rem',
          }}
          id="greet-input"
          value={room.roomID}
          onChange={(e) => setRoomID(e.currentTarget.value)}
          placeholder="Enter room ID..."
        />
        <p>Name:</p>
        <input
          style={{
            width:'24rem',
          }}
          id="greet-input"
          value={room.roomName}
          onChange={(e) => setRoomName(e.currentTarget.value)}
          placeholder="Enter room name..."
        />
      </div>
      <div style={{
        display:'flex',
        gap:'0.5rem',
      }}>
        <button
          type='submit'
          onClick={() => {
            exportRoomData()
          }}
        >
          Export Room JSON
        </button>
        <button
          type='submit'
          onClick={handleImportClick}
        >
          Import Room JSON
        </button>
        <input
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default EditorToolbar;


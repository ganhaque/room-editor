import { useRef, useState } from 'react';
import { useEditorContext } from './EditorProvider';
/* import { SpecialTile } from './Interface'; */

function EditorToolbar() {
  const {
    room,
    setRoomName,
    setRoomID,
    exportRoomData,
    importRoomData
  } = useEditorContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [tileContents, setTileContents] = useState<string[]>(['']);
  const handleContentChange = (index: number, newValue: string) => {
    const updatedContents = [...tileContents];
    updatedContents[index] = newValue;
    setTileContents(updatedContents);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      importRoomData(selectedFile);
      event.target.value = ''; // Reset file input
    }
  };
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  return (
    <div style={{
      display:'flex',
      flexGrow:'1',
      flexDirection:'column',
      gap:'0.5rem',
      backgroundColor:'hsla(var(--one_bg1), 0.6)',
      padding:'0.75rem',
      /* height:'100%', */
      width:'100%',
    }}>
      <div style={{
        display:'flex',
        gap:'0.5rem',
        alignItems:'center',
      }}>
        <p>ID:</p>
        <input
          style={{ width:'6rem', }}
          id="greet-input"
          value={room.roomID}
          onChange={(e) => setRoomID(e.currentTarget.value)}
          placeholder="Enter room ID..."
        />
        <p>Name:</p>
        <input
          style={{ width:'16rem', }}
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

      <div style={{
        display:'flex',
        /* flexDirection:'column', */
        gap:'1rem',
        alignItems:'center',
      }}>
        <div style={{
          display:'flex',
          flexDirection:'column',
          gap:'0.5rem',
        }}>
          New Special Tile Editor
          <div style={{
            display:'flex',
            alignItems:'center',
            gap:'0.5rem',
          }}>
            <p>Type:</p>
            <input
              /* value={room.roomName} */
              /* onChange={(e) => setRoomName(e.currentTarget.value)} */
              placeholder="Enter tile tile..."
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <p>Dialogue:</p>
            <input
              /* value={newSpecialTile.dialogue} */
              /* onChange={(e) => setNewSpecialTile({ ...newSpecialTile, dialogue: e.target.value })} */
              placeholder="Enter dialogue..."
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection:'column',
              /* alignItems: 'center', */
              gap: '0.5rem',
            }}
          >
            <p>Contents:</p>
            {tileContents.map((content, index) => (
              <input
                key={index}
                value={content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="Enter contents..."
              />
            ))}
            <button
              style={{width:'100%'}}
              onClick={() => {setTileContents([...tileContents, '']);}}
            >
              +
            </button>
          </div>
        </div>
        <button>
          Generate
        </button>
        <div>
          TODO: New Tile JSON Go Here
        </div>
      </div>
    </div>
  );
}

export default EditorToolbar;


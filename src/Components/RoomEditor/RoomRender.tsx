import './room-style.css'; // You can create a CSS file for styling
import { useEditorContext } from './EditorProvider';
/* import { tileTypeToColor } from './Interface'; */

/* 28 x 66 */
const RoomRender: React.FC = () => {
  const {
    room,
    handleTileClick,
  } = useEditorContext();


  // Generate the grid cells
  const renderGrid = () => {
    const grid = [];
    const topRow = [];
    topRow.push(<div key={`label-empty`} className="label"></div>);
    for (let x = 0; x < 20; x++) {
      topRow.push(
        <div key={`col-${x}`} className="label">
          {x}
        </div>
      );
    }
    grid.push(<div key="top-row" className="tile-row">{topRow}</div>);

    for (let y = 0; y < 12; y++) {
      const row = [];
      row.push(
        <div key={`row-label-${y}`} className="label">
          {y}
        </div>
      );

      for (let x = 0; x < 20; x++) {
        const specialTile = room.specialTiles.find((tile) => tile.x === x && tile.y === y);
        /* const cellStyle = { */
        /*   backgroundColor: specialTile ? tileTypeToColor[specialTile.type] : 'transparent', */
        /*   borderColor: specialTile ? "transparent" : "hsla(var(--base06), 0.2)" */
        /* }; */

        row.push(
          <div
            key={`cell-${x}-${y}`}
            className={`tile ${specialTile? specialTile.type : 'empty'}`}
            /* style={cellStyle} */
            onClick={() => handleTileClick(x, y)}
          ></div>
        );
      }
      grid.push(<div key={`row-${y}`} className="tile-row">{row}</div>);
    }

    return grid;
  };

  return (
    <div
      key={`room-${room.roomID}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className=""
    >
      {renderGrid()}
    </div>
  );
};

export default RoomRender;


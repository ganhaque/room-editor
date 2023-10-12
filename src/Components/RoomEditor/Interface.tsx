export const tileTypeToColor: Record<string, string> = {
  transition: "#be95ff",
  npc: "#f2cdcd",
  chest: "#f6ca6b",
  battle: "#E95678",
  terrain: "#95c561"
};

export interface Room {
  roomID: string;
  roomName: string;
  specialTiles: SpecialTile[];
}

export interface SpecialTile {
  x: number;
  y: number;
  type: string;
  dialogue?: string;
  contents?: string[];
  destinationRoomID?: string;
  requirement?: string;
}

export const exampleRoom: Room = {
  roomID: "00-00",
  roomName: "Forest Clearing",
  specialTiles: [
    {
      x: 15,
      y: 8,
      type: "transition",
      destinationRoomID: "01-00"
    },
    {
      x: 15,
      y: 9,
      type: "terrain",
    },
    {
      x: 6,
      y: 5,
      type: "npc",
      dialogue: "OldMan-1",
      contents: [
        "1-health_potion"
      ]
      /* dialogue: "It's dangerous to go alone! Take this." */
    },
    {
      x: 5,
      y: 8,
      type: "chest",
      contents: [
        "1-health_potion"
      ]
    },
    {
      x: 5,
      y: 1,
      type: "encounter",
    },
  ],
};

export const defaultSpecialTile: SpecialTile = {
  x: -1,
  y: -1,
  type: 'chest',
}

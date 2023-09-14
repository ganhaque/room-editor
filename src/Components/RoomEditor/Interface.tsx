export const ObjectID = [
  "Chest-2",
  "Monster-1",
]

export interface Room {
  roomID: string;
  roomName: string;
  tiles: number[][];
  interactableTiles: InteractableTile[];
  transitionTiles: TransitionTile[];
}

interface InteractableTile {
  x: number;
  y: number;
  type: "npc" | "chest";
  dialogue?: string;
  contents?: string[];
}

interface TransitionTile {
  x: number;
  y: number;
  type: "normal";
}

export const exampleRoom: Room = {
  roomID: "00-00",
  roomName: "Forest Clearing",
  tiles: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  interactableTiles: [
    {
      x: 6,
      y: 5,
      type: "npc",
      dialogue: "It's dangerous to go alone! Take this."
    },
    {
      x: 6,
      y: 5,
      type: "chest",
      contents: ["1x-health_potion"]
    },
  ],
  transitionTiles: [
    {
      x: 0,
      y: 8,
      type: "normal",
    },
  ],
};

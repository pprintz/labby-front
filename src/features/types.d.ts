declare module 'MyModels' {
  export interface Character {
    name: string;
    moves: Move[];
    basicMoves: Move[];
  }
  export type CharacterDescription = string;
  export interface Move {
    command: string[];
    hitLevel: string[];
    damage: number[];
    startUpFrame: string[];
    blockFrame: string;
    hitFrame: string;
    chFrame: string;
    notes: string[];
  }
}

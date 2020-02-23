import { RootState } from 'MyTypes';

export const getCharacters = (state: RootState) => state.characters.characters;

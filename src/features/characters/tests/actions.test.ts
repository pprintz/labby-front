import { loadCharacterAsync, loadCharactersAsync } from '../actions';
import { PayloadAction } from 'typesafe-actions';
import { Character, CharacterDescription } from 'MyModels';

describe('actions', () => {
  describe('loadCharacter', () => {
    it('should create an action with loadCharacter request', () => {
      const charName = 'akuma';
      const expectedAction: PayloadAction<string, string> = {
        type: 'LOAD_CHARACTER_REQUEST',
        payload: charName,
      };
      expect(loadCharacterAsync.request(charName)).toEqual(expectedAction);
    });

    it('should create an action with a loadCharacter success', () => {
      const char: Character = { name: 'Akuma', moves: [], basicMoves: [] };
      const expectedAction: PayloadAction<string, Character> = {
        type: 'LOAD_CHARACTER_SUCCESS',
        payload: char,
      };
      expect(loadCharacterAsync.success(char)).toEqual(expectedAction);
    });

    it('should create an action with a loadCharacter failure', () => {
      const error: Error = { name: 'errorName', message: 'Something went wrong' };
      const expectedAction: PayloadAction<string, Error> = {
        type: 'LOAD_CHARACTER_FAILURE',
        payload: error,
      };
      expect(loadCharacterAsync.failure(error)).toEqual(expectedAction);
    });
  });

  describe('loadCharacters', () => {
    it('should create an action with loadCharacters request', () => {
      const expectedAction: PayloadAction<string, undefined> = {
        type: 'LOAD_CHARACTERS_REQUEST',
        payload: undefined,
      };
      expect(loadCharactersAsync.request()).toEqual(expectedAction);
    });

    it('should create an action with a loadCharacters success', () => {
      const chars: CharacterDescription[] = ['Akuma'];
      const expectedAction: PayloadAction<string, CharacterDescription[]> = {
        type: 'LOAD_CHARACTERS_SUCCESS',
        payload: chars,
      };
      expect(loadCharactersAsync.success(chars)).toEqual(expectedAction);
    });

    it('should create an action with a loadCharacter failure', () => {
      const error: Error = { name: 'errorName', message: 'Something went wrong' };
      const expectedAction: PayloadAction<string, Error> = {
        type: 'LOAD_CHARACTERS_FAILURE',
        payload: error,
      };
      expect(loadCharactersAsync.failure(error)).toEqual(expectedAction);
    });
  });
});

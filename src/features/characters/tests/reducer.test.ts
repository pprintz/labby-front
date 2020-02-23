import reducer from '../reducer';
import { loadCharactersAsync, loadCharacterAsync } from '../actions';
import { Character } from 'MyModels';
import { RouterState } from 'connected-react-router';
import { RootState } from 'MyTypes';

describe('epics', () => {
  const rootStateMock = {
    isLoadingCharacter: false,
    isLoadingCharacters: false,
    character: {} as Character,
    characters: [],
  };
  const expectState = {
    isLoadingCharacter: false,
    isLoadingCharacters: true,
    character: {} as Character,
    characters: [],
  };

  it('Should change isLoadingCharacters according to actions', () => {
    expect(reducer(rootStateMock, loadCharactersAsync.request())).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: true,
      character: {} as Character,
      characters: [],
    });
    expect(reducer(rootStateMock, loadCharactersAsync.failure(new Error()))).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: [],
    });
    expect(reducer(rootStateMock, loadCharactersAsync.success([]))).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: [],
    });
  });
  it('Should change isLoadingCharacter according to actions', () => {
    expect(reducer(rootStateMock, loadCharacterAsync.request('akuma'))).toEqual({
      isLoadingCharacter: true,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: [],
    });
    expect(reducer(rootStateMock, loadCharacterAsync.failure(new Error()))).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: [],
    });
    expect(reducer(rootStateMock, loadCharacterAsync.success({} as Character))).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: [],
    });
  });
  it('Should change characters according to actions', () => {
    expect(reducer(rootStateMock, loadCharactersAsync.success(['Akuma']))).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: ['Akuma'],
    });
  });
  it('Should change character according to actions', () => {
    const char: Character = { basicMoves: [], moves: [], name: 'Akuma' };
    expect(reducer(rootStateMock, loadCharacterAsync.success(char))).toEqual({
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: char,
      characters: [],
    });
  });
});

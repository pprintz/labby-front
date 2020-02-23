import { createAsyncAction } from 'typesafe-actions';
import { Character, CharacterDescription } from 'MyModels';

export const loadCharactersAsync = createAsyncAction(
  'LOAD_CHARACTERS_REQUEST',
  'LOAD_CHARACTERS_SUCCESS',
  'LOAD_CHARACTERS_FAILURE'
)<undefined, CharacterDescription[], Error>();

export const loadCharacterAsync = createAsyncAction(
  'LOAD_CHARACTER_REQUEST',
  'LOAD_CHARACTER_SUCCESS',
  'LOAD_CHARACTER_FAILURE'
)<string, Character, Error>();

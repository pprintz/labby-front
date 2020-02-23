import { Character, CharacterDescription } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loadCharactersAsync, loadCharacterAsync } from './actions';

const reducer = combineReducers({
  isLoadingCharacters: createReducer(false as boolean)
    .handleAction([loadCharactersAsync.request], (state, action) => true)
    .handleAction(
      [loadCharactersAsync.success, loadCharactersAsync.failure],
      (state, action) => false
    ),
  isLoadingCharacter: createReducer(false as boolean)
    .handleAction([loadCharacterAsync.request], (state, action) => true)
    .handleAction(
      [loadCharacterAsync.success, loadCharacterAsync.failure],
      (state, action) => false
    ),
  characters: createReducer([] as CharacterDescription[]).handleAction(
    [loadCharactersAsync.success],
    (state, action) => action.payload
  ),
  character: createReducer({} as Character).handleAction(
    [loadCharacterAsync.success],
    (state, action) => action.payload
  ),
});
export default reducer;

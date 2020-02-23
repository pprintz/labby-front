import { RootEpic } from 'MyTypes';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { loadCharacterAsync, loadCharactersAsync } from './actions';

export const loadCharactersEpic: RootEpic = (action$, _state$, { api, toast }) =>
  action$.pipe(
    filter(isActionOf(loadCharactersAsync.request)),
    switchMap(() =>
      from(api.characters.loadCharacters()).pipe(
        map(r => loadCharactersAsync.success(r.data)),
        catchError((err: Error) => {
          toast.error(err.message);
          return of(loadCharactersAsync.failure(err));
        })
      )
    )
  );
export const loadCharacterEpic: RootEpic = (action$, _state$, { api, toast }) =>
  action$.pipe(
    filter(isActionOf(loadCharacterAsync.request)),
    switchMap(action =>
      from(api.characters.loadCharacter(action.payload)).pipe(
        map(r => loadCharacterAsync.success(r.data)),
        catchError((err: Error) => {
          toast.error(err.message);
          return of(loadCharacterAsync.failure(err));
        })
      )
    )
  );

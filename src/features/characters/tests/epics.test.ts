import { TestScheduler } from 'rxjs/testing';
import { loadCharactersAsync, loadCharacterAsync } from '../actions';
import { loadCharactersEpic, loadCharacterEpic } from '../epics';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { RootState, Services } from 'MyTypes';
import { Character } from 'MyModels';
import { RouterState } from 'connected-react-router';
import { AxiosResponse } from 'axios';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

describe('epics', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  const rootStateMock: RootState = {
    router: {} as RouterState,
    characters: {
      isLoadingCharacter: false,
      isLoadingCharacters: false,
      character: {} as Character,
      characters: [],
    },
  };

  const serviceMock: Services = {
    api: {
      characters: {
        loadCharacters: jest.fn(),
        loadCharacter: jest.fn(),
      },
    },
    toast: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), success: jest.fn() },
  };

  it(
    'should support marble tests',
    marbles(m => {
      const source = m.hot('--^-a-b-c-|');
      const subs = '^-------!';
      const expected = '--b-c-d-|';

      const destination = source.pipe(map(value => String.fromCharCode(value.charCodeAt(0) + 1)));
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it('should return correct output observable (success) after loadCharacters action observable', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$ = hot('-a', {
        a: loadCharactersAsync.request(),
      });
      const action$ = new ActionsObservable(actionInput$);
      const stateInput$ = hot<RootState>('-a', {
        a: rootStateMock,
      });
      const state$ = new StateObservable(stateInput$, rootStateMock);
      const chars: string[] = ['akuma'];
      const response: AxiosResponse<string[]> = {
        data: chars,
        status: 500,
        statusText: 'st',
        headers: [],
        config: {},
      };
      serviceMock.api.characters.loadCharacters = jest.fn().mockReturnValue(of(response));

      const output$ = loadCharactersEpic(action$, state$, serviceMock);

      expectObservable(output$).toBe('-a', {
        a: loadCharactersAsync.success(chars),
      });
    });
  });
  it('should return correct output observable (failure) after loadCharactersRequest action observable', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$ = hot('-a', {
        a: loadCharactersAsync.request(),
      });
      const action$ = new ActionsObservable(actionInput$);
      const stateInput$ = hot<RootState>('-a', {
        a: rootStateMock,
      });
      const state$ = new StateObservable(stateInput$, rootStateMock);
      const err = new Error('TestError');

      serviceMock.api.characters.loadCharacters = jest.fn().mockImplementation(() => {
        return throwError(err);
      });
      serviceMock.toast.error = jest.fn();

      const output$ = loadCharactersEpic(action$, state$, serviceMock);
      serviceMock.toast.error = jest.fn();
      expectObservable(output$).toBe('--a', {
        a: loadCharactersAsync.failure(err),
      });
    });
  });
  it('should return correct output observable (success) after loadCharacter action observable', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$ = hot('-a', {
        a: loadCharacterAsync.request('Akuma'),
      });
      const action$ = new ActionsObservable(actionInput$);
      const stateInput$ = hot<RootState>('-a', {
        a: rootStateMock,
      });
      const state$ = new StateObservable(stateInput$, rootStateMock);
      const char: Character = { moves: [], basicMoves: [], name: 'Akuma' };
      const response: AxiosResponse<Character> = {
        data: char,
        status: 500,
        statusText: 'st',
        headers: [],
        config: {},
      };
      serviceMock.api.characters.loadCharacter = jest.fn().mockImplementation(() => {
        return of(response);
      });

      const output$ = loadCharacterEpic(action$, state$, serviceMock);

      expectObservable(output$).toBe('---a', {
        a: loadCharacterAsync.success(char),
      });
    });
  });
  it('should return correct output observable (failure) after loadCharacterRequest action observable', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$ = hot('-a', {
        a: loadCharacterAsync.request('Akuma'),
      });
      const action$ = new ActionsObservable(actionInput$);
      const stateInput$ = hot<RootState>('-a', {
        a: rootStateMock,
      });
      const state$ = new StateObservable(stateInput$, rootStateMock);
      const err = new Error('TestError');

      serviceMock.api.characters.loadCharacter = jest.fn().mockImplementation(() => {
        return throwError(err);
      });
      serviceMock.toast.error = jest.fn();

      const output$ = loadCharacterEpic(action$, state$, serviceMock);

      expectObservable(output$).toBe('----a', {
        a: loadCharacterAsync.failure(err),
      });
    });
  });
});

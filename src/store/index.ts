import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// tslint:disable-next-line: no-submodule-imports
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './root-reducer';
import services from '../services';
import { RootAction, RootState, Services } from 'MyTypes';
import rootEpic from './root-epic';

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services,
});

const composeEnhancers = composeWithDevTools({});

// configure middlewares
export const history = createBrowserHistory();
const middlewares = [routerMiddleware(history), epicMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

epicMiddleware.run(rootEpic);

export default store;

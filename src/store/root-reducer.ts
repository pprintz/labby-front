import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import characters from '../features/characters/reducer';

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    characters,
  });

export default rootReducer;

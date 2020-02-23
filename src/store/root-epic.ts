import { combineEpics } from 'redux-observable';

import * as characters from '../features/characters/epics';

export default combineEpics(...Object.values(characters));

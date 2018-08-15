import {combineEpics} from 'redux-observable';

import profileEpics from '../uniplayer/state/epics';

export default combineEpics(...profileEpics);

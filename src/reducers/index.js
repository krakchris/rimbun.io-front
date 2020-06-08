import { combineReducers } from 'redux';
import keplerGlReducer from "kepler.gl/reducers";

import auth from './auth';
import runtime from './runtime';
import navigation from './navigation';
import dashboard from './dashboard';
import posts from './posts';
import map from './map';

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    // hide all modals whtn mounted
    currentModal: null
  }
});

export default combineReducers({
  auth,
  runtime,
  navigation,
  dashboard,
  posts,
  keplerGl: customizedKeplerGlReducer,
  map
});

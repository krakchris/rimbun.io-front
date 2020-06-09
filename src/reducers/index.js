import { combineReducers } from 'redux';
import keplerGlReducer from "kepler.gl/reducers";

import auth from './auth';
import runtime from './runtime';
import navigation from './navigation';
import dashboard from './dashboard';
import posts from './posts';
import chart from './chart'
import map from './map';


const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
    uiState: {
      // hide side panel to disallower user customize the map
      currentModal: null
    }
  })
  // handle additional actions
  .plugin({
    HIDE_SIDE_PANEL: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: true
      }
    })
  });


export default combineReducers({
  auth,
  runtime,
  navigation,
  dashboard,
  posts,
  keplerGl: customizedKeplerGlReducer,
  map,
  chart
});

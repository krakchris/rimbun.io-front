
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';
import thunk from 'redux-thunk';
import appReducer from './app-reducer';

const customizedKeplerGlReducer = keplerGlReducer.initialState({
    uiState: {
        // hide all modals whtn mounted
        currentModal: null,
    }
});

const reducers = combineReducers({
    keplerGl: customizedKeplerGlReducer,
    app: appReducer
});

const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares, thunk)];

export default createStore(reducers, {}, compose(...enhancers));
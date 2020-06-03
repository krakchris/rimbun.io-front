import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import keplerGlReducer from "kepler.gl/reducers";
import { enhanceReduxMiddleware } from "kepler.gl/middleware";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares, thunk)];

export default createStore(reducers, {}, compose(...enhancers));

// //middleware
// export const middlewares = [
//     ReduxThunk
// ];
// export const enhancers = [applyMiddleware(...middlewares)];

// // add redux devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const initialState = {};

// export default createStore(
//   reducers,
//   initialState,
//   composeEnhancers(...enhancers)
// );
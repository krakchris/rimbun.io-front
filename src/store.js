import { createStore, applyMiddleware, compose } from "redux";
import { enhanceReduxMiddleware } from "kepler.gl/middleware";
import thunk from "redux-thunk";
import composedReducer from "./reducers/kepler";


const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares, thunk)];

export default createStore(composedReducer, {}, compose(...enhancers));

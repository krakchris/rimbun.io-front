import { createStore, applyMiddleware, compose } from "redux";
import { enhanceReduxMiddleware } from "kepler.gl/middleware";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares, thunk)];

export default createStore(reducers, {}, compose(...enhancers));

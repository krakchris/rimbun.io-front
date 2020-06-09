import { createStore, applyMiddleware, compose } from "redux";
import { combinedUpdaters } from 'kepler.gl/reducers';
import { enhanceReduxMiddleware } from "kepler.gl/middleware";
import thunk from "redux-thunk";
import reducers from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";

const composedReducer = (state, action) => {
    switch (action.type) {
        // add data to map after receiving data from remote sources
        case 'LOAD_REMOTE_RESOURCE_SUCCESS':
            console.log("LOAD_REMOTE_RESOURCE_SUCCESS", action.payload.instance)
            console.log("payload", action.payload)
            if (action.payload.instance === 'viewMap') {
                return {
                    ...state,
                    keplerGl: {
                        ...state.keplerGl,
                        // pass in kepler.gl instance state to combinedUpdaters
                        viewMap: combinedUpdaters.addDataToMapUpdater(
                            state.keplerGl.viewMap,
                            {
                                payload: {
                                    datasets: action.payload.datasets,
                                    config: action.payload.config
                                }
                            }
                        )
                    }
                }
            }
            else {
                return {
                    ...state,
                    keplerGl: {
                        ...state.keplerGl,
                        // pass in kepler.gl instance state to combinedUpdaters
                        editMap: combinedUpdaters.addDataToMapUpdater(
                            state.keplerGl.editMap,
                            {
                                payload: {
                                    datasets: action.payload.datasets,
                                    config: action.payload.config
                                }
                            }
                        )
                    }
                }
            }
    }
    return reducers(state, action);
};


const middlewares = enhanceReduxMiddleware([]);
const enhancers = [applyMiddleware(...middlewares, thunk)];

export default createStore(composedReducer, {}, compose(...enhancers));

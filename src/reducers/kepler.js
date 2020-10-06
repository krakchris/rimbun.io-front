
import { processGeojson, processCsvData } from "kepler.gl/processors";
import { combinedUpdaters } from "kepler.gl/reducers";
import reducers from "./index";

const composedReducer = (state, action) => {
  switch (action.type) {
    // add data to map after receiving data from remote sources
    case 'LOAD_REMOTE_RESOURCE_SUCCESS':
      let processorMethod = processCsvData;
      let datasets = action.options.dataset.map(item => {
        // create helper to determine file ext eligibility
        if (item.dataUrl.includes('.json') || item.dataUrl.includes('.geojson')) {
          processorMethod = processGeojson;
        }
        return ({
          info: item.info,
          data: processorMethod(item.data)
        })
      })
      const config = action.options.config;
      if (action.options.mapInstanceId === 'viewMap') {
        return {
          ...state,
          keplerGl: {
            ...state.keplerGl,
            // pass in kepler.gl instance state to combinedUpdaters
            viewMap: combinedUpdaters.addDataToMapUpdater(
              state.keplerGl.viewMap,
              {
                payload: {
                  datasets: datasets,
                  config: config
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
                  datasets: datasets,
                  config: config
                }
              }
            )
          }
        }
      }
  }
  return reducers(state, action);
};

export default composedReducer;

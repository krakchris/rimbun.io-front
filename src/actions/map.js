import { toast } from "react-toastify";
import api, { endPoints } from "../api";
import { addDataToMap, wrapTo } from "kepler.gl/actions";
import { processCsvData } from "kepler.gl/processors";

export const MAP_REQUEST = "MAP_REQUEST";
export const MAP_SUCCESS = "MAP_SUCCESS";
export const MAP_FAILURE = "MAP_FAILURE";

export const HIDE_SIDE_PANEL = "HIDE_SIDE_PANEL";
export const SAVE_CONFIG_REQUEST = "SAVE_CONFIG_REQUEST";
export const SAVE_CONFIG_SUCCESS = "SAVE_CONFIG_SUCCESS";
export const SAVE_CONFIG_FAILURE = "SAVE_CONFIG_FAILURE";


export function hideSidePanel() {
  return {
    type: HIDE_SIDE_PANEL
  }
}

function requestMapData() {
  return {
    type: MAP_REQUEST,
    isFetching: true,
    isError: false,
  };
}

export function mapDataSucess(data) {
  return {
    type: MAP_SUCCESS,
    isFetching: false,
    isError: false,
    data
  };
}

function mapDataFail(message) {
  return {
    type: MAP_FAILURE,
    isFetching: false,
    isError: true,
    message
  };
}


export function getMapDataById(data) {
    const { mapId, mapInstanceId } = data;
    return dispatch => {
        dispatch(requestMapData());
        api(endPoints.getMapDataByID)
          .getOne({ id: mapId })
          .then(response => {
            const { master, config, name } = response.data.data.doc;
            const wrapToMap = wrapTo(mapInstanceId);
              dispatch(wrapToMap(addDataToMap({
                  datasets: prepareKeplerData(master),
                  config: config
              })));
              dispatch(mapDataSucess({mapId, name}));
          })
      .catch(error => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Server error Occurred";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        dispatch(mapDataFail());
      });
  }

}


function requestSaveConfig() {
  return {
    type: SAVE_CONFIG_REQUEST,
    isFetching: true,
    isError: false,
  };
}

export function saveConfigSucess(data) {
  return {
    type: SAVE_CONFIG_SUCCESS,
    isFetching: false,
    isError: false,
    data
  };
}

function saveConfigFail(message) {
  return {
    type: SAVE_CONFIG_FAILURE,
    isFetching: false,
    isError: true,
    message
  };
}


export function saveMapConfig(data) {
  const { mapId, config } = data;
  return dispatch => {
    dispatch(requestSaveConfig());
    api(endPoints.saveMapConfig)
      .patch({ id: mapId }, config)
      .then(response => {
        toast.success('Map Config is Saved Successfully', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        dispatch(saveConfigSucess());
      })
      .catch(error => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Server error Occurred";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        dispatch(saveConfigFail());
      });
  }

}





function prepareKeplerData(dataset){
    const finalDatasets = dataset.map((item) => {
        // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
        const datasetItem = processCsvData(item.file);
        return ({
          data: datasetItem,
          info: {
            // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
            // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
            id: item._id
          }
        });

    });
  return finalDatasets;
}
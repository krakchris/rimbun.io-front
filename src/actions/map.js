import { toast } from "react-toastify";
import api, { endPoints } from "../api";
import { request } from 'd3-request';
import { S3_BUCKET_URL } from '../constants';

export const MAP_REQUEST = "MAP_REQUEST";
export const MAP_SUCCESS = "MAP_SUCCESS";
export const MAP_FAILURE = "MAP_FAILURE";

export const HIDE_SIDE_PANEL = "HIDE_SIDE_PANEL";
export const SAVE_CONFIG_REQUEST = "SAVE_CONFIG_REQUEST";
export const SAVE_CONFIG_SUCCESS = "SAVE_CONFIG_SUCCESS";
export const SAVE_CONFIG_FAILURE = "SAVE_CONFIG_FAILURE";
export const LOAD_REMOTE_RESOURCE_SUCCESS = "LOAD_REMOTE_RESOURCE_SUCCESS";

export function hideSidePanel() {
  return {
    type: HIDE_SIDE_PANEL
  }
}

export function loadRemoteResourceSuccess(options) {
  return {
    type: LOAD_REMOTE_RESOURCE_SUCCESS,
    options
  };
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

function detectResponseError(response) {
  if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
    return {
      status: response.statusCode,
      message: response.body || response.message || response
    };
  }
}


function loadRemoteRawData(url) {
  if (!url) {
    // TODO: we should return reject with an appropriate error
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    request(url, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      const responseError = detectResponseError(result);
      if (responseError) {
        reject(responseError);
        return;
      }
      resolve([result.response, url]);
    });
  });
}


export function getMapDataById(data) {
  const { mapId, mapInstanceId } = data;
  return dispatch => {
    dispatch(requestMapData());
    api(endPoints.getMapDataByID)
      .getOne({ id: mapId })
      .then(response => {
        const { master, config, name } = response.data.data.doc;
        prepareKeplerData({ master, config, mapInstanceId, mapId, name, dispatch });
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




function prepareKeplerData(data) {
  const { master, config, mapInstanceId, mapId, name, dispatch } = data;
  let dataset = [];
  let finalData = master.map(async (item) => {
    await loadRemoteRawData(`${S3_BUCKET_URL}/${item.file}`).then(
      ([data, url]) => {
        let layer = {
          data: data,
          info: {
            id: item._id
          },
          dataUrl: url
        }
        dataset.push(layer);
      });
  });

  Promise.all(finalData)
    .then((res) => {
      dispatch(loadRemoteResourceSuccess({ dataset, config, mapInstanceId }))
      dispatch(mapDataSucess({ mapId, name }));
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
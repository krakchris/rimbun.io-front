import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { endPoints } from "../api";

export const CREATE_MAP_INITIAL = "CREATE_MAP_INITIAL";
export const CREATE_MAP_REQUEST = "CREATE_MAP_REQUEST";
export const CREATE_MAP_SUCCESS = "CREATE_MAP_SUCCESS";
export const CREATE_MAP_FAILURE = "CREATE_MAP_FAILURE";
export const FETCH_MAPS_REQUEST = 'FETCH_MAPS_REQUEST';
export const FETCH_MAPS_SUCCESS = 'FETCH_MAPS_SUCCESS';
export const FETCH_MAPS_FAILURE = 'FETCH_MAPS_FAILURE';

export const TAG_REQUEST = "TAG_REQUEST";
export const TAG_SUCCESS = "TAG_SUCCESS";
export const TAG_FAILURE = "TAG_FAILURE";

export const CLEAR_STATE = "CLEAR_STATE";


export const DELETE_MAP_REQUEST = "DELETE_MAP_REQUEST";
export const DELETE_MAP_SUCCESS = "DELETE_MAP_SUCCESS";
export const DELETE_MAP_FAILURE = "DELETE_MAP_FAILURE";


export function clearDashboardState() {
  return {
    type: CLEAR_STATE
  };

}

function createPostInitial() {
  return {
    type: CREATE_MAP_INITIAL,
    isFetching: false
  };
}

function requestCreateMap(map) {
  return {
    type: CREATE_MAP_REQUEST,
    isFetching: true,
    mapCreateStatus: false,
    map
  };
}

function createMapsuccess(map) {
  return {
    type: CREATE_MAP_SUCCESS,
    isFetching: false,
    mapCreateStatus: true,
    map
  };
}

function createMapError(message) {
  return {
    type: CREATE_MAP_FAILURE,
    isFetching: false,
    isError:true,
    message,
  };
}

export function createMap(formData) {
  const master = formData.selectedtagName.map(item => {
    return item.value;
  });
  const payload = { name: formData.mapName , master };
  return dispatch => {
    dispatch(requestCreateMap());
    const paramEndpoint = endPoints.createMap;
    api(paramEndpoint)
      .post(payload)
      .then(response => {
        dispatch(createMapsuccess(response));
      })
      .catch(error => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Server error Occurred";
        dispatch(createMapError(errorMessage));
      });
  };

}



/************* Fetch Map List in Dashboard  *******************/
function requestFetchMaps() {
  return {
    type: FETCH_MAPS_REQUEST,
    isFetching: true
  };
}

function fetchMapsSuccess(mapData) {
  return {
    type: FETCH_MAPS_SUCCESS,
    isFetching: false,
    mapData
  };
}

function fetchMapsError(message) {
  return {
    type: FETCH_MAPS_FAILURE,
    isFetching: false,
    isError: true,
    message
  };
}

export function fetchMaps(paginationParam) {
  const { pageNo, limit } = paginationParam;
  return dispatch => {
    dispatch(requestFetchMaps());
    const paramEndpoint = pageNo ? `${endPoints.getMapList}?page=${pageNo}&limit=${limit}` : endPoints.getMapList;
    api(paramEndpoint)
      .get({})
      .then(reponse => {
        dispatch(fetchMapsSuccess(reponse.data));
      })
      .catch(error => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Server error Occurred";
        dispatch(fetchMapsError(errorMessage));
      });
  };
        
}



/****** Fetch Tag Names Request ********/
function requestTagNames() {
  return {
    type: TAG_REQUEST,
    isFetching: true,
    isError: false,
  };
}

export function tagNamesSucess(data) {
  return {
    type: TAG_SUCCESS,
    isFetching: false,
    isError: false,
    data
  };
}

function tagNamesFail(message) {
  return {
    type: TAG_FAILURE,
    isFetching: false,
    isError: true,
    message
  };
}

export function getTagNames() {

  return dispatch => {
    dispatch(requestTagNames());
    api(endPoints.getTagNames)
      .get({})
      .then(response => {
        dispatch(tagNamesSucess(response.data.data.data));
      })
      .catch(error => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Server error Occurred";
        dispatch(tagNamesFail(errorMessage));
      });
  }
}



/**************** delete Map request *************/
function requestDeleteMap() {
  return {
    type: DELETE_MAP_REQUEST,
    isFetching: true,
    isError: false,
  };
}

export function deleteMapSucess(data) {
  return {
    type: DELETE_MAP_SUCCESS,
    isFetching: false,
    isError: false,
    data
  };
}

function deleteMapFail(message) {
  return {
    type: DELETE_MAP_FAILURE,
    isFetching: false,
    isError: true,
    message
  };
}


export function deleteMapById(data) {
  console.log(data);
  const { mapId } = data;
  return dispatch => {
    dispatch(requestDeleteMap());
    api(endPoints.deleteMap)
      .delete({ id: mapId })
      .then(response => {
        console.log('delete api respone===>', response);
        toast.update(mapId, {
          autoClose: 3000,
          toastId: mapId,
          position: "top-center",
          type: toast.TYPE.SUCCESS
        });
        dispatch(deleteMapSucess({ mapId }));
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
        dispatch(deleteMapFail());
      });
  }

}


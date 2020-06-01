
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

function fetchMapsSuccess(mapList) {
  return {
    type: FETCH_MAPS_SUCCESS,
    isFetching: false,
    mapList
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

export function fetchMaps(pageNo) {
  
  return dispatch => {
    dispatch(requestFetchMaps());
    const paramEndpoint = pageNo ? `${endPoints.getMapList}?page=${pageNo}` : endPoints.getMapList;
    api(paramEndpoint)
      .get({})
      .then(reponse => {
        dispatch(fetchMapsSuccess(reponse.data.data.data));
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

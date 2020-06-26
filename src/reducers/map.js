import {
  MAP_REQUEST,
  MAP_SUCCESS,
  MAP_FAILURE,
  SAVE_CONFIG_REQUEST,
  SAVE_CONFIG_SUCCESS,
  SAVE_CONFIG_FAILURE,
  DOWNLOAD_DATA_REQUEST,
  DOWNLOAD_DATA_SUCCESS,
  DOWNLOAD_DATA_FAILURE
} from "../actions/map";

export default function (state = {
    isFetching: false,
    isError: false,
    errorMessage: null,
    tagNames: [],
    mapData: null
    
}, action) {
    switch (action.type) {
      case MAP_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case MAP_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          mapData: action.data,
          errorMessage: null
        });
      case MAP_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isError: true,
          errorMessage: action.message
        });
      case SAVE_CONFIG_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case SAVE_CONFIG_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          tagNames: action.data,
          errorMessage: null
        });
      case SAVE_CONFIG_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isError: true,
          errorMessage: action.message
        });
      case DOWNLOAD_DATA_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case DOWNLOAD_DATA_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: null
        });
      case DOWNLOAD_DATA_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isError: true,
          errorMessage: action.message
        });
      default:
        return state;
    }
}

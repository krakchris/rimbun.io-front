import {
  CREATE_MAP_INITIAL,
  CREATE_MAP_REQUEST,
  CREATE_MAP_SUCCESS,
  CREATE_MAP_FAILURE,
  FETCH_MAPS_REQUEST,
  FETCH_MAPS_SUCCESS,
  FETCH_MAPS_FAILURE,
  TAG_REQUEST,
  TAG_SUCCESS,
  TAG_FAILURE,
  CLEAR_STATE
} from "../actions/dashboard";

export default function dashboard(
  state = {
    isFetching: false,
    isError: false,
    mapList: [],
    tagNames: [],
    mapCreateStatus: false,
    totalMapCount: 0,
    errorMessage: null
  },
  action,
) {
  switch (action.type) {
    case CREATE_MAP_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_MAP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        mapCreateStatus: false
      });
    case CREATE_MAP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        mapCreateStatus: true
      });
    case CREATE_MAP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage:action.message
      });
    case FETCH_MAPS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_MAPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        mapCreateStatus: false,
        mapList: action.mapData.data.data,
        totalMapCount: action.mapData.results
      });
    case FETCH_MAPS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        errorMessage: "Something wrong happened. Please come back later"
      });
    case TAG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case TAG_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tagNames: action.data,
        errorMessage: null
      });
    case TAG_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        errorMessage: action.message
      });
    case CLEAR_STATE:
      return Object.assign({}, state, {
        errorMessage: null
      });
    default:
      return state;
  }
}

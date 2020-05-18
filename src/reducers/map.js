import {
  TAG_REQUEST,
  TAG_SUCCESS,
  TAG_FAILURE,
  MAP_REQUEST,
  MAP_SUCCESS,
  MAP_FAILURE
} from "../actions/map";
import * as auth from "../lib/token";

const token = auth.getToken();
export default function (state = {
    isFetching: false,
    isError: false,
    errorMessage: null,
    tagNames: []
    
}, action) {
    switch (action.type) {
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
        case MAP_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case MAP_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                tagNames: action.data,
                errorMessage: null
            });
        case MAP_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isError: true,
                errorMessage: action.message
            });
        default:
            return state;
    }
}

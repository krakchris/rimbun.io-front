import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  USER_CREATE_REQUEST,
  USER_CREATE_FAILURE,
  USER_CREATE_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "../actions/user";
import * as auth from "../lib/token";

const token = auth.getToken();
export default function (state = {
  isFetching: false,
  isAuthenticated: !!token,
  isLoading: false,
  isError: false,
  userList: [],
  errorMessage: null
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case USER_CREATE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        isError: false
      });
    case USER_CREATE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isError: true
      });
    case USER_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isError: false
      });
    case USER_CREATE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        isError: false
      });
    case FETCH_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isFetching: false,
        userList: action.payload
      });
    case FETCH_USER_FAILURE:
      return Object.assign({}, state, {
        isError: true,
        errorMessage: action.data
      });
    default:
      return state;
  }
}

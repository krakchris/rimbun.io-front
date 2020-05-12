import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  USER_CREATE_REQUEST,
  USER_CREATE_FAILURE,
  USER_CREATE_SUCCESS,
  SET_USER_DETAILS
} from "../actions/user";



const token = localStorage.getItem('token');
export default function auth(state = {
  isFetching: false,
  isAuthenticated: !!token,
  isLoading: false,
  isError: false
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
            isError: false,
        });
    case USER_CREATE_FAILURE:
    return Object.assign({}, state, {
        isLoading: false,
        isError: true,
    });
    case USER_CREATE_SUCCESS:
    return Object.assign({}, state, {
        isLoading: false,
        isError: false,
    });
    case SET_USER_DETAILS:
      return Object.assign({},state,{
        fetchData:action.payload
      })
    default:
      return state;
  }
}

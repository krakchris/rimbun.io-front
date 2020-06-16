import { toast } from "react-toastify";
import api, { endPoints } from "../api";
import * as auth from "../lib/token";
import * as context from "../lib/localData";
import { OFFICIAL_ROLE_TAG } from '../constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = "USER_CREATE_FAILURE";

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";


function requestCreateUser(payload) {
  return {
    type: USER_CREATE_REQUEST,
    isLoading: true,
    isError: false,
    payload
  };
}

function receiveCreateUser(payload) {
  return {
    type: USER_CREATE_SUCCESS,
    isLoading: false,
    isError: false,
    payload
  };
}

function createUserError(message) {
  return {
    type: USER_CREATE_FAILURE,
    isLoading: false,
    isError: true,
    message
  };
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: auth.getToken()
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    auth.clearToken();
    context.clearLoggedInUser();
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    const payload = { email: creds.login, password: creds.password };
    api(endPoints.login)
      .post(payload)
      .then(response => {
        auth.setToken(response.data.token);
        context.setLoggedInConfig(JSON.stringify(response.data));
        dispatch(receiveLogin(response.data));
      })
      .catch(error => {
        const errorMessage = (error.response) ? error.response.data.message : 'Server error Occurred';
        dispatch(loginError(errorMessage));
      });

  };



}


export function createUser(payload) {

  return dispatch => {

    dispatch(requestCreateUser(payload));
    api(endPoints.createUser)
      .post(payload)
      .then(response => {
        toast.success('User created Sucessfully.', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        dispatch(receiveCreateUser(response));
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
        dispatch(createUserError(errorMessage));
      });

  };

}



/****** fetch user listing  *******/

function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST,
    isFetching: true,
  };
}

function fetchUserSuccess(payload) {
  return {
    type: FETCH_USER_SUCCESS,
    isFetching: false,
    payload
  };
}

export function fetchUsersFailure(message) {
  return {
    type: FETCH_USER_FAILURE,
    isFetching: false,
    isError: true,
    data: message
  };
}



export function fetchUsers() {
  return dispatch => {
    dispatch(fetchUserRequest());
    const paramEndpoint = `${endPoints.getAllUsers}?role=${OFFICIAL_ROLE_TAG}`;
    api(paramEndpoint)
      .get({})
      .then(reponse => {
        dispatch(fetchUserSuccess(reponse.data.data.data))
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
        dispatch(fetchUsersFailure(errorMessage));
      })
  }
}
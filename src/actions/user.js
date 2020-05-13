import { toast } from "react-toastify";
import appConfig from '../config';
import api, { endPoints } from "../api";
import * as auth from "../lib/token";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = "USER_CREATE_FAILURE";
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

function fetchUserSuccess(payload) {
  return {
    type: FETCH_USER_SUCCESS,
    payload
  }
}

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

export function receiveLogin(user) {
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
        dispatch(receiveLogin({ token: response.data.token }));
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

export function fetchUsers() {
  return dispatch => {
    api(endPoints.createUser)
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
      })
  }
}
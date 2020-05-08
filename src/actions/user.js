import appConfig from '../config';
import api, { endPoints } from "../api";
import * as auth from "../lib/token";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

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
        const errorMessage = error.response.data.message;
        dispatch(loginError(errorMessage));
      });

  };
        
  

}

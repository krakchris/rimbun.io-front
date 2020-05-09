export const AUTH_ACCESS_TOKEN = "AUTH_ACCESS_TOKEN";

export const getToken = () => localStorage.getItem(AUTH_ACCESS_TOKEN);

export const setToken = token => localStorage.setItem(AUTH_ACCESS_TOKEN, token);

export const clearToken = token => {
    localStorage.removeItem(AUTH_ACCESS_TOKEN);
    document.cookie =
      "AUTH_ACCESS_TOKEN=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const isLoggedIn = () => {
  if (getToken()) {
    return true;
  }
  return false;
};

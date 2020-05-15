export const CONTEXT = 'context';

export const getLoggedInUser = () =>  ( localStorage.getItem(CONTEXT) ) ? JSON.parse(localStorage.getItem(CONTEXT)) : null;

export const setLoggedInUser = userDetails =>
    localStorage.setItem(CONTEXT, userDetails);
    
export const clearLoggedInUser = () =>
    localStorage.removeItem(CONTEXT);

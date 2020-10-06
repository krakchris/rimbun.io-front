import { setApiHeaders } from '../config';

export const CONTEXT = 'context';

export const getLoggedInUser = () =>  ( localStorage.getItem(CONTEXT) ) ? JSON.parse(localStorage.getItem(CONTEXT)) : null;

export const setLoggedInConfig = userDetails => {
    localStorage.setItem(CONTEXT, userDetails);
    setApiHeaders();
}
    
export const clearLoggedInUser = () =>
    localStorage.removeItem(CONTEXT);



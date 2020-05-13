export const CONTEXT = 'context';

export const getLoggedInUser = () => localStorage.getItem(CONTEXT);

export const setLoggedInUser = userDetails =>
    localStorage.setItem(CONTEXT, userDetails);
    
export const clearLoggedInUser = () =>
    localStorage.removeItem(CONTEXT);

import React from 'react';

const DEFAULT_COOKIE_VALUE = null;
const MAX_AGE = 604800

// Default - empty user state
export default React.createContext({ 
  token: null, 
  setToken: () => {},
  unsetToken: () => {},
});

export function useTokenState(cookies) {
  const initialToken = cookies.get(process.env.REACT_APP_COOKIE_SESSION_NAME) || DEFAULT_COOKIE_VALUE;
  const [token, updateToken] = React.useState(initialToken);

  const setToken = (token) => {
    updateToken(token);
    cookies.set(process.env.REACT_APP_COOKIE_SESSION_NAME, token, { maxAge: MAX_AGE });
  };
  
  const unsetToken = () => {
    updateToken(null);
    cookies.remove(process.env.REACT_APP_COOKIE_SESSION_NAME);
  };

  return [token, setToken, unsetToken];
};
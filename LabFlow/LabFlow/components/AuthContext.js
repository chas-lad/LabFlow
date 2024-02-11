///////////////////////////////////////////////////////////
// Title:       AuthContext.js
// Description: Code to create a context and a provider to
//              manage the user state
///////////////////////////////////////////////////////////

import React, { createContext, useContext, useReducer } from 'react';

// Context with initial values
const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

// Reducer to manage state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { loggedInUser: null });

  const setUser = (loggedInUser) => {
    dispatch({ type: 'SET_USER', payload: loggedInUser });
  };

  return (
    <AuthContext.Provider value={{ loggedInUser: state.loggedInUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext values
export const useAuth = () => {
  return useContext(AuthContext);
};

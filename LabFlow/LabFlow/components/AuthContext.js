import React, { createContext, useContext, useReducer } from 'react';

// Create a context with initial values
const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

// Create a reducer to manage state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

// Create an AuthProvider component to wrap your app
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

// Create a custom hook to access the AuthContext values
export const useAuth = () => {
  return useContext(AuthContext);
};

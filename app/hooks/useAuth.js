'use client';
import React, { useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

const useProvideAuth = () => {
  
  const signUp = async (user) => {  
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return await axios.post('http://localhost:3000/api/auth/signup', user, options);
  };

  const signIn = async (user) => {  
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return await axios.post('http://localhost:3000/api/auth/signin', user, options);
  };

  return {
    signUp,
    signIn
  };
}

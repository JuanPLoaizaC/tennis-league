'use client';
import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';

const ManageUsersContext = createContext();

export function ProviderManageUser({ children }) {
  const manageUser = useProvideManageUser();
  return <ManageUsersContext.Provider value={manageUser}>{children}</ManageUsersContext.Provider>;
}

export const useManageUsers = () => {
  const manageUser = useContext(ManageUsersContext);
  return manageUser;
};

const useProvideManageUser = () => {
  const [userSelected, setUserSelected] = useState({});

  const getUsers = async () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let body = {
      id: JSON.parse(localStorage.getItem('userTennisLeague'))
    }
    return await axios.post(`http://localhost:3000/api/management/manageUsersAdmin`, body, options);
  };

  const updateUser = async (manageUser) => {  
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return await axios.put('http://localhost:3000/api/management/tournamentsAdmin', manageUser, options);
  };

  return {
    userSelected,
    setUserSelected,
    getUsers,
    updateUser
  };
}

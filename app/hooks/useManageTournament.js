'use client';
import React, { useContext, createContext } from 'react';
import axios from 'axios';

const ManageTournamentContext = createContext();

export function ProviderManageTournament({ children }) {
  const manageTournament = useProvideManageTournament();
  return <ManageTournamentContext.Provider value={manageTournament}>{children}</ManageTournamentContext.Provider>;
}

export const useManageTournament = () => {
  const manageTournament = useContext(ManageTournamentContext);
  return manageTournament;
};

const useProvideManageTournament = () => {
  
  const CreateTournament = async (manageTournament) => {  
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return await axios.post('http://localhost:3000/api/management/createTournament', manageTournament, options);
  };

  return {
    CreateTournament
  };
}

import { createContext } from 'react';
import { ReactNode, useState, useContext } from 'react';
import { DatabaseContextType } from '../lib/types/types';

const DatabaseContext = createContext<DatabaseContextType>({
  isInitialised: false,
});

export const DatabaseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isInitialised, setIsInitialised] = useState(false);
  const updateGlobalState = () => {
    setIsInitialised(true);
    console.log(
      'Line 24 - DatabaseContextProvider - updateDatabaseState',
      isInitialised
    );
  };

  return (
    <DatabaseContext.Provider value={{ isInitialised: isInitialised }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error(
      'useDatabaseContext must be used within a DatabaseContextProvider'
    );
  }
  return context;
};

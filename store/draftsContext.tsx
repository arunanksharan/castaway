import { createContext, useContext, useState } from 'react';
import { DraftContextType, DraftType } from '../lib/types/types';

const DraftContext = createContext<DraftContextType>({
  drafts: [],
  updateDrafts: (draft: DraftType) => {},
  updateInitDrafts: (drafts: DraftType[]) => {},
});

export const DraftContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [drafts, setDrafts] = useState<DraftType[]>([]);

  const updateInitDrafts = (drafts: DraftType[]) => {
    setDrafts(drafts);
    console.log('Line 24 - DraftContextProvider - updateInitDrafts', drafts);
  };

  const updateDrafts = (draft: DraftType) => {
    setDrafts((prevDrafts) => [...prevDrafts, draft]);
    console.log('Line 24 - DraftContextProvider - updateDrafts', drafts);
  };
  return (
    <DraftContext.Provider
      value={{
        drafts: drafts,
        updateDrafts: updateDrafts,
        updateInitDrafts: updateInitDrafts,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraftContext = () => {
  const context = useContext(DraftContext);
  if (context === undefined) {
    throw new Error(
      'useDraftContext must be used within a DraftContextProvider'
    );
  }
  return context;
};

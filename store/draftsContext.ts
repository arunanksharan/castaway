// import { createContext } from 'react';
// import { ReactNode, useState, useContext } from 'react';
// import { DraftListType, DraftType } from '../lib/types/types';

// const DraftContext = createContext<DraftListType>({
//   drafts: [{ id: '', content: '', created_at: '' }],
//   deleteDraftHandler: () => {},
// });

// export const DraftContextProvider = ({ children }: { children: ReactNode }) => {
//   const [drafts, setDrafts] = useState<DraftType[]>([]);
//   const fetchDrafts = () => {
//     setIsInitialised(true);
//     console.log(
//       'Line 24 - DatabaseContextProvider - updateDatabaseState',
//       isInitialised
//     );
//   };

//   return (
//     <DatabaseContext.Provider
//       value={{
//         isInitialised: isInitialised,
//         updateInitialisedState: updateInitialisedState,
//       }}
//     >
//       {children}
//     </DatabaseContext.Provider>
//   );
// };

// export const useDatabaseContext = () => {
//   const context = useContext(DatabaseContext);
//   if (context === undefined) {
//     throw new Error(
//       'useDatabaseContext must be used within a DatabaseContextProvider'
//     );
//   }
//   return context;
// };

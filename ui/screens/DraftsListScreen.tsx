import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useDatabaseContext } from '../../store/databaseContext';
import { deleteDraft, fetchDrafts } from '../../lib/utils/database';
import { DraftType } from '../../lib/types/types';
import AppLoading from 'expo-app-loading';
import DraftList from '../components/DraftList';

const DraftsListScreen = () => {
  const [drafts, setDrafts] = useState<DraftType[]>([]);

  const { isInitialised } = useDatabaseContext();

  useEffect(() => {
    if (isInitialised) {
      fetchDrafts()
        .then((drafts) => {
          setDrafts(drafts);
          console.log('ffffffffffffffffffffffffffffffffffffffffffffffff');
          console.log('Drafts fetched successfully inside APP');
          console.log(drafts);
          console.log('ffffffffffffffffffffffffffffffffffffffffffffffff');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isInitialised]);

  if (!isInitialised) {
    return <AppLoading />;
  }

  const deleteDraftHandler = async (draftId: string) => {
    console.log('Delete Draft::draftId', draftId); // need to remove from sqlite db
    await deleteDraft(draftId);

    setDrafts((currentDrafts) => {
      return currentDrafts.filter((draft) => draft.id !== draftId);
    });
  };

  console.log('DraftsListScreen', drafts);

  return (
    <DraftList draftListProp={drafts} onDeleteDraftProp={deleteDraftHandler} />
  );
};

export default DraftsListScreen;

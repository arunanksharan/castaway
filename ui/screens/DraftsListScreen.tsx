import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDatabaseContext } from '../../store/databaseContext';
import { deleteDraft, fetchDrafts } from '../../lib/utils/database';
import { DraftType } from '../../lib/types/types';
import AppLoading from 'expo-app-loading';
import DraftList from '../components/DraftList';
import { GlobalStyles } from '../../constants/styles';

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
  if (drafts.length === 0) {
    return (
      <View
        style={{
          backgroundColor: GlobalStyles.colors.primary700,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            No drafts found!{'\n'}You have not yet casted away!
          </Text>
        </View>
      </View>
    );
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

const styles = StyleSheet.create({
  fallback: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 24,
    backgroundColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
    borderRadius: 6,
    width: '90%',
  },
  fallbackText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

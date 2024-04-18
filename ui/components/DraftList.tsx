import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DraftListPropsInterface } from '../../lib/types/types';
import { GlobalStyles } from '../../constants/styles';
import DraftItem from './DraftItem';

const DraftList = ({
  draftListProp,
  onDeleteDraftProp,
}: DraftListPropsInterface) => {
  return (
    <View style={styles.draftListContainer}>
      <FlatList
        style={{ width: '100%' }}
        data={draftListProp}
        renderItem={(itemData) => {
          const { item } = itemData;
          return <DraftItem draftItem={item} />;
        }}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  draftListContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
    // marginTop: 10,
    flex: 1,
    alignItems: 'center',
    // width: '80%',
    // marginBottom: 50,
    // borderRadius: 6,
  },
  draftItemText: {
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pressedItemText: {
    opacity: 0.5,
  },
});

export default DraftList;

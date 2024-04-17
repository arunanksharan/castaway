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

const DraftList = ({
  draftListProp,
  onDeleteDraftProp,
}: DraftListPropsInterface) => {
  return (
    <View style={styles.draftListContainer}>
      <FlatList
        data={draftListProp}
        renderItem={(itemData) => {
          const { item } = itemData;
          return (
            <Pressable
              onPress={onDeleteDraftProp.bind(this, item.content)}
              android_ripple={{ color: '#210644' }}
              style={({ pressed }) => pressed && styles.pressedItemText}
            >
              <Text style={styles.draftItemText}>{` ${item.content}`}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => item.content}
      />
      {/* {draftListProp.map((draft) => ( */}
      {/* <Text
          style={styles.draftItemText}
          key={draft.id}
        >{`${draft.id}: ${draft.text}`}</Text> */}
      {/* ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  draftListContainer: {
    // backgroundColor: '#fff',
    // marginTop: 10,
    flex: 3,
    width: '80%',
    marginBottom: 50,
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

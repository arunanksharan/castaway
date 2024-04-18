import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { DraftItemPropsInterface, DraftType } from '../../lib/types/types';
import { getFormattedDate } from '../../lib/utils/date';

const DraftItem = ({ draftItem }: DraftItemPropsInterface) => {
  return (
    <Pressable
      android_ripple={{ color: '#210644' }}
      style={({ pressed }) => pressed && styles.pressedItemText}
    >
      <View style={styles.draftItemContainer}>
        <Text
          style={[styles.textBase, styles.draftItemText]}
        >{` ${draftItem.content}`}</Text>
        <Text style={styles.date}>
          {getFormattedDate(draftItem.created_at)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  draftItemContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 12,
    marginVertical: 8,
    // marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '80%',
    // marginBottom: 50,
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
  },
  textBase: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    // width: '100%',
    // backgroundColor: '#fff',
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: GlobalStyles.colors.primary50,
    width: '100%',
  },
  draftItemText: {
    // backgroundColor: '#fff',
    // marginVertical: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    width: '100%',
  },
  pressedItemText: {
    opacity: 0.5,
  },
});

export default DraftItem;

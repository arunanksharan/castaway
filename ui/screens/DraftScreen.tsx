import React, { useLayoutEffect } from 'react';
import Draft from '../components/Draft';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DraftScreenProps } from '../../lib/types/types';
import { GlobalStyles } from '../../constants/styles';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';

const DraftScreen = ({ route, navigation }: DraftScreenProps) => {
  console.log('DraftScreen', route.params);
  const [draft, setDraft] = React.useState<string>('');
  const draftId = route.params?.draftId;
  const isEditing = !!draftId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Draft' : 'Add Draft',
    });
  }, [navigation, isEditing]);

  console.log('DraftScreen::draftId', draftId);
  console.log('DraftScreen::isEditing', isEditing);
  // if draftId exists = edit mode | else add mode

  function deleteDraftHandler() {
    console.log('Delete Draft');
    navigation.goBack();
  }

  function cancelDraftHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.draftInputContainer}>
        <Text style={styles.textInputTitle}>Create Draft</Text>
        <TextInput
          placeholder="Draft"
          style={styles.textInput}
          onChangeText={() => {
            console.log('Draft changed');
          }}
          value={draft}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode="outlined" onPress={cancelDraftHandler}>
          Cancel
        </Button>
        <Button mode="regular" onPress={cancelDraftHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteDraftHandler}
          />
        </View>
      )}
    </View>
  );
};

export default DraftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  draftInputContainer: {
    // backgroundColor: '#aaa',
    width: '80%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  textInputTitle: {
    // marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#bbb',
    // padding: 16,
    paddingHorizontal: 16,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    height: '50%',
  },
  draftBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    marginTop: 10,
  },

  saveDraftBtn: {
    backgroundColor: '#12de45',
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  clearDraftBtn: {
    backgroundColor: '#12de45',
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
});

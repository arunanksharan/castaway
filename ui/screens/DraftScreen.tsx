import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DraftScreenProps, DraftType } from '../../lib/types/types';
import { GlobalStyles } from '../../constants/styles';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconsButton';
import { insertDraft, updateDraft } from '../../lib/utils/database';
import { useDraftContext } from '../../store/draftsContext';

const DraftScreen = ({ route, navigation }: DraftScreenProps) => {
  // console.log('DraftScreen', route.params);

  const { drafts, updateDrafts } = useDraftContext();

  const draftId = route.params?.draftId;
  const isEditing = !!draftId;

  const draftInitState = drafts.filter((draft) => draft.id === draftId);

  const [draft, setDraft] = isEditing
    ? React.useState<DraftType>(draftInitState[0])
    : React.useState<DraftType>({
        id: '',
        content: '',
        created_at: '',
      });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Draft' : 'Add Draft',
    });
  }, [navigation, isEditing]);

  console.log('DraftScreen::draftId', draftId);
  console.log('DraftScreen::isEditing', isEditing);
  // if draftId exists = edit mode | else add mode

  function deleteDraftHandler() {
    // console.log('Delete Draft');
    navigation.goBack();
  }

  function cancelDraftHandler() {
    navigation.goBack();
  }

  // Same as submitHandler
  async function confirmHandler() {
    if (isEditing) {
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      console.log('50: DraftScreen: Update Draft');
      console.log(draft);
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      draft.id = draftId;
      const response = await updateDraft(draft);
      // console.log(' DRAFT SCREEN 53:: Update Response::', response);
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      console.log('57: DraftScreen: Update response after select', response);
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      updateDrafts(draft);
    } else {
      console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooo');
      const response = await insertDraft(draft);
      // console.log(' Insert Response::', response.rows._array[0]);
      draft.id = response.rows._array[0].id;
      draft.created_at = response.rows._array[0].created_at;
      console.log('60: DraftScreen: Add Draft after select', draft);
      console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooo');
      updateDrafts(draft);
    }
    navigation.goBack();
  }

  function draftInputHandler(inputIdentifier: string, inputValue: string) {
    // console.log('Draft changed');
    setDraft((prevDraft) => ({
      ...prevDraft,
      [inputIdentifier]: inputValue,
    }));
    // console.log('InputValue::', inputValue);
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, marginVertical: 24 }}>
          Your Draft
        </Text>
      </View>
      <View style={styles.draftInputContainer}>
        <TextInput
          placeholder="Draft"
          style={[styles.textInput, styles.textInputMultiline]}
          onChangeText={draftInputHandler.bind(this, 'content')}
          value={draft.content}
          multiline={true}
          autoCorrect={false}
          // caretHidden={false}
          selectionColor="red"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode="outlined" onPress={cancelDraftHandler}>
          Cancel
        </Button>
        <Button mode="regular" onPress={confirmHandler}>
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
  draftInputContainer: {
    // backgroundColor: '#aaa',
    // width: '80%',

    flex: 2,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderBottomWidth: 1,
    // borderBottomColor: '#000',
    paddingBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'blue',
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
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
    paddingHorizontal: 6,
    paddingVertical: 6,

    // marginTop: 5,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary800,
    borderRadius: 6,
    width: '100%',
    height: '90%',
  },
  textInputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  draftBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    marginTop: 10,
  },
});

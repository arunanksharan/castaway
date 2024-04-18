// import React from 'react';
// import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
// import { DraftPropsInterface } from '../../lib/types/types';
// import uuid from 'react-native-uuid';

// const Draft1 = ({ saveDraftHandlerProp }: DraftPropsInterface) => {
//   // list of drafts
//   const [draft, setDraft] = React.useState<string>(''); // current draft

//   const createDraftHandler = (text: string) => {
//     console.log(text);
//     setDraft(text);
//   };

//   const saveDraftHandler = () => {
//     console.log('Save Draft');
//     saveDraftHandlerProp({
//       content: draft,
//       id: '',
//       created_at: '',
//     });
//     setDraft('');
//   };
//   const clearDraftHandler = () => {
//     console.log('Clear Draft');
//     setDraft('');
//   };
//   return (
//     <View style={styles.draftInputContainer}>
//       <Text style={styles.textInputTitle}>Create Draft</Text>
//       <TextInput
//         placeholder="Draft"
//         style={styles.textInput}
//         onChangeText={createDraftHandler}
//         value={draft}
//       />
//       <View style={styles.draftBtnsContainer}>
//         <Pressable onPress={saveDraftHandler} style={styles.saveDraftBtn}>
//           <Text style={{ textAlign: 'center' }}>Save</Text>
//         </Pressable>
//         <Pressable onPress={clearDraftHandler} style={styles.clearDraftBtn}>
//           <Text style={{ textAlign: 'center' }}>Clear</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const Draft = () => {
//   return <View></View>;
// };

// const styles = StyleSheet.create({
//   draftInputContainer: {
//     // backgroundColor: '#aaa',
//     width: '80%',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderBottomWidth: 1,
//     borderBottomColor: '#000',
//     paddingBottom: 10,
//   },
//   textInputTitle: {
//     // marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   textInput: {
//     borderWidth: 1,
//     borderColor: '#bbb',
//     // padding: 16,
//     paddingHorizontal: 16,
//     marginTop: 5,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     width: '100%',
//     height: '50%',
//   },
//   draftBtnsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '60%',
//     marginTop: 10,
//   },

//   saveDraftBtn: {
//     backgroundColor: '#12de45',
//     padding: 5,
//     paddingHorizontal: 10,
//     marginTop: 10,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     flex: 1,
//   },
//   clearDraftBtn: {
//     backgroundColor: '#12de45',
//     padding: 5,
//     paddingHorizontal: 10,
//     marginTop: 10,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     flex: 1,
//   },
// });

// export default Draft;

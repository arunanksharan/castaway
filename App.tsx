import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DraftScreen from './ui/screens/Draft';
import DraftList from './ui/components/DraftList';
import { useEffect, useState } from 'react';
import React from 'react';
import Draft from './ui/components/Draft';
import { DraftType } from './lib/types/types';
import { fetchDrafts, init, insertDraft } from './lib/utils/database';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DraftsList from './ui/screens/DraftsListScreen';
import PublishedList from './ui/screens/PublishedListScreen';
import { GlobalStyles } from './constants/styles';
import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import PublishedListScreen from './ui/screens/PublishedListScreen';
import DraftsListScreen from './ui/screens/DraftsListScreen';

export function Appw() {
  const [drafts, setDrafts] = useState<DraftType[]>([]);
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (dbInitialized) {
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
  }, [dbInitialized]);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  const saveDraftHandler = async (draft: DraftType) => {
    console.log('Save Draft');
    setDrafts((currentDrafts) => [...currentDrafts, draft]);
    await insertDraft(draft.content);
  };

  const deleteDraftHandler = (draftId: string) => {
    console.log('Delete Draft');
    setDrafts((currentDrafts) => {
      return currentDrafts.filter((draft) => draft.id !== draftId);
    });
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitleText}>Birdcast</Text>

      <Draft saveDraftHandlerProp={saveDraftHandler} />
      <DraftList
        draftListProp={drafts}
        onDeleteDraftProp={deleteDraftHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#e1e8ed',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  appTitleText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 16,
    color: '#55acee',
    backgroundColor: '#fff',
  },
});

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function DraftsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}
    >
      <BottomTabs.Screen
        name="DraftsListScreen"
        component={DraftsListScreen}
        options={{
          title: 'Saved Drafts',
          tabBarLabel: 'Drafts',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="folder" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="PublishedListScreen"
        component={PublishedListScreen}
        options={{
          title: 'Published Casts',
          tabBarLabel: 'Published',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DraftsOverview"
            component={DraftsOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DraftScreen" component={DraftScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

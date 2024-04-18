import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DraftScreen from './ui/screens/DraftScreen';
import DraftList from './ui/components/DraftList';
import { useEffect, useState } from 'react';
import React from 'react';
// import Draft from './ui/components/Draft';
import { DraftType, RootStackParamList } from './lib/types/types';
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
import {
  DatabaseContextProvider,
  useDatabaseContext,
} from './store/databaseContext';
import IconButton from './ui/atoms/IconsButton';
import { DraftContextProvider } from './store/draftsContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

function DraftsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              name="plus"
              size={24}
              color="white"
              onPress={() => {
                // console.log('Pressed add');
                navigation.navigate('DraftScreen');
              }}
            />
          );
        },
      })}
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

export default function Root() {
  return (
    <DatabaseContextProvider>
      <DraftContextProvider>
        <App />
      </DraftContextProvider>
    </DatabaseContextProvider>
  );
}

export function App() {
  const { isInitialised, updateInitialisedState } = useDatabaseContext();
  useEffect(() => {
    init()
      .then(() => {
        // console.log('Database initialised & calling from inside App');
        // console.log('isInitialised', isInitialised);
        updateInitialisedState();
        // console.log('isInitialised after', isInitialised);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!isInitialised) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen
            name="DraftsOverview"
            component={DraftsOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DraftScreen"
            component={DraftScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface DraftPropsInterface {
  saveDraftHandlerProp: (draft: DraftType) => void;
}

export type DraftType = {
  id: string;
  content: string;
  created_at: string;
};

export interface DraftItemPropsInterface {
  draftItem: DraftType;
}

export type DraftListType = {
  drafts: DraftType[];
  deleteDraftHandler: (id: string) => void;
};

export interface DraftListPropsInterface {
  draftListProp: DraftType[];
  onDeleteDraftProp: (id: string) => void;
}

export interface PublishedListPropsInterface {
  publishedList: PublishedType[];
}
export type PublishedType = {
  id: string;
  content: string;
  created_at: string;
};

export type DatabaseContextType = {
  isInitialised: boolean;
  updateInitialisedState: () => void;
};

// Navigation and Route related props

export type DraftStackParamList = {
  DraftScreen: { draftId: string };
};

// Use the navigation prop with the correct type
export type DraftNavigationProp = NativeStackNavigationProp<
  DraftStackParamList,
  'DraftScreen'
>;

export type DraftScreenRouteProp = RouteProp<
  DraftStackParamList,
  'DraftScreen'
>;

export type RootStackParamList = {
  DraftsOverview: undefined;
  DraftScreen: { draftId: string } | undefined;
};

export type DraftScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DraftScreen'
>;

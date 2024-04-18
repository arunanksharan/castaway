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

import React from 'react';
import { Text } from 'react-native';
import PublishedList from '../components/PublishedList';

const PublishedListScreen = () => {
  // fetchUsers from sqlite
  const publishedList = [
    { id: '1', content: 'content', created_at: '2021-09-01' },
  ];
  return <PublishedList publishedList={publishedList} />;
};

export default PublishedListScreen;

import React from 'react';
import { Text } from 'react-native';
import { PublishedListPropsInterface } from '../../lib/types/types';

const PublishedList = ({ publishedList }: PublishedListPropsInterface) => {
  console.log('PublishedList', publishedList);
  return <Text>Published</Text>;
};

export default PublishedList;

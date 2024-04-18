import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const AddButton = () => {
  return <Pressable>Add</Pressable>;
};

export const DeleteButton = () => {
  return <Pressable>Delete</Pressable>;
};

export const EditButton = () => {
  return <Pressable>Edit</Pressable>;
};

type EntypeIconName = React.ComponentProps<typeof Entypo>['name'];

export const IconButton = ({
  name,
  color,
  size,
  onPress,
}: {
  name: EntypeIconName;
  color: string;
  size: number;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.iconContainer}>
        <Entypo name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    // backgroundColor: 'white',
    margin: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});

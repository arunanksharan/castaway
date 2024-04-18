import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Button = ({
  children,
  onPress,
  mode,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  mode: 'flat' | 'outlined' | 'contained' | 'regular'; // Todo: Added whatever was prompted by copilot - modify this later
  style?: Record<string, any>;
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            mode === 'flat' && styles.flat,
            mode === 'outlined' && styles.outlined,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === 'flat' && styles.buttonFlatText,
              mode === 'outlined' && styles.buttonOutlinedText,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    // margin: 4,
    minWidth: 100,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
  },
  buttonText: { color: 'white', textAlign: 'center' },
  flat: {
    backgroundColor: 'transparent',
  },
  outlined: {
    backgroundColor: 'transparent',
    // borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
  },
  buttonFlatText: {
    color: GlobalStyles.colors.primary100,
  },
  buttonOutlinedText: {
    color: GlobalStyles.colors.primary100,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
  },
});

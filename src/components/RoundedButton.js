import React from 'react';
import { TouchableOpacity, Text,
StyleSheet } from 'react-native';


export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (size) => StyleSheet.create({
  radius:{
    borderRadius: size,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 3,
  },
  text: {
    color: 'white',
    fontSize: size / 3.5
  }
})
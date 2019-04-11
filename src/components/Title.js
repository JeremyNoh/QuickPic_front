import React from "react";

import { Text, StyleSheet } from "react-native";

export const Title = props => {
  return (
    <Text {...props} style={styles.text}>
      {props.title}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 25
  }
});

export default Title;

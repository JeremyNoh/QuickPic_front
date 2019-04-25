import React from "react";

import { View, StyleSheet } from "react-native";
import { BACKGROUND_BODY } from "../../utils/colors";

export const Container = props => {
  return <View {...props} style={[props.style, styles.container]} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_BODY
  }
});

export default Container;

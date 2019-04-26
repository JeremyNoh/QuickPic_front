import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";

export const CardHistory = ({ props }) => {
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <View
        style={{
          marginTop: 20,
          width: "90%",
          justifyContent: "center",
          elevation: 4,
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "grey",
          shadowOpacity: 0.5,
          shadowRadius: 10
        }}
      >
        <ListItem
          friction={90}
          tension={100}
          activeScale={0.95}
          // title={"deddedede"}
          title={
            <View style={styles.subtitleView}>
              <Text style={styles.text}>{props.categorylibelle}</Text>
              <Text style={styles.title}>{props.itemlibelle}</Text>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                + {props.score} points
              </Text>
            </View>
          }
          titleStyle={{ color: "black", fontWeight: "bold" }}
          containerStyle={[
            {
              borderRadius: 10,

              borderWidth: 1,
              borderColor: "#d6d7da"
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    height: 100,
    marginTop: 30,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  subtitleView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "bold",
    fontSize: 15
  },
  text: {
    fontWeight: "bold",
    fontSize: 10
  }
});

export default CardHistory;

// colors Good
// #5359af

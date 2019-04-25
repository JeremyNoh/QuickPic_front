import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { API_AVATAR } from "../../endpoint";
export const CardRanking = ({ props, itMe }) => {
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
          leftAvatar={{
            rounded: true,
            source: {
              uri: `${API_AVATAR}/100/${props.uuid}`
            }
          }}
          title={props.nickname}
          titleStyle={{ color: "black", fontWeight: "bold" }}
          subtitleStyle={{ color: "black" }}
          subtitle={
            <View style={styles.subtitleView}>
              <Text>Score : {props.points || 0}</Text>
              <Text style={styles.position}>{props.position}</Text>
            </View>
          }
          containerStyle={[
            {
              borderRadius: 10,
              backgroundColor: "grey",
              borderWidth: 3,
              borderColor: itMe ? "green" : "#d6d7da"
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
  position: {
    fontWeight: "bold",
    fontSize: 20
  }
});

export default CardRanking;

// colors Good
// #5359af

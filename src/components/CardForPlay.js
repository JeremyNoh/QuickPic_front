import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { Card, ListItem } from "react-native-elements";
import moment from "moment";
export const CardForPlay = ({ props, onPress, inFuture }) => {
  let titleCard = props.itemLibelle;
  let timeRemaining =
    moment.utc(moment(props.endGame).diff(moment(moment()))).format("HH:mm") +
    "min Restante";
  if (inFuture) {
    timeRemaining =
      "commence dans :  " +
      moment
        .utc(moment(props.startGame).diff(moment(moment())))
        .format("HH:mm");
    titleCard = "à venir";

    // test
    // if (props.categoryLibelle === "Sport") {
    //   // console.log(props.startGame);
    //   // console.log(moment(props.startGame).format("MMMM Do YYYY, h:mm:ss a"));
    //   console.log(moment.unix(props.startGame).format("YYYY-MM-DD HH:mm"));
    //   console.log(moment().unix());
    //   console.log(new Date());

    //   // console.log(moment(1555879230).format("DD/MM/YYYY"));
    // }
    // finTest
  }

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
          linearGradientProps={{
            colors: ["#2062D5", "#042867"],
            start: [1, 0],
            end: [0.2, 0]
          }}
          title={titleCard.toUpperCase()}
          titleStyle={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          }}
          subtitleStyle={{ color: "white" }}
          subtitle={
            <View style={styles.subtitleView}>
              <Text style={[styles.ratingText, { fontWeight: "bold" }]}>
                {props.categoryLibelle}
              </Text>
              <Text style={styles.ratingText}>{timeRemaining}</Text>
            </View>
          }
          chevronColor="white"
          chevron
          containerStyle={{
            borderRadius: 10
          }}
          onPress={() => onPress()}
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
  ratingText: {
    // fontWeight: "bold",
    color: "white"
  }
});

export default CardForPlay;

// colors Good
// #5359af

import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage } from "react-native";

// Libs Extenal
import { ButtonGroup, Header } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

// Internal Component
import { BACKGROUND_BODY, COLOR_TEXT } from "../../utils/colors";
import { getAllGames } from "../../api/game";
import CardForPlay from "../components/CardForPlay";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedIndex: 0,
    allGames: [],
    progressGame: [],
    upcomingGame: []
  };

  // GET - ALL GAME AND SORT TO INPROGRESS && UPCOMING
  async componentDidMount() {
    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);
    getAllGames(infoUser.token, infoUser.uuid)
      .then(res => {
        let result = null;
        let progressGame = null;
        let upcomingGame = null;
        if (res.hasOwnProperty("msg")) {
          result = null;
        } else {
          result = res;
          let sortTab = res.sort(function(a, b) {
            return a.idGame - b.idGame;
          });
          upcomingGame = sortTab.filter(obj => obj.status === "upcoming");
          progressGame = sortTab.filter(obj => obj.status === "in progress");
        }
        this.setState({ allGames: result, upcomingGame, progressGame });
      })
      .catch(err => {
        console.log("dede");

        console.log(err);
        this.setState({ allGames: null });
      });
  }

  // CHANGE VIEW INPROGRESS OR UPCOMING
  _updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  // Navigate to GameScreen with Params of the parti
  SelectGame = infoGame => {
    this.props.navigation.navigate("Game", {
      game: infoGame
    });
  };

  // MESSAGE FOR GAME UPCOMING
  SelectNotYetGame() {
    Alert.alert("Sois Patient", "Cette partie n'est pas encore Disponible", [
      { text: "OK" }
    ]);
  }

  render() {
    let { selectedIndex, progressGame, upcomingGame } = this.state;
    let fluxGame = selectedIndex === 0 ? progressGame : upcomingGame;

    return (
      <View style={[{ paddingBottom: "15%" }, styles.bg]}>
        <Header
          backgroundColor={BACKGROUND_BODY}
          centerComponent={{
            text: `Home`,
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
          rightComponent={{
            icon: "people",
            color: "#fff",
            onPress: () => {
              this.props.navigation.navigate("SignedOut"), AsyncStorage.clear();
            }
          }}
        />
        <View style={{ alignItems: "center" }}>
          <ButtonGroup
            onPress={this._updateIndex}
            selectedIndex={selectedIndex}
            buttons={["En cours", "Prochainement"]}
            containerStyle={{
              marginTop: 30,
              justifyContent: "center",
              height: 30,
              width: 300,
              borderRadius: 20,
              backgroundColor: BACKGROUND_BODY,
              borderColor: COLOR_TEXT
            }}
            selectedButtonStyle={{
              backgroundColor: COLOR_TEXT
            }}
            selectedTextStyle={{
              color: BACKGROUND_BODY
            }}
          />
        </View>
        <ScrollView style={{ height: "100%" }}>
          {fluxGame.map((element, index) => {
            return (
              <CardForPlay
                key={index}
                props={element}
                onPress={() =>
                  selectedIndex === 0
                    ? this.SelectGame(element)
                    : this.SelectNotYetGame()
                }
                inFuture={selectedIndex === 0 ? false : true}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: BACKGROUND_BODY
  }
});

export default Home;
